'use client';
import React from 'react';
import { Card, Button, Row, Col, Typography, Tag } from 'antd';
import {
  RocketOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const offres = [
  {
    id: 1,
    titre: 'Développeur Full Stack',
    entreprise: 'TechNova',
    localisation: 'Paris, France',
    salaire: '45k - 60k€',
    type: 'CDI',
    description: 'Rejoignez notre équipe pour développer des applications modernes.',
    image: 'https://d2ms8rpfqc4h24.cloudfront.net/Guide_to_Full_Stack_Development_000eb0b2d0.jpg',
  },
  {
    id: 2,
    titre: 'UX/UI Designer',
    entreprise: 'CreativeStudio',
    localisation: 'Lyon, France',
    salaire: '35k - 50k€',
    type: 'CDD',
    description: 'Participez à la création d’interfaces utilisateur innovantes.',
    image: 'https://d2ms8rpfqc4h24.cloudfront.net/Guide_to_Full_Stack_Development_000eb0b2d0.jpg',
  },
  {
    id: 3,
    titre: 'Chef de Projet IT',
    entreprise: 'InnovaCorp',
    localisation: 'Toulouse, France',
    salaire: '55k - 70k€',
    type: 'Freelance',
    description: 'Gérez des projets informatiques stratégiques dans une grande entreprise.',
    image: 'https://d2ms8rpfqc4h24.cloudfront.net/Guide_to_Full_Stack_Development_000eb0b2d0.jpg',
  },
];

const OffresCandidat = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <Title level={2} style={{ color: 'white', textAlign: 'center', marginBottom: 40 }}>
        Nos Offres d'Emploi
      </Title>
      <Row gutter={[24, 24]}>
        {offres.map((offre) => (
          <Col xs={24} sm={12} md={8} key={offre.id}>
            <Card
              hoverable
              style={{
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
              cover={
                <img
                  alt="Illustration métier"
                  src={offre.image}
                  style={{ height: 180, objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                />
              }
            >
              <Title level={4}>{offre.titre}</Title>
              <Paragraph>
                <BankOutlined /> <strong>{offre.entreprise}</strong>
              </Paragraph>
              <Paragraph>
                <EnvironmentOutlined /> {offre.localisation}
              </Paragraph>
              <Paragraph>
                <DollarOutlined /> {offre.salaire}
              </Paragraph>
              <Tag color="blue">{offre.type}</Tag>
              <Paragraph>{offre.description}</Paragraph>
              <Button type="primary" icon={<RocketOutlined />} block>
                Postuler
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OffresCandidat;
