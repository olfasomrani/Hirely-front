'use client';

import { Card, Statistic, Table, Button, Modal, Form, Input, DatePicker, Calendar, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import moment from 'moment';

const stats = [
  { title: 'Offres publiées', value: 6 },
  { title: 'Candidatures reçues', value: 2 },
  { title: 'Entretiens programmés', value: 2},
  { title: 'Candidats retenus', value: 3 },
];

const offres = [
  {
    key: '1',
    poste: 'Développeur Fullstack',
    date: '30/07/2024',
    statut: 'En cours',
    candidatures: 24,
  },
  {
    key: '2',
    poste: 'UX Designer',
    date: '25/07/2024',
    statut: 'Clôturée',
    candidatures: 16,
  },
];

const columns = [
  {
    title: 'Poste',
    dataIndex: 'poste',
    key: 'poste',
  },
  {
    title: 'Date de publication',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Statut',
    dataIndex: 'statut',
    key: 'statut',
  },
  {
    title: 'Candidatures',
    dataIndex: 'candidatures',
    key: 'candidatures',
  },
];

export default function AccueilRecruteur() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([
    { date: '2024-07-30', title: 'Entretien Dev Fullstack - Jean Dupont' },
    { date: '2024-07-25', title: 'Entretien UX - Marie Lemoine' },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);

  const onFinish = (values) => {
    const formattedDate = values.date.format('YYYY-MM-DD');
    const newEvent = {
      date: formattedDate,
      title: values.titre,
    };
    setEvents([...events, newEvent]);
    setModalVisible(false);
    form.resetFields();
  };

  const dateCellRender = (value) => {
    const currentDate = value.format('YYYY-MM-DD');
    const dayEvents = events.filter(event => event.date === currentDate);
    return (
      <ul className="events">
        {dayEvents.map((event, index) => (
          <li key={index}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {event.title}
            </Typography.Text>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bienvenue, Recruteur 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index}>
            <Statistic title={item.title} value={item.value} />
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-semibold">Dernières Offres</h2>
      </div>

      <Table dataSource={offres} columns={columns} pagination={false} />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Calendrier des entretiens</h2>
        </div>
        <Calendar fullscreen={false} dateCellRender={dateCellRender} />
      </div>

      <Modal
        title="Ajouter un entretien"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText="Ajouter"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="titre"
            label="Titre de l'entretien"
            rules={[{ required: true, message: 'Veuillez entrer le titre' }]}
          >
            <Input placeholder="Ex: Entretien développeur avec Jean Dupont" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
