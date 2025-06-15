"use client";
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Card,
  Typography,
} from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export default function AjouterEntretien() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Entretien ajouté :', values);
    alert('Entretien ajouté avec succès !');
    form.resetFields();
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
            Planifier un entretien
          </Title>
          <Paragraph style={{ color: 'white' }}>
            Organisez un rendez-vous avec un candidat.
          </Paragraph>
        </div>

        <div className="p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              type: 'Visio',
              date: null,
              heure: null,
            }}
          >
            <Form.Item
              name="candidat"
              label="Nom du candidat"
              rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
            >
              <Input placeholder="Ex: Jean Dupont" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type d’entretien"
              rules={[{ required: true, message: 'Veuillez sélectionner un type' }]}
            >
              <Select>
                <Select.Option value="Visio">Visio</Select.Option>
                <Select.Option value="Téléphone">Téléphone</Select.Option>
                <Select.Option value="Présentiel">Présentiel</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              name="heure"
              label="Heure"
              rules={[{ required: true, message: 'Veuillez sélectionner une heure' }]}
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>

            <Form.Item name="notes" label="Notes / Objectifs">
              <TextArea rows={4} placeholder="Parler des compétences, disponibilité, etc." />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #1e3a8a, #06b6d4)',
                  border: 'none',
                }}
              >
                Enregistrer l’entretien
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
