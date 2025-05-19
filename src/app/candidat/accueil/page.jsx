'use client';
import { useState, useEffect } from 'react';
import { Steps, Button, message, Result } from 'antd';
import { UserOutlined, BookOutlined, ToolOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import PersonalInfoForm from './forms/PersonalInfoForm';


import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import DocumentsForm from './forms/DocumentsForm';
import ProfilePreview from './ProfilePreview';
import useAuth from '../../../hooks/useAuth';

const OnboardingWizard = () => {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: null,
    education: [],
    experience: [],
    skills: {
      technical: [],
      languages: [],
      soft: []
    },
    documents: {
      cv: null,
      coverLetter: null,
      certificates: []
    }
  });
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  // Vérifier si l'onboarding a déjà été complété
  useEffect(() => {
    // Ici, vous pourriez faire un appel API pour vérifier si l'utilisateur
    // a déjà complété son profil et pré-remplir les données
    // Pour l'instant, c'est juste une simulation
    if (user?.profileCompleted) {
      // Pré-remplir les données
      // setFormData(...données existantes...)
    }
  }, [user]);

  const steps = [
    {
      title: 'Informations personnelles',
      icon: <UserOutlined />,
      content: <PersonalInfoForm 
                 initialData={formData.personalInfo} 
                 onSave={(data) => handleFormSave('personalInfo', data)} 
              />
    },
    {
      title: 'Formation',
      icon: <BookOutlined />,
      content: <EducationForm 
                 initialData={formData.education} 
                 onSave={(data) => handleFormSave('education', data)} 
              />
    },
    {
      title: 'Expérience',
    //   icon: <BriefcaseOutlined />,
      content: <ExperienceForm 
                 initialData={formData.experience} 
                 onSave={(data) => handleFormSave('experience', data)} 
              />
    },
    {
      title: 'Compétences',
      icon: <ToolOutlined />,
      content: <SkillsForm 
                 initialData={formData.skills} 
                 onSave={(data) => handleFormSave('skills', data)} 
              />
    },
    {
      title: 'Documents',
      icon: <FileTextOutlined />,
      content: <DocumentsForm 
                 initialData={formData.documents} 
                 onSave={(data) => handleFormSave('documents', data)} 
              />
    },
    {
      title: 'Aperçu du profil',
      icon: <CheckCircleOutlined />,
      content: <ProfilePreview profileData={formData} />
    }
  ];

  const handleFormSave = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Appel API pour sauvegarder le profil complet
      await saveProfileToServer(formData);
      setIsComplete(true);
      message.success('Votre profil a été créé avec succès!');
    } catch (error) {
      message.error('Une erreur est survenue lors de la création de votre profil.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfileToServer = async (data) => {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Données envoyées au serveur:', data);
        resolve({ success: true });
      }, 1500);
    });
  };

  if (isComplete) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Result
          status="success"
          title="Profil créé avec succès!"
          subTitle="Votre profil est maintenant visible pour les recruteurs. Vous pouvez le modifier à tout moment depuis votre espace personnel."
          extra={[
            <Button 
              type="primary" 
              key="profile" 
              className="bg-gradient-to-r from-blue-800 to-cyan-600 border-none"
              onClick={() => window.location.href = '/candidate/profile'}
            >
              Voir mon profil
            </Button>,
            <Button key="dashboard" onClick={() => window.location.href = '/candidate/dashboard'}>
              Tableau de bord
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Complétez votre profil</h1>
      <p className="mb-8 text-gray-600">
        Suivez ces étapes pour créer votre profil de candidat et augmenter vos chances d'être repéré par les recruteurs.
      </p>
      
      <Steps
        current={current}
        items={steps.map(step => ({
          title: step.title,
          icon: step.icon
        }))}
        className="mb-8"
      />
      
      <div className="mt-4 p-4 border border-gray-100 rounded-md bg-gray-50">
        {steps[current].content}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button 
          onClick={handlePrev} 
          disabled={current === 0}
        >
          Précédent
        </Button>
        <Button 
          type="primary" 
          onClick={handleNext}
          loading={loading && current === steps.length - 1}
          className="bg-gradient-to-r from-blue-800 to-cyan-600 border-none"
        >
          {current < steps.length - 1 ? 'Suivant' : 'Terminer'}
        </Button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Étape {current + 1} sur {steps.length}
      </div>
    </div>
  );
};

export default OnboardingWizard;