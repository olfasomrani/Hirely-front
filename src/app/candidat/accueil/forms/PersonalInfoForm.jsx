// PersonalInfoForm.jsx
import React from 'react';
import { Form, Input, DatePicker, Select, Typography, Card } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PersonalInfoForm = ({ onFinish, initialValues = {} }) => {
  return (
    <Card className="form-card">
      <Title level={4}>Informations personnelles</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="firstName"
          label="Prénom"
          rules={[{ required: true, message: 'Veuillez saisir votre prénom' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Prénom" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Nom"
          rules={[{ required: true, message: 'Veuillez saisir votre nom' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nom" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Veuillez saisir votre email' },
            { type: 'email', message: 'Email invalide' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="exemple@email.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Téléphone"
          rules={[{ required: true, message: 'Veuillez saisir votre numéro de téléphone' }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="+33 6 12 34 56 78" />
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="Date de naissance"
          rules={[{ required: true, message: 'Veuillez sélectionner votre date de naissance' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Sélectionnez une date" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Adresse"
          rules={[{ required: true, message: 'Veuillez saisir votre adresse' }]}
        >
          <TextArea rows={3} placeholder="Adresse complète" prefix={<HomeOutlined />} />
        </Form.Item>

        <Form.Item
          name="city"
          label="Ville"
          rules={[{ required: true, message: 'Veuillez saisir votre ville' }]}
        >
          <Input placeholder="Ville" />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Code postal"
          rules={[{ required: true, message: 'Veuillez saisir votre code postal' }]}
        >
          <Input placeholder="Code postal" />
        </Form.Item>

        <Form.Item
          name="country"
          label="Pays"
          rules={[{ required: true, message: 'Veuillez sélectionner votre pays' }]}
        >
          <Select placeholder="Sélectionnez votre pays">
            <Option value="france">France</Option>
            <Option value="belgique">Belgique</Option>
            <Option value="suisse">Suisse</Option>
            <Option value="canada">Canada</Option>
            <Option value="autre">Autre</Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PersonalInfoForm;