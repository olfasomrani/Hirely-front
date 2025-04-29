"use client";
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic, Divider } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function InteractiveDashboard() {
  const [data, setData] = useState({
    labels: [], // Labels de temps, par exemple mois
    datasets: [
      {
        label: "Candidatures Acceptées",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Candidatures Rejetées",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Exemple de données statiques, remplacer par une API
    setData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Candidatures Acceptées",
          data: [30, 50, 40, 70, 100, 90, 120],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Candidatures Rejetées",
          data: [10, 20, 30, 25, 40, 35, 50],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    });
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "30px" }}>Tableau de Bord Interactif</h1>

      {/* Section KPI */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Candidatures Acceptées" value={120} suffix="candidats" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Candidatures Rejetées" value={50} suffix="candidats" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Offres Publiées" value={45} suffix="offres" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Recruteurs Enregistrés" value={18} suffix="recruteurs" />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Graphique des candidatures */}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Candidatures au Fil du Temps</h2>
      <Line data={data} options={{ responsive: true, plugins: { title: { display: true, text: "Candidatures Acceptées vs Rejetées" } } }} />

      <Divider />

      {/* Section des actions récentes */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Dernières Actions">
            <ul>
              <li><strong>Admin:</strong> a publié une nouvelle offre: Développeur React</li>
              <li><strong>Sarah:</strong> a modifié le profil de l'entreprise 'TechCorp'</li>
              <li><strong>Khaled:</strong> a ajouté une nouvelle candidature</li>
              <li><strong>Admin:</strong> a supprimé une offre expirée</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
