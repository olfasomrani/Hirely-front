"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
  Typography,
  Calendar,
  Badge,
  Modal,
} from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export default function AjouterEntretien() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviews, setInterviews] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const dateKey = values.date.format("YYYY-MM-DD");
    const newInterview = {
      type: "processing",
      content: `Entretien avec ${values.candidat} à ${values.heure.format(
        "HH:mm"
      )}`,
    };

    setInterviews((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newInterview],
    }));

    form.resetFields();
    setIsModalOpen(false);
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const listData = interviews[dateKey] || [];
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header image + Button */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1581092334714-03e5ed9b5eff?auto=format&fit=crop&w=800&q=80"
            alt="Planifier entretien"
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-10">
          <Title level={3}>Gestion des entretiens</Title>
          <Paragraph>
            Planifiez facilement des entretiens avec vos candidats.
          </Paragraph>
          <Button
            type="primary"
            onClick={showModal}
            style={{
              background: "linear-gradient(to right, #1e3a8a, #06b6d4)",
              border: "none",
              marginTop: 12,
            }}
          >
            Ajouter un entretien
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <Title level={4}>Calendrier des entretiens</Title>
        <Calendar dateCellRender={dateCellRender} />
      </div>

      {/* Modal form */}
      <Modal
        title="Ajouter un entretien"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            type: "Visio",
          }}
        >
          <Form.Item
            name="candidat"
            label="Nom du candidat"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input placeholder="Ex: Jean Dupont" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type d’entretien"
            rules={[
              { required: true, message: "Veuillez sélectionner un type" },
            ]}
          >
            <Select>
              <Select.Option value="Visio">Visio</Select.Option>
              <Select.Option value="Téléphone">Téléphone</Select.Option>
              <Select.Option value="Présentiel">Présentiel</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              { required: true, message: "Veuillez sélectionner une date" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="heure"
            label="Heure"
            rules={[
              { required: true, message: "Veuillez sélectionner une heure" },
            ]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>

          <Form.Item name="notes" label="Notes / Objectifs">
            <TextArea
              rows={3}
              placeholder="Parler des compétences, disponibilité, etc."
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              style={{
                background: "linear-gradient(to right, #1e3a8a, #06b6d4)",
                border: "none",
              }}
            >
              Enregistrer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
