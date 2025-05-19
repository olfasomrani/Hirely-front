import React from 'react';
import SectionBlock from './SectionBlock';
import { Avatar } from 'antd';

const CVPreview = ({ data }) => {
  return (
    <div id="cv-preview" className="bg-white p-6 w-full max-w-3xl mx-auto rounded shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <Avatar size={80} src="/default-avatar.png" />
        <div>
          <h1 className="text-2xl font-bold">{data.name || 'Nom Complet'}</h1>
          <p className="text-gray-600">{data.title || 'Poste souhaité'}</p>
        </div>
      </div>

      <SectionBlock title="À propos">
        <p>{data.summary || 'Écrivez un court résumé ici...'}</p>
      </SectionBlock>

      <SectionBlock title="Expérience">
        <ul className="list-disc ml-6">
          {data.experiences?.map((exp, i) => (
            <li key={i}>{exp}</li>
          )) || <li>Exemple d'expérience professionnelle</li>}
        </ul>
      </SectionBlock>

      <SectionBlock title="Compétences">
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          )) || <span>HTML, CSS, JavaScript</span>}
        </div>
      </SectionBlock>
    </div>
  );
};

export default CVPreview;
