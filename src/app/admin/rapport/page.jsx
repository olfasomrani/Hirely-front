"use client";
import { useState } from "react";

export default function CustomReports() {
  // États pour gérer la sélection des critères de rapport
  const [reportType, setReportType] = useState("candidatures"); // Exemple: candidatures, offres, utilisateurs
  const [dateRange, setDateRange] = useState("lastMonth"); // Options : lastWeek, lastMonth, custom

  // Données simulées pour les rapports (cela serait récupéré depuis une API dans une vraie app)
  const reportData = {
    candidatures: [
      { title: "Candidatures acceptées", value: 120 },
      { title: "Candidatures rejetées", value: 50 },
      { title: "Candidatures en attente", value: 35 },
    ],
    offres: [
      { title: "Offres publiées", value: 45 },
      { title: "Offres expirées", value: 10 },
      { title: "Offres actives", value: 35 },
    ],
    utilisateurs: [
      { title: "Recruteurs enregistrés", value: 18 },
      { title: "Candidats inscrits", value: 200 },
      { title: "Administrateurs", value: 3 },
    ],
  };

  const handleChangeReportType = (event) => setReportType(event.target.value);
  const handleChangeDateRange = (event) => setDateRange(event.target.value);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Rapports Personnalisés</h1>

      {/* Sélection du type de rapport */}
      <div className="mb-4">
        <label className="block text-gray-700">Sélectionner le type de rapport</label>
        <select
          value={reportType}
          onChange={handleChangeReportType}
          className="mt-2 p-3 border rounded-lg w-full bg-white"
        >
          <option value="candidatures">Candidatures</option>
          <option value="offres">Offres</option>
          <option value="utilisateurs">Utilisateurs</option>
        </select>
      </div>

      {/* Sélection de la période */}
      <div className="mb-4">
        <label className="block text-gray-700">Sélectionner la période</label>
        <select
          value={dateRange}
          onChange={handleChangeDateRange}
          className="mt-2 p-3 border rounded-lg w-full bg-white"
        >
          <option value="lastWeek">La semaine dernière</option>
          <option value="lastMonth">Le mois dernier</option>
          <option value="custom">Personnalisée</option>
        </select>
      </div>

      {/* Affichage du rapport basé sur le type et la période sélectionnée */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rapport sur {reportType.charAt(0).toUpperCase() + reportType.slice(1)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData[reportType].map((item, index) => (
            <div key={index} className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
