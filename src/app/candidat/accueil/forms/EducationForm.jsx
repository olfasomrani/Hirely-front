// EducationForm.jsx
import React from 'react';
import { Form, Input, DatePicker, Select, Button, Typography, Card, Space } from 'antd';
import { BookOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const EducationForm = ({ onFinish, initialValues = {} }) => {
  return (
    <Card className="form-card">
      <Title level={4}>Formation</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.List name="educations" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div key={key} style={{ marginBottom: 24, position: 'relative' }}>
                  {index > 0 && (
                    <div style={{ marginBottom: 16, borderTop: '1px dashed #d9d9d9', paddingTop: 16 }}>
                      <Title level={5}>Formation {index + 1}</Title>
                    </div>
                  )}
                  
                  <Form.Item
                    {...restField}
                    name={[name, 'degree']}
                    label="Diplôme"
                    rules={[{ required: true, message: 'Veuillez saisir le nom du diplôme' }]}
                  >
                    <Input prefix={<BookOutlined />} placeholder="Ex: Master en Informatique" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'institution']}
                    label="Établissement"
                    rules={[{ required: true, message: 'Veuillez saisir le nom de l\'établissement' }]}
                  >
                    <Input placeholder="Ex: Université de Paris" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'location']}
                    label="Localisation"
                    rules={[{ required: true, message: 'Veuillez saisir la localisation' }]}
                  >
                    <Input placeholder="Ex: Paris, France" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'period']}
                    label="Période"
                    rules={[{ required: true, message: 'Veuillez sélectionner la période' }]}
                  >
                    <RangePicker style={{ width: '100%' }} picker="year" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'fieldOfStudy']}
                    label="Domaine d'études"
                    rules={[{ required: true, message: 'Veuillez saisir le domaine d\'études' }]}
                  >
                    <Input placeholder="Ex: Informatique, Droit, Commerce..." />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'grade']}
                    label="Mention"
                  >
                    <Select placeholder="Sélectionnez une mention">
                      <Option value="passable">Passable</Option>
                      <Option value="assezBien">Assez bien</Option>
                      <Option value="bien">Bien</Option>
                      <Option value="tresBien">Très bien</Option>
                      <Option value="excellent">Excellent</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'description']}
                    label="Description"
                  >
                    <Input.TextArea rows={3} placeholder="Description des cours principaux, projets, etc." />
                  </Form.Item>

                  {fields.length > 1 && (
                    <Button 
                      type="dashed" 
                      danger 
                      onClick={() => remove(name)} 
                      icon={<DeleteOutlined />}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}

              <Form.Item>
                <Button 
                  type="dashed" 
                  onClick={() => add()} 
                  block
                  icon={<PlusOutlined />}
                >
                  Ajouter une formation
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};

export default EducationForm;