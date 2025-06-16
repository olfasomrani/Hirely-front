"use client";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CustomReports() {
  const [reportType, setReportType] = useState("candidatures");
  const [dateRange, setDateRange] = useState("lastMonth");
  const reportRef = useRef(); // Référence au contenu à exporter

  const reportData = {
    candidatures: [
      { title: "Candidatures acceptées", value: 1 },
      { title: "Candidatures rejetées", value: 5 },
      { title: "Candidatures en attente", value: 3 },
    ],
    offres: [
      { title: "Offres publiées", value: 7 },
      { title: "Offres expirées", value: 0 },
      { title: "Offres actives", value: 7 },
    ],
  };

  const handleChangeReportType = (e) => setReportType(e.target.value);
  const handleChangeDateRange = (e) => setDateRange(e.target.value);

  const generatePDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`rapport_${reportType}_${dateRange}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Rapports Personnalisés
      </h1>

      {/* Sélection du type de rapport */}
      <div className="mb-4">
        <label className="block text-gray-700">
          Sélectionner le type de rapport
        </label>
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

      {/* Bouton PDF */}

      {/* Rapport affiché */}
      <div ref={reportRef} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Rapport sur {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData[reportType].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-600 text-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <button
          onClick={generatePDF}
          className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded"
        >
          Télécharger le rapport en PDF
        </button>
      </div>
    </div>
  );
}
