import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportPDFButton = () => {
  const exportToPDF = () => {
    const input = document.getElementById('cv-preview');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv.pdf');
    });
  };

  return <button onClick={exportToPDF}>Exporter en PDF</button>;
};

export default ExportPDFButton;
