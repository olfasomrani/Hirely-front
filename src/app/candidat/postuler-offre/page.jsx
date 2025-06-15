"use client";
import React from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Typography,
  message,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Dragger } = Upload;

export default function PostulerOffre() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Candidature envoyée :', values);
    message.success('Votre candidature a été envoyée avec succès !');
    form.resetFields();
  };

  const propsUpload = {
    name: 'file',
    multiple: false,
    beforeUpload: () => false, // désactive l'upload automatique
    accept: '.pdf,.doc,.docx',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card
        bordered={false}
        style={{ width: '100%', maxWidth: 700 }}
        className="shadow-xl"
      >
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] rounded-t-xl p-6 text-white">
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Postuler à cette offre
          </Title>
          <Paragraph style={{ color: 'white' }}>
            Remplissez le formulaire ci-dessous pour envoyer votre candidature.
          </Paragraph>
        </div>

        <div className="p-6">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Nom complet"
              name="nom"
              rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
            >
              <Input placeholder="Ex: Jean Dupont" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Veuillez entrer votre email' },
                { type: 'email', message: 'Email invalide' },
              ]}
            >
              <Input placeholder="Ex: jean.dupont@email.com" />
            </Form.Item>

            <Form.Item
              label="Lettre de motivation"
              name="motivation"
              rules={[{ required: true, message: 'Veuillez entrer votre lettre' }]}
            >
              <Input.TextArea rows={5} placeholder="Exprimez votre motivation..." />
            </Form.Item>

            <Form.Item
              label="CV (PDF, DOC)"
              name="cv"
              rules={[{ required: true, message: 'Veuillez joindre votre CV' }]}
              valuePropName="file"
            >
              <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Cliquez ou glissez votre CV ici</p>
                <p className="ant-upload-hint">Format PDF ou Word uniquement</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #1e3a8a, #06b6d4)',
                  border: 'none',
                }}
              >
                Envoyer ma candidature
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
