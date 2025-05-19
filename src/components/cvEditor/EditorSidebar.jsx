import React from 'react';
import { Input, Button, Divider } from 'antd';

const EditorSidebar = ({ data, setData }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Éditeur CV</h2>
      <Divider />
      <Input
        placeholder="Nom Complet"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <Input
        placeholder="Poste"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <Input.TextArea
        placeholder="Résumé"
        rows={4}
        value={data.summary}
        onChange={(e) => setData({ ...data, summary: e.target.value })}
      />
    </div>
  );
};

export default EditorSidebar;
