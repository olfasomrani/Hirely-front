'use client';
import React, { useState } from 'react';
import EditorSidebar from '../../../components/cvEditor/EditorSidebar';
import CVPreview from '../../../components/cvEditor/CVPreview';
import ExportPDFButton from '../../../components/cvEditor/ExportPDFButton';

const BuildCV = () => {
  const [data, setData] = useState({
    name: '',
    title: '',
    summary: '',
    experiences: ['Développeur Web chez ABC', 'Freelance en React'],
    skills: ['JavaScript', 'React', 'Node.js'],
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 p-4">
      <aside className="w-full md:w-1/3 bg-white p-4 shadow-md rounded">
        <EditorSidebar data={data} setData={setData} />
      </aside>
      <main className="w-full md:w-2/3 p-4">
        <CVPreview data={data} />
        <div className="mt-4">
          <ExportPDFButton />
        </div>
      </main>
    </div>
  );
};

export default BuildCV;
