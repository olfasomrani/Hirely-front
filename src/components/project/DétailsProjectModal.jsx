import React from "react";
import { Modal, Typography, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

function formatStatus(status) {
  if (status === "filed") return "Déposé";
  if (status === "draft") return "Brouillon";
  return status;
}

const ProjectModal = ({ isVisible, onClose, project }) => {
  return (
    <Modal
    title={
      <Title
        level={3}
        style={{ color: "#BC946B", fontWeight: "bold" }}
      >
        Détails du projet
      </Title>
    }
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: "24px" }}
    >
      {project && (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Titre:</Text>
              <p>{project.title}</p>
            </Col>
            <Col span={12}>
              <Text strong>Date de dépôt:</Text>
              <p>{formatDate(project.createdAt)}</p>
            </Col>
            <Col span={12}>
              <Text strong>Status:</Text>
              <p>{formatStatus(project.status)}</p>
            </Col>
            <Col span={12}>
              <Text strong>Catégories:</Text>
              <p>
                {project.industryCategories && Array.isArray(project.industryCategories)
                  ? project.industryCategories.map((cat) => cat.industryCatName).join(", ")
                  : "N/A"}
              </p>
            </Col>
            <Col span={12}>
              <Text strong>Type de marché:</Text>
              <p>{project.marketType}</p>
            </Col>
            <Col span={12}>
              <Text strong>Description:</Text>
              <p>{project.description}</p>
            </Col>
            <Col span={12}>
              <Text strong>Problème que vous adressez:</Text>
              <p>{project.problemAddressing}</p>
            </Col>
            <Col span={12}>
              <Text strong>Solution apportée:</Text>
              <p>{project.solutionProvided}</p>
            </Col>
            <Col span={12}>
              <Text strong>Solution Innovante:</Text>
              <p>{project.innovativeSolution}</p>
            </Col>
            <Col span={12}>
              <Text strong>Concurrents et Préoccupations:</Text>
              <p>{project.competitors}</p>
            </Col>
            <Col span={12}>
              <Text strong>Facteurs de votre solution:</Text>
              <p>{project.solutionFactors}</p>
            </Col>
            <Col span={12}>
              <Text strong>Votre Business Model:</Text>
              <p>{project.businessModel}</p>
            </Col>
            <Col span={12}>
              <Text strong>Potentiel de croissance:</Text>
              <p>{project.growthPotential}</p>
            </Col>
            <Col span={12}>
              <Text strong>Marché cible:</Text>
              <p>{project.targetMarket}</p>
            </Col>
            <Col span={12}>
              <Text strong>Taille du marché:</Text>
              <p>{project.marketSize}</p>
            </Col>
            <Col span={12}>
              <Text strong>Stratégie de croissance:</Text>
              <p>{project.growthStrategy}</p>
            </Col>
            <Col span={12}>
              <Text strong> nombre d'utilisateurs aujourd'hui et votre projection sur 3 ans:</Text>
              <p>{project.userNumberAtteint}</p>
            </Col>
            <Col span={12}>
              <Text strong>Stade de développement:</Text>
              <p>{project.developmentStage}</p>
            </Col>
            <Col span={12}>
              <Text strong>Participations au programmes:</Text>
              <p>{project.programParticipate ? "Oui" : "Non"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Prix d'entrepreneuriat:</Text>
              <p>{project.marketSize}</p>
            </Col>
            <Col span={12}>
              <Text strong>Avez-vous déposé des brevets?:</Text>
              <p>{project.everFieldPatents ? "Oui" : "Non"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Nombre de cofondateurs:</Text>
              <p>{project.coufoundersNumber}</p>
            </Col>
            <Col span={12}>
              <Text strong>Votre équipe de fondateurs:</Text>
              <p>{project.foundingTeamDescription}</p>
            </Col>
            <Col span={12}>
              <Text strong>Performance de l'équipe:</Text>
              <p>{project.currentTeamExecutedProject ? "Oui" : "Non"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Temps passé et mode de travail:</Text>
              <p>{project.timeSpentProjet}</p>
            </Col>
            <Col span={12}>
              <Text strong>Travaillé en équipe sur d'autres projets?:</Text>
              <p>{project.workedOnOtherProjectTogether}</p>
            </Col>
            <Col span={12}>
              <Text strong>Lancement d'une Startup:</Text>
              <p>{project.launchedStartupPreviously ? "Oui" : "Non"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Vidéo démonstrative:</Text>
              <p>{project.youtubeVideoLink}</p>
            </Col>
            <Col span={12}>
              <Text strong>Lien vers site web ou application:</Text>
              <p>{project.link}</p>
            </Col>
            <Col span={12}>
              <Text strong>Attentes vis-à-vis de l'équipe:</Text>
              <p>{project.yourExpectFromCMDA}</p>
            </Col>
            <Col span={12}>
              <Text strong>Certification de l'exactitude:</Text>
              <p>{project.infoExactitude ? "Oui" : "Non"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Accord pour partager vos infos:</Text>
              <p>{project.contactShare ? "Oui" : "Non"}</p>
            </Col>
          </Row>
          <Divider />
        </div>
      )}
    </Modal>
  );
};

export default ProjectModal;
