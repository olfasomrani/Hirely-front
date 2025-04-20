import React, { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Button, Select, message } from "antd";
import { updateExpertById } from "@/services/experts";

const { Option } = Select;

const ExpertEditModal = ({ visible, onClose, expert, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (expert) {
      form.setFieldsValue({
        yearsExperience: expert.yearsExperience,
        lastPositionOccupy: expert.lastPositionOccupy,
        descriptionResponsibilities: expert.descriptionResponsibilities,
        keyAchievements: expert.keyAchievements,
        whyJoin: expert.whyJoin,
        addedValue: expert.addedValue,
        consent: expert.consent,
        cv: expert.cv || "",
        portfolio: expert.portfolio || "",
        status: expert.status || "pending",
        certifications: expert.certifications || [],
        formations: expert.formations || [],
        references: expert.references || [],
        subMissionType: expert.subMissionType,
        subExpertiseSector: expert.subExpertiseSector,
        subStudyLevel: expert.subStudyLevel,
      });
    }
  }, [expert, form]);

  const handleFinish = async (values) => {
    if (!expert?.idExpert) {
      message.error("Erreur: ID de l'expert manquant.");
      return;
    }
    try {
      const updatedExpert = await updateExpertById(expert.idExpert, values);
      message.success("Informations de l'expert mises à jour avec succès !");
      onSubmit(updatedExpert);
      onClose();
    } catch (error) {
      message.error("Une erreur s'est produite lors de la mise à jour.");
      console.error("API Error:", error);
    }
  };

  return (
    <Modal
      title="Modifier les informations de l'expert"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Annuler
        </Button>,
        <Button key="submit" onClick={() => form.submit()}>
          Valider
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="yearsExperience"
          label="Années d'expérience"
          rules={[{ required: true, message: "Veuillez entrer les années d'expérience" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="lastPositionOccupy"
          label="Dernier poste occupé"
          rules={[{ required: true, message: "Veuillez entrer le dernier poste occupé" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descriptionResponsibilities"
          label="Description des responsabilités"
          rules={[{ required: true, message: "Veuillez entrer la description des responsabilités" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="keyAchievements"
          label="Principales réalisations"
          rules={[{ required: true, message: "Veuillez entrer les principales réalisations" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="whyJoin"
          label="Pourquoi rejoindre"
          rules={[{ required: true, message: "Veuillez expliquer pourquoi rejoindre" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="addedValue"
          label="Valeur ajoutée"
          rules={[{ required: true, message: "Veuillez décrire la valeur ajoutée" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Statut"
          rules={[{ required: true, message: "Veuillez sélectionner un statut" }]}
        >
          <Select placeholder="Sélectionnez un statut">
            <Option value="pending">En attente</Option>
            <Option value="accepted">Accepté</Option>
            <Option value="rejected">Rejeté</Option>
          </Select>
        </Form.Item>
        <Form.Item name="consent" label="Consentement" valuePropName="checked">
          <Checkbox>Je consens à partager mes informations</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExpertEditModal;
