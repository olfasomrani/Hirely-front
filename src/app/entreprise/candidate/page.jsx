"use client";
import { Table, Tag, Progress } from "antd";

const candidats = [
  {
    id: 1,
    nom: "Amine B.",
    email: "amine.dev@gmail.com",
    scoreIA: 78.5,
    statut: "En cours",
    cv: "/cv/amine.pdf",
  },
  {
    id: 2,
    nom: "Fatima Z.",
    email: "fatima.z@exemple.com",
    scoreIA: 91.2,
    statut: "Shortlisté",
    cv: "/cv/fatima.pdf",
  },
];

export default function CandidatsPage() {
  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Score IA",
      dataIndex: "scoreIA",
      key: "scoreIA",
      render: (score) => <Progress percent={Math.round(score)} />,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => (
        <Tag color={statut === "Shortlisté" ? "green" : "blue"}>{statut}</Tag>
      ),
    },
    {
      title: "CV",
      dataIndex: "cv",
      key: "cv",
      render: (link) => <a href={link} target="_blank">Voir</a>,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Liste des candidats</h1>
      <Table dataSource={candidats} columns={columns} rowKey="id" />
    </div>
  );
}
