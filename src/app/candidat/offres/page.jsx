"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Typography,
  Tag,
  Modal,
  Input,
  message,
  Upload,
  notification,
  Spin,
} from "antd";
import {
  RocketOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  BankOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { offres as fetchOffresAPI } from "../../../services/offres"; // <-- Ton import réel

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const OffresCandidat = () => {
  const [offres, setOffres] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const data = await fetchOffresAPI();
        setOffres(data);
      } catch (err) {
        console.error(err);
        setError("Échec de l'affichage des offres");
      } finally {
        setLoading(false);
      }
    };
    fetchAndSet();
  }, []);

  const handlePostulerClick = (offre) => {
    setSelectedOffre(offre);
    setIsModalOpen(true);
  };

  const handleEnvoyerCandidature = () => {
    if (!prenom || !nom || !cvFile) {
      message.error(
        "Veuillez remplir tous les champs requis et uploader votre CV."
      );
      return;
    }

    notification.success({
      message: "Candidature envoyée !",
      description: `Votre candidature pour le poste de ${selectedOffre?.title} chez entreprise informatique a bien été envoyée.`,
      placement: "topRight",
    });

    setIsModalOpen(false);
    setMotivation("");
    setPrenom("");
    setNom("");
    setCvFile(null);
  };

  const handleCvUpload = (file) => {
    setCvFile(file);
    return false;
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
        Nos Offres d'Emploi
      </Title>

      {loading ? (
        <Spin
          size="large"
          style={{ display: "flex", justifyContent: "center" }}
        />
      ) : error ? (
        <Paragraph type="danger">{error}</Paragraph>
      ) : (
        <Row gutter={[24, 24]}>
          {offres.map((offre) => (
            <Col xs={24} sm={12} md={8} key={offre.id}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}
                cover={
                  <img
                    alt={offre.titre}
                    src={
                      offre.image?.length > 0
                        ? `${process.env.NEXT_PUBLIC_API_URL}${offre.image}`
                        : "/images/default-offre.png"
                    }
                    style={{
                      height: 180,
                      objectFit: "cover",
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                  />
                }
              >
                <Title level={4}>{offre.title}</Title>
                <Paragraph>
                  <BankOutlined /> <strong>Entreprise informatique</strong>
                </Paragraph>
                <Paragraph>
                  <EnvironmentOutlined /> {offre.location}
                </Paragraph>
                <Paragraph>
                  <DollarOutlined /> {offre.salary}
                </Paragraph>
                <Tag color="blue">{offre.type}</Tag>
                <Paragraph>{offre.description}</Paragraph>
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  block
                  onClick={() => handlePostulerClick(offre)}
                >
                  Postuler
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={`Postuler à : ${selectedOffre?.titre}`}
        open={isModalOpen}
        onOk={handleEnvoyerCandidature}
        onCancel={() => setIsModalOpen(false)}
        okText="Envoyer"
        cancelText="Annuler"
      >
        <Input
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <Input
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          style={{ marginBottom: 12 }}
        />
        <TextArea
          rows={4}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Lettre de motivation (optionnel)"
          style={{ marginBottom: 12 }}
        />
        <Upload beforeUpload={handleCvUpload} fileList={cvFile ? [cvFile] : []}>
          <Button icon={<UploadOutlined />}>Téléverser votre CV</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default OffresCandidat;
