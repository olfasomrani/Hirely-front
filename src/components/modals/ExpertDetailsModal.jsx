import React from "react";
import { Modal, Typography } from "antd";

const { Title, Text } = Typography;

const ExpertDetailsModal = ({ visible, onClose, expert }) => {
  console.log("expert", expert);

  return (
    <Modal
      title={
        <Title level={3} style={{ color: "#BC946B", fontWeight: "bold", textAlign: "center" }}>
          Détails de l'expert
        </Title>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f9f9f9",
      }}
    >
      {expert &&(
        <div style={{ padding: "10px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Nom :</strong>{" "}
            {`${expert.user.firstName} ${expert.user.lastName}`}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Email :</strong>{" "}
            <a href={`mailto:${expert.user.email}`}>
              {expert.user.email}
            </a>
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Téléphone :</strong>{" "}
            {expert.user.phone}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>LinkedIn :</strong>{" "}
            {expert.user.linkedinLink || <span>pas de lien</span>}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Dernière position occupée :</strong>{" "}
            {expert.lastPositionOccupy}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Sous-secteur d'expertise :</strong>{" "}
            {expert.subExpertiseSector?.subSectorName}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Type de sous-mission :</strong>{" "}
            {expert.subMissionType?.subTypeName}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Niveau d'étude :</strong>{" "}
            {expert.subStudyLevel?.subStLevelName}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Années d'expérience :</strong>{" "}
            {expert.yearsExperience}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Pourquoi rejoindre? :</strong>{" "}
            {expert.whyJoin}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Valeur ajoutée :</strong>{" "}
            {expert.addedValue}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Statut :</strong>{" "}
            {expert.status}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#BC946B" }}>Références :</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
              {expert.references && expert.references.length > 0 ? (
                expert.references.map((reference, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>{reference.name}</li>
                ))
              ) : (
                <li>Aucune référence disponible</li>
              )}
            </ul>
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ExpertDetailsModal;
