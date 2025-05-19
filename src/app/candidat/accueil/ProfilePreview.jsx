'use client';
import React from 'react';
import { 
  Card, 
  Descriptions, 
  Typography, 
  Divider, 
  Tag, 
  Timeline, 
  Avatar, 
  Space, 
  List, 
  Button,
  Empty
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CalendarOutlined,
  BookOutlined,
  TrophyOutlined,
  ToolOutlined,
  FileTextOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProfilePreview = ({ profileData }) => {
  const { personalInfo, education, experience, skills, documents } = profileData;

  if (!personalInfo) {
    return <Empty description="Aucune information à afficher. Veuillez compléter les sections précédentes." />;
  }

  // Fonction pour formater les dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Présent';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  // Détermine la couleur des tags de compétence selon la catégorie
  const getTagColor = (type) => {
    switch (type) {
      case 'technical': return 'blue';
      case 'languages': return 'green';
      case 'soft': return 'purple';
      default: return 'default';
    }
  };

  return (
    <div className="profile-preview">
      <Card className="mb-4">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar 
            size={80} 
            icon={<UserOutlined />} 
            src={personalInfo.photo} 
            className="border-2 border-blue-500"
          />
          <div>
            <Title level={2} className="mb-0">{personalInfo.firstName} {personalInfo.lastName}</Title>
            <Text type="secondary">{personalInfo.title || 'Candidat'}</Text>
          </div>
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label={<><MailOutlined className="mr-2" />Email</>}>
            {personalInfo.email}
          </Descriptions.Item>
          <Descriptions.Item label={<><PhoneOutlined className="mr-2" />Téléphone</>}>
            {personalInfo.phone}
          </Descriptions.Item>
          <Descriptions.Item label={<><EnvironmentOutlined className="mr-2" />Localisation</>}>
            {personalInfo.city}, {personalInfo.country}
          </Descriptions.Item>
          <Descriptions.Item label={<><GlobalOutlined className="mr-2" />Site web</>}>
            {personalInfo.website ? (
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">
                {personalInfo.website}
              </a>
            ) : 'Non spécifié'}
          </Descriptions.Item>
          {personalInfo.github && (
            <Descriptions.Item label={<><GithubOutlined className="mr-2" />GitHub</>}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                {personalInfo.github}
              </a>
            </Descriptions.Item>
          )}
          {personalInfo.linkedin && (
            <Descriptions.Item label={<><LinkedinOutlined className="mr-2" />LinkedIn</>}>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                {personalInfo.linkedin}
              </a>
            </Descriptions.Item>
          )}
        </Descriptions>

        {personalInfo.bio && (
          <>
            <Divider orientation="left">À propos</Divider>
            <Paragraph>{personalInfo.bio}</Paragraph>
          </>
        )}
      </Card>

      <Card title={<><BookOutlined className="mr-2" />Formation</>} className="mb-4">
        {education && education.length > 0 ? (
          <Timeline mode="left">
            {education.map((edu, index) => (
              <Timeline.Item 
                key={index} 
                label={`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}
                color="blue"
              >
                <div>
                  <Text strong>{edu.degree}</Text>
                  <br />
                  <Text>{edu.institution}</Text>
                  {edu.description && (
                    <>
                      <br />
                      <Text type="secondary">{edu.description}</Text>
                    </>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Empty description="Aucune formation ajoutée" />
        )}
      </Card>

      <Card title={<><TrophyOutlined className="mr-2" />Expérience professionnelle</>} className="mb-4">
        {experience && experience.length > 0 ? (
          <Timeline mode="left">
            {experience.map((exp, index) => (
              <Timeline.Item 
                key={index} 
                label={`${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`}
                color="green"
              >
                <div>
                  <Text strong>{exp.position}</Text>
                  <br />
                  <Text>{exp.company}, {exp.location}</Text>
                  {exp.description && (
                    <>
                      <br />
                      <Text type="secondary">{exp.description}</Text>
                    </>
                  )}
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Empty description="Aucune expérience ajoutée" />
        )}
      </Card>

      <Card title={<><ToolOutlined className="mr-2" />Compétences</>} className="mb-4">
        <div className="space-y-4">
          <div>
            <Title level={5}>Compétences techniques</Title>
            <div>
              {skills.technical && skills.technical.length > 0 ? (
                <Space size={[0, 8]} wrap>
                  {skills.technical.map((skill, index) => (
                    <Tag color={getTagColor('technical')} key={index}>
                      {skill}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">Aucune compétence technique ajoutée</Text>
              )}
            </div>
          </div>
          
          <div>
            <Title level={5}>Langues</Title>
            <div>
              {skills.languages && skills.languages.length > 0 ? (
                <Space size={[0, 8]} wrap>
                  {skills.languages.map((lang, index) => (
                    <Tag color={getTagColor('languages')} key={index}>
                      {lang}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">Aucune langue ajoutée</Text>
              )}
            </div>
          </div>
          
          <div>
            <Title level={5}>Compétences humaines</Title>
            <div>
              {skills.soft && skills.soft.length > 0 ? (
                <Space size={[0, 8]} wrap>
                  {skills.soft.map((skill, index) => (
                    <Tag color={getTagColor('soft')} key={index}>
                      {skill}
                    </Tag>
                  ))}
                </Space>
              ) : (
                <Text type="secondary">Aucune compétence humaine ajoutée</Text>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card title={<><FileTextOutlined className="mr-2" />Documents</>} className="mb-4">
        <List
          itemLayout="horizontal"
          dataSource={[
            { key: 'cv', title: 'CV', file: documents?.cv },
            { key: 'coverLetter', title: 'Lettre de motivation', file: documents?.coverLetter },
            { key: 'certificates', title: 'Certificats', files: documents?.certificates }
          ]}
          renderItem={(item) => {
            if (item.key === 'certificates') {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<FileTextOutlined style={{ fontSize: '24px' }} />}
                    title={item.title}
                    description={
                      item.files && item.files.length > 0 
                        ? `${item.files.length} certificat(s) ajouté(s)` 
                        : "Aucun certificat ajouté"
                    }
                  />
                </List.Item>
              );
            }
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<FileTextOutlined style={{ fontSize: '24px' }} />}
                  title={item.title}
                  description={item.file ? item.file.name : `${item.title} non ajouté`}
                />
              </List.Item>
            );
          }}
        />
      </Card>

      <div className="text-center mt-8">
        <Button 
          type="primary" 
          className="mr-4 bg-gradient-to-r from-blue-800 to-cyan-600 border-none"
        >
          Confirmer et soumettre
        </Button>
        <Button 
          type="default" 
          icon={<EditOutlined />}
        >
          Modifier mon profil
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreview;