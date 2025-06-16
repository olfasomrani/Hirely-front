"use client";
import React, { useState } from 'react';
import { 
  Card, 
  Avatar, 
  Button, 
  Tag, 
  Progress, 
  Tabs, 
  Timeline, 
  Rate,
  Statistic,
  Badge,
  Space,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import {
  EditOutlined,
  SettingOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  CalendarOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Données statiques du profil
const profileData = {
  user: {
    id: 1,
    name: "ahlem inst",
    title: "Développeur Full Stack ",
    email: "ahlem.be@email.com",
    phone: "+216 XX XXX XXX",
    location: "Tunis, Tunisie",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=300&fit=crop",
    bio: "Passionné par le développement web moderne avec plus de 5 ans d'expérience. Spécialisé dans React, NestJS et les architectures cloud. Toujours à la recherche de nouveaux défis techniques.",
    joinDate: "Janvier 2020",

    verified: true,
    status: "Disponible pour projets"
  },
  skills: [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "NestJS", level: 90, color: "#E0234E" },
    { name: "TypeScript", level: 88, color: "#3178C6" },
    { name: "Node.js", level: 85, color: "#339933" },
    { name: "PostgreSQL", level: 80, color: "#4169E1" },
    { name: "Docker", level: 75, color: "#2496ED" }
  ],
  projects: [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Plateforme e-commerce complète avec React et NestJS",
      tech: ["React", "NestJS", "PostgreSQL"],
      status: "Terminé",
      date: "2024"
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Application de gestion de tâches collaboratives",
      tech: ["Vue.js", "Express", "MongoDB"],
      status: "En cours",
      date: "2024"
    },
    {
      id: 3,
      name: "Portfolio Website",
      description: "Site portfolio responsive avec animations",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      status: "Terminé",
      date: "2023"
    }
  ],
  experience: [
    {
      title: "Développeur Full Stack Senior",
      company: "TechCorp Solutions",
      period: "2022 - Présent",
      description: "Développement d'applications web modernes, encadrement d'équipe junior"
    },
    {
      title: "Développeur Frontend",
      company: "StartupTech",
      period: "2020 - 2022",
      description: "Création d'interfaces utilisateur avec React et Vue.js"
    },
    {
      title: "Développeur Junior",
      company: "WebAgency",
      period: "2019 - 2020",
      description: "Premier poste, développement de sites web et applications"
    }
  ],
  achievements: [
    { title: "Certification AWS", date: "2023", icon: "🏆" },
    { title: "Meilleur projet de l'année", date: "2022", icon: "🥇" },
    { title: "Formation React avancée", date: "2021", icon: "📚" }
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/ahmed-bensalah",
    github: "https://github.com/ahmed-bensalah",
    twitter: "https://twitter.com/ahmed_bensalah"
  }
};

const ProfileDesign = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const ProfileHeader = () => (
    <div className="relative">
      {/* Cover Image */}
      <div 
        className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-t-lg"
        style={{
          backgroundImage: `url(${profileData.user.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-lg"></div>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <Badge dot={profileData.user.verified} offset={[-8, 8]}>
              <Avatar 
                size={120} 
                src={profileData.user.avatar}
                className="border-4 border-white shadow-lg"
              />
            </Badge>
            
            <div className="text-center md:text-left mb-4 md:mb-0">
              <Title level={2} className="mb-1 text-white md:text-gray-800">
                {profileData.user.name}
              </Title>
              <Text className="text-lg text-gray-300 md:text-gray-600">
                {profileData.user.title}
              </Text>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <EnvironmentOutlined className="mr-1 text-gray-400" />
                <Text className="text-gray-300 md:text-gray-500">
                  {profileData.user.location}
                </Text>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-1">
                <CalendarOutlined className="mr-1 text-gray-400" />
                <Text className="text-gray-300 md:text-gray-500">
                  Membre depuis {profileData.user.joinDate}
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <Button 
              type="primary" 
              icon={<MessageOutlined />}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-none"
            >
              Message
            </Button>
            <Button icon={<ShareAltOutlined />}>
              Partager
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsCards = () => (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={8} md={6}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <Statistic
            title="Abonnés"
            value={profileData.user.followers}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8} md={6}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <Statistic
            title="Abonnements"
            value={profileData.user.following}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8} md={6}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <Statistic
            title="Publications"
            value={profileData.user.posts}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card className="text-center hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center">
            <Text className="text-gray-500 mb-2">Évaluation</Text>
            <div className="flex items-center">
              <Rate disabled defaultValue={Math.floor(profileData.user.rating)} />
              <Text className="ml-2 text-lg font-bold text-orange-500">
                {profileData.user.rating}
              </Text>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );

  const OverviewTab = () => (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Card title="À propos" className="mb-6">
          <Paragraph className="text-gray-600 leading-relaxed">
            {profileData.user.bio}
          </Paragraph>
          <div className="mt-4">
            <Tag color="green" className="mb-2">{profileData.user.status}</Tag>
          </div>
        </Card>

        <Card title="Compétences" className="mb-6">
          <div className="space-y-4">
            {profileData.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <Text strong>{skill.name}</Text>
                  <Text className="text-gray-500">{skill.level}%</Text>
                </div>
                <Progress 
                  percent={skill.level} 
                  strokeColor={skill.color}
                  showInfo={false}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Projets récents">
          <div className="space-y-4">
            {profileData.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <Title level={5} className="mb-1">{project.name}</Title>
                  <Tag color={project.status === 'Terminé' ? 'green' : 'blue'}>
                    {project.status}
                  </Tag>
                </div>
                <Paragraph className="text-gray-600 mb-2">
                  {project.description}
                </Paragraph>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <Tag key={i} color="geekblue">{tech}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Card title="Informations de contact" className="mb-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <MailOutlined className="text-blue-500 mr-3" />
              <Text>{profileData.user.email}</Text>
            </div>
            <div className="flex items-center">
              <PhoneOutlined className="text-green-500 mr-3" />
              <Text>{profileData.user.phone}</Text>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined className="text-red-500 mr-3" />
              <Text>{profileData.user.location}</Text>
            </div>
          </div>
          
          <Divider />
          
          <div className="flex justify-center space-x-4">
            <Button 
              type="text" 
              icon={<LinkedinOutlined />} 
              size="large"
              className="text-blue-600 hover:bg-blue-50"
            />
            <Button 
              type="text" 
              icon={<GithubOutlined />} 
              size="large"
              className="text-gray-700 hover:bg-gray-50"
            />
            <Button 
              type="text" 
              icon={<TwitterOutlined />} 
              size="large"
              className="text-blue-400 hover:bg-blue-50"
            />
          </div>
        </Card>

        <Card title="Réalisations">
          <div className="space-y-3">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <Text strong className="block">{achievement.title}</Text>
                  <Text className="text-gray-500 text-sm">{achievement.date}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );

  const ExperienceTab = () => (
    <Card title="Expérience professionnelle">
      <Timeline className="mt-4">
        {profileData.experience.map((exp, index) => (
          <Timeline.Item 
            key={index}
            dot={<TrophyOutlined className="text-blue-500" />}
          >
            <div className="pb-4">
              <Title level={4} className="mb-1">{exp.title}</Title>
              <Text strong className="text-blue-600">{exp.company}</Text>
              <Text className="text-gray-500 ml-2">• {exp.period}</Text>
              <Paragraph className="mt-2 text-gray-600">
                {exp.description}
              </Paragraph>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="mb-6 overflow-hidden shadow-lg">
          <ProfileHeader />
        </Card>

        <StatsCards />

        <Card>
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="custom-tabs"
          >
            <TabPane 
              tab={
                <span>
                  <UserOutlined />
                  Vue d'ensemble
                </span>
              } 
              key="overview"
            >
              <OverviewTab />
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <BookOutlined />
                  Expérience
                </span>
              } 
              key="experience"
            >
              <ExperienceTab />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDesign;