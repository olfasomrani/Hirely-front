import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Select, 
  Typography, 
  Tag, 
  Space, 
  Table, 
  Divider 
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const SkillsForm = ({ onSave, onNext, existingData = {} }) => {
  const [form] = Form.useForm();
  
  const [skillsData, setSkillsData] = useState({
    technicalSkills: existingData.technicalSkills || [],
    languageSkills: existingData.languageSkills || [],
    softSkills: existingData.softSkills || [],
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', level: 'Débutant' });
  const [newSoftSkill, setNewSoftSkill] = useState('');

  // Technical skills section
  const handleAddTechnicalSkill = () => {
    if (newSkill.trim() && !skillsData.technicalSkills.includes(newSkill.trim())) {
      setSkillsData({
        ...skillsData,
        technicalSkills: [...skillsData.technicalSkills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveTechnicalSkill = (skill) => {
    setSkillsData({
      ...skillsData,
      technicalSkills: skillsData.technicalSkills.filter(item => item !== skill)
    });
  };

  // Language skills section
  const handleAddLanguage = () => {
    if (newLanguage.name.trim()) {
      // Check if language already exists
      const languageExists = skillsData.languageSkills.some(
        lang => lang.name.toLowerCase() === newLanguage.name.trim().toLowerCase()
      );
      
      if (!languageExists) {
        setSkillsData({
          ...skillsData,
          languageSkills: [...skillsData.languageSkills, {
            name: newLanguage.name.trim(),
            level: newLanguage.level
          }]
        });
        setNewLanguage({ name: '', level: 'Débutant' });
      }
    }
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...skillsData.languageSkills];
    updatedLanguages.splice(index, 1);
    setSkillsData({
      ...skillsData,
      languageSkills: updatedLanguages
    });
  };

  // Soft skills section
  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() && !skillsData.softSkills.includes(newSoftSkill.trim())) {
      setSkillsData({
        ...skillsData,
        softSkills: [...skillsData.softSkills, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const handleRemoveSoftSkill = (skill) => {
    setSkillsData({
      ...skillsData,
      softSkills: skillsData.softSkills.filter(item => item !== skill)
    });
  };

  const handleFinish = () => {
    onSave(skillsData);
    onNext();
  };

  // Handle Enter key for adding skills
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  // Language level options
  const languageLevels = ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Natif'];
  
  // Table columns for languages
  const languageColumns = [
    {
      title: 'Langue',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Niveau',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record, index) => (
        <Button 
          type="text" 
          danger 
          icon={<CloseOutlined />} 
          onClick={() => handleRemoveLanguage(index)}
        >
          Supprimer
        </Button>
      ),
    },
  ];

  return (
    <div className="skills-form">
      <Title level={2}>Compétences et Langues</Title>
      <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
        Ajoutez vos compétences techniques, linguistiques et personnelles pour vous démarquer.
      </Text>

      <Form 
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        {/* Technical Skills Section */}
        <Card title="Compétences Techniques" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
            Ajoutez vos compétences techniques (langages de programmation, outils, technologies, etc.)
          </Text>
          
          <Form.Item
            name="technicalSkills"
            rules={[
              { 
                validator: () => {
                  if (skillsData.technicalSkills.length === 0) {
                    return Promise.reject(new Error("Veuillez ajouter au moins une compétence technique"));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <div>
              <Space style={{ marginBottom: 16 }}>
                <Input
                  placeholder="Ex: JavaScript, React, Excel..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddTechnicalSkill)}
                  style={{ width: 300 }}
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddTechnicalSkill}
                >
                  Ajouter
                </Button>
              </Space>
              
              <div style={{ marginTop: 16 }}>
                {skillsData.technicalSkills.map((skill, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveTechnicalSkill(skill)}
                    color="blue"
                    style={{ margin: '0 8px 8px 0', padding: '5px 8px', fontSize: '14px' }}
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </Form.Item>
        </Card>

        {/* Language Skills Section */}
        <Card title="Compétences Linguistiques" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
            Ajoutez les langues que vous maîtrisez et votre niveau
          </Text>

          <Form.Item
            name="languageSkills"
            rules={[
              { 
                validator: () => {
                  if (skillsData.languageSkills.length === 0) {
                    return Promise.reject(new Error("Veuillez ajouter au moins une langue"));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <div>
              <Space style={{ marginBottom: 16 }}>
                <Input
                  placeholder="Ex: Français, Anglais, Espagnol..."
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                  onKeyPress={(e) => handleKeyPress(e, handleAddLanguage)}
                  style={{ width: 200 }}
                />
                <Select
                  value={newLanguage.level}
                  onChange={(value) => setNewLanguage({ ...newLanguage, level: value })}
                  style={{ width: 150 }}
                >
                  {languageLevels.map(level => (
                    <Option key={level} value={level}>{level}</Option>
                  ))}
                </Select>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddLanguage}
                >
                  Ajouter
                </Button>
              </Space>
              
              {skillsData.languageSkills.length > 0 && (
                <Table
                  columns={languageColumns}
                  dataSource={skillsData.languageSkills.map((lang, i) => ({ ...lang, key: i }))}
                  pagination={false}
                  size="small"
                  style={{ marginTop: 16 }}
                />
              )}
            </div>
          </Form.Item>
        </Card>

        {/* Soft Skills Section */}
        <Card title="Compétences Personnelles (optionnel)" style={{ marginBottom: 24 }}>
          <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
            Ajoutez vos qualités personnelles et compétences comportementales
          </Text>
          
          <Form.Item name="softSkills">
            <div>
              <Space style={{ marginBottom: 16 }}>
                <Input
                  placeholder="Ex: Communication, Travail d'équipe, Adaptabilité..."
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddSoftSkill)}
                  style={{ width: 300 }}
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddSoftSkill}
                >
                  Ajouter
                </Button>
              </Space>
              
              <div style={{ marginTop: 16 }}>
                {skillsData.softSkills.map((skill, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveSoftSkill(skill)}
                    color="cyan"
                    style={{ margin: '0 8px 8px 0', padding: '5px 8px', fontSize: '14px' }}
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </Form.Item>
        </Card>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => onNext()}>
              Ignorer cette étape
            </Button>
            <Button type="primary" htmlType="submit">
              Enregistrer et continuer
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SkillsForm;
