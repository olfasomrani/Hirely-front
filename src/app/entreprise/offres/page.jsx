"use client";
import { Card, Tag, Button, Modal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined  } from "@ant-design/icons";
import { offres, deleteOffre } from "../../../services/offres";
import { useState, useEffect } from "react";
import OffreForm from "./offreForm";
import dayjs from 'dayjs';


const offress = [
  {
    id: 1,
    titre: "Développeur React.js",
    statut: "Actif",
    candidats: 12,
    datePublication: "2025-05-01",
    image:
      "https://lh6.googleusercontent.com/proxy/iccSSkCz-5Jd-ae0Z8O-c-AGFANaJ5F38Yqm9ODr0wQeZFNgoKcMTYRLLhea1l5dSOtKp7eObjTNXTFzfwX4", // Image aléatoire pour chaque offre
  },
  {
    id: 2,
    titre: "UX Designer",
    statut: "Expiré",
    candidats: 5,
    datePublication: "2025-04-01",
    image:
      "https://letecode.com/storage/articles/September2021/fKFlgB6K1b9IwjcgwtGl.png", // Image pour le UX Designer
  },
  {
    id: 3,
    titre: "UX olfa",
    statut: "Encours",
    candidats: 5,
    datePublication: "2025-04-01",
    image: "https://source.unsplash.com/random/300x200?ui", // Image pour UX olfa
  },
];

const OffresPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffreId, setSelectedOffreId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const BACKEND_URL = "http://localhost:3001";

  const fetchOffres = async () => {
    try {
      const fetchedData = await offres();
      setData(fetchedData);
      setOriginalData(fetchedData.offres);
    } catch (error) {
      console.error("Error:", error);
      setError("Échec de l'affichage");
    }
  };
  
  useEffect(() => {
    fetchOffres();
  }, []);
  

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredData = originalData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const showModal = (id) => {
    setSelectedOffreId(id);
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cett offre?",
      content: "Cette action est irréversible.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (offreId) => {
    try {
      await deleteOffre(offreId);
      const updatedData = data.filter((offre) => offre.id !== offreId);
      setData(updatedData);
      setOriginalData(updatedData);
      notification.success({
        message: "Succès",
        description: "offre supprimé avec succès.",
        duration: 0,
      });
    } catch (error) {
      notification.error({
        message: "Erreur",
        description: "Échec de la suppression de la offre.",
        duration: 0,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateSuccess = async() => {
    await fetchOffres();
    setIsModalOpen(false);
    notification.success({
      message: "Succès",
      description: "L'offre a été modifié avec succès.",
      duration: 0,
    });
  };

  const handleAddSuccess = async() => {
    await fetchOffres();
    notification.success({
      message: "Succès",
      description: "L'offre a été ajouté avec succès.",
      duration: 0,
    });
    setIsModalOpen(false);
  };


  const getTagColor = (statut) => {
    switch (statut) {
      case "Actif":
        return "green";
      case "Expiré":
        return "red";
      default:
        return "blue";
    }
  };

  const getBackgroundColor = (statut) => {
    switch (statut) {
      case "Actif":
        return "bg-[#e0ffcd]";
      case "Expiré":
        return "bg-[#ffcab0]";
      default:
        return "bg-[#b8e1dd]";
    }
  };

  const handleVoirCandidats = (id) => {
    console.log("Voir les candidats pour l'offre", id);
  };

 return (
  <div className="p-6">
    <div className="flex justify-end mb-4">
      <Button
        type="button"
        className="bg-[#06b6d4] text-black rounded-full flex items-center justify-center"
        icon={<PlusOutlined />}
        onClick={() => showModal(null)}
      >
        Ajouter
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((offre) => (
        <div
          key={offre.id}
          className={`rounded-lg shadow-md p-1 ${getBackgroundColor(offre?.statut)}`}
        >
          <Card
            title={offre.title}
            actions={[
              <EyeOutlined key="view" onClick={() => handleVoirCandidats(offre.id)} />,
              <EditOutlined key="edit" onClick={() => showModal(offre.id)} />,
              <DeleteOutlined key="delete" onClick={() => showDeleteConfirm(offre.id)} />,
            ]}
            extra={<Tag color={getTagColor(offre.statut)}>{offre.statut}</Tag>}
            className="bg-transparent"
            bordered={false}
            cover={
              <img
                alt={offre.titre}
                src={
                  offre.image?.length > 0
                    ? `${process.env.NEXT_PUBLIC_API_URL}${offre.image}`
                    : "/images/default-offre.png"
                }
              />
            }
            
            
          >
            <p>📅 Publiée le : {dayjs(offre.createdAt).format("DD/MM/YYYY à HH:mm")}</p>
            <p>👥 Candidats : {offre.candidats}</p>
          </Card>
        </div>
      ))}
       <Modal open={isModalOpen} onCancel={handleModalCancel} footer={null}>
        <OffreForm
          offreId={selectedOffreId}
          onSuccess={handleUpdateSuccess}
          onSuccessAdd={handleAddSuccess}
        />
      </Modal>
    </div>
  </div>
);

}
export default  OffresPage;