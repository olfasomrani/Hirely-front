'use client';

import { Card, Statistic, Table, Button, Calendar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

const stats = [
  { title: 'Offres publiées', value: 12 },
  { title: 'Candidatures reçues', value: 148 },
  { title: 'Entretiens programmés', value: 6 },
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
        <Button type="primary" icon={<PlusOutlined />}>
          Nouvelle offre
        </Button>
      </div>
      <Table dataSource={offres} columns={columns} pagination={false} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Calendrier des entretiens</h2>
        <Calendar fullscreen={false} />
      </div>
    </div>
  );
}
