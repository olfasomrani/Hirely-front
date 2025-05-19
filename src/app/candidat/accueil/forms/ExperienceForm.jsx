"use client";
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Checkbox, Card, Row, Col, Typography, Space, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;

const ExperienceForm = ({ onSave, onNext, existingData = [] }) => {
  const [form] = Form.useForm();
  
  // Transform existing data if available
  const initialExperiences = existingData.length > 0 
    ? existingData.map(exp => ({
        ...exp,
        startDate: exp.startDate ? moment(exp.startDate) : null,
        endDate: exp.endDate ? moment(exp.endDate) : null,
      }))
    : [getEmptyExperience()];

  const [experiences, setExperiences] = useState(initialExperiences);

  function getEmptyExperience() {
    return {
      company: '',
      position: '',
      location: '',
      startDate: null,
      endDate: null,
      description: '',
      currentlyWorking: false
    };
  }

  const handleAddExperience = () => {
    setExperiences([...experiences, getEmptyExperience()]);
  };

  const handleRemoveExperience = (index) => {
    if (experiences.length === 1) return; // Keep at least one experience
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    
    // If currentlyWorking is checked, clear the end date
    if (field === 'currentlyWorking' && value === true) {
      updatedExperiences[index].endDate = null;
    }
    
    setExperiences(updatedExperiences);
  };

  const handleFinish = (values) => {
    // Transform the experiences for saving (convert moments to strings)
    const formattedExperiences = experiences.map(exp => ({
      ...exp,
      startDate: exp.startDate ? exp.startDate.format('YYYY-MM-DD') : '',
      endDate: exp.endDate ? exp.endDate.format('YYYY-MM-DD') : '',
    }));
    
    onSave(formattedExperiences);
    onNext();
  };

  const validateDates = (_, value, callback) => {
    // This is for form validation rules
    return Promise.resolve();
  };

  return (
    <div className="experience-form">
      <Title level={2}>Expériences Professionnelles</Title>
      <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
        Ajoutez vos expériences professionnelles, de la plus récente à la plus ancienne.
      </Text>

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
        initialValues={{ experiences }}
      >
        {experiences.map((experience, index) => (
          <Card 
            key={index} 
            style={{ marginBottom: 24 }}
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Expérience {index + 1}</span>
                {experiences.length > 1 && (
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleRemoveExperience(index)}
                  >
                    Supprimer
                  </Button>
                )}
              </div>
            }
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Entreprise"
                  name={['experiences', index, 'company']}
                  initialValue={experience.company}
                  rules={[{ required: true, message: "L'entreprise est requise" }]}
                >
                  <Input 
                    placeholder="Ex: Entreprise XYZ"
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Poste"
                  name={['experiences', index, 'position']}
                  initialValue={experience.position}
                  rules={[{ required: true, message: "Le poste est requis" }]}
                >
                  <Input 
                    placeholder="Ex: Développeur Web"
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Lieu"
              name={['experiences', index, 'location']}
              initialValue={experience.location}
            >
              <Input 
                placeholder="Ex: Paris, France"
                onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date de début"
                  name={['experiences', index, 'startDate']}
                  initialValue={experience.startDate}
                  rules={[{ required: true, message: "La date de début est requise" }]}
                >
                  <DatePicker 
                    style={{ width: '100%' }} 
                    placeholder="Sélectionner une date"
                    onChange={(date) => handleExperienceChange(index, 'startDate', date)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date de fin"
                  name={['experiences', index, 'endDate']}
                  initialValue={experience.endDate}
                  dependencies={['experiences', index, 'startDate']}
                  rules={[
                    { 
                      required: !experience.currentlyWorking, 
                      message: "La date de fin est requise" 
                    },
                    { 
                      validator: (_, value) => {
                        if (experience.startDate && value && value.isBefore(experience.startDate)) {
                          return Promise.reject(new Error("La date de fin doit être postérieure à la date de début"));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <DatePicker 
                    style={{ width: '100%' }} 
                    placeholder="Sélectionner une date"
                    disabled={experience.currentlyWorking}
                    onChange={(date) => handleExperienceChange(index, 'endDate', date)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name={['experiences', index, 'currentlyWorking']}
              valuePropName="checked"
              initialValue={experience.currentlyWorking}
            >
              <Checkbox 
                onChange={(e) => handleExperienceChange(index, 'currentlyWorking', e.target.checked)}
              >
                Poste actuel
              </Checkbox>
            </Form.Item>

            <Form.Item
              label="Description"
              name={['experiences', index, 'description']}
              initialValue={experience.description}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="Décrivez vos responsabilités, réalisations et compétences utilisées..."
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              />
            </Form.Item>
          </Card>
        ))}

        <div style={{ marginBottom: 24 }}>
          <Button 
            type="dashed" 
            onClick={handleAddExperience} 
            icon={<PlusOutlined />}
            block
          >
            Ajouter une expérience
          </Button>
        </div>

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

export default ExperienceForm;