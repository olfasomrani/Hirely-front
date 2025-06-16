// app/recruteur/offres/[id]/candidats/page.jsx
"use client";
import { Table, Tag, Input, Select, DatePicker, Button, Space } from "antd";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dayjs from 'dayjs';

// Exemple de données des candidats avec score
const candidatsData = [
 
  {
    key: 3,
    nom: "Ahlem othmen",
    cv: "CV_ahlem.pdf",
    email: "ahlem.othemn@gmail.com",
    statut: "nouveau",
    score: 91,
  },
    {
    key: 3,
    nom: "intissar boubaker",
    cv: "intissar.pdf",
    email: "intissr@gmail.com",
    statut: "nouveau",
    score: 81,
  },


];

const CandidatsPage = () => {
  const router = useRouter();
  // const { id } = router.query;  // Récupérer l'ID de l'offre
  const { id } = 1;
  const [filteredData, setFilteredData] = useState(candidatsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  // Filtrer et trier les données
  const handleFilter = () => {
    let filtered = candidatsData;

    // Filtrer par nom
    if (searchTerm) {
      filtered = filtered.filter(candidat => candidat.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filtrer par statut
    if (filterStatut) {
      filtered = filtered.filter(candidat => candidat.statut === filterStatut);
    }

    // Filtrer par date de candidature
    if (filterDate) {
      filtered = filtered.filter(candidat => dayjs(candidat.dateCandidature).isSame(dayjs(filterDate), 'day'));
    }

    // Trier par score
    if (sortOrder) {
      filtered = filtered.sort((a, b) => (sortOrder === 'asc' ? a.score - b.score : b.score - a.score));
    }

    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "CV",
      dataIndex: "cv",
      key: "cv",
      render: (text) => <a href={`path/to/cvs/${text}`} download>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => <Tag color={statut === "En cours" ? "blue" : "green"}>{statut}</Tag>,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];

  return (
    <div className="p-6">
      <h1>Liste des Candidats pour l'offre ID: {id}</h1>

      {/* Filtre de recherche par nom */}
      <Space className="mb-4">
        <Input 
          placeholder="🔍 Rechercher un candidat" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          onPressEnter={handleFilter} 
        />
        
        {/* Filtrer par statut */}
        <Select 
          defaultValue="Statut" 
          value={filterStatut} 
          onChange={setFilterStatut} 
          className="w-48" 
        >
          <Select.Option value={null}>Tous les statuts</Select.Option>
          <Select.Option value="En cours">En cours</Select.Option>
          <Select.Option value="Entretien">Entretien</Select.Option>
          <Select.Option value="Rejeté">Rejeté</Select.Option>
        </Select>

        {/* Filtrer par date */}
        <DatePicker 
          value={filterDate ? dayjs(filterDate) : null} 
          onChange={(date, dateString) => setFilterDate(dateString)} 
          className="w-48" 
          placeholder="📆 Filtrer par date" 
        />
        
        {/* Trier par score */}
        <Select 
          defaultValue="Trier par score" 
          value={sortOrder} 
          onChange={setSortOrder} 
          className="w-48" 
        >
          <Select.Option value={null}>Trier par score</Select.Option>
          <Select.Option value="asc">Score croissant</Select.Option>
          <Select.Option value="desc">Score décroissant</Select.Option>
        </Select>

        {/* Bouton pour appliquer les filtres */}
        <Button type="primary" onClick={handleFilter}>Appliquer</Button>
      </Space>

      {/* Table des candidats filtrés */}
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default CandidatsPage;
