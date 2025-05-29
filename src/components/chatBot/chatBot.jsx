'use client';
import React, { useState, useRef, useEffect } from 'react';
import { SendOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Bonjour! Je vais vous aider à créer une description de poste. Commençons par le titre du poste que vous souhaitez créer.", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('title');
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    role: '',
    niveau: '',
    environnement: ''
  });
  const messagesEndRef = useRef(null);

  const steps = {
    title: {
      field: 'title',
      question: 'Parfait! Maintenant, quelle est le nom de votre entreprise?',
      next: 'company'
    },
    company: {
      field: 'company',
      question: 'Excellent! Dans quelle ville/région se trouve ce poste?',
      next: 'location'
    },
    location: {
      field: 'location',
      question: 'Très bien! Quel est le rôle principal (ex: Développeur, Designer, Manager, etc.)?',
      next: 'role'
    },
    role: {
      field: 'role',
      question: 'Parfait! Quel niveau d\'expérience recherchez-vous (Junior, Confirmé, Senior, etc.)?',
      next: 'niveau'
    },
    niveau: {
      field: 'niveau',
      question: 'Excellent! Quelles sont les technologies ou l\'environnement de travail (ex: React, Node.js, Python, etc.)?',
      next: 'environnement'
    },
    environnement: {
      field: 'environnement',
      question: 'Parfait! J\'ai toutes les informations nécessaires. Je vais maintenant générer la description du poste pour vous.',
      next: 'generate'
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const resetConversation = () => {
    setCurrentStep('title');
    setJobData({
      title: '',
      company: '',
      location: '',
      role: '',
      niveau: '',
      environnement: ''
    });
    setMessages([
      { 
        id: 1, 
        text: "Bonjour! Je vais vous aider à créer une nouvelle description de poste. Commençons par le titre du poste que vous souhaitez créer.", 
        isBot: true 
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Ajouter message utilisateur
    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    const userInput = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      if (currentStep === 'generate') {
        // Générer la description avec toutes les données collectées
        const response = await fetch('http://localhost:3001/chatbot/generate-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData),
        });

        const data = await response.json();

        const descriptionMessage = {
          id: messages.length + 2,
          text: data.description || "Désolé, je n'ai pas pu générer la description.",
          isBot: true,
        };

        const followUpMessage = {
          id: messages.length + 3,
          text: "Voilà votre description de poste! Souhaitez-vous créer une nouvelle description? Tapez 'nouveau' pour recommencer.",
          isBot: true,
        };

        setMessages(prev => [...prev, descriptionMessage, followUpMessage]);
        setCurrentStep('completed');
      } else {
        // Traiter les étapes de collecte d'informations
        if (userInput.toLowerCase() === 'nouveau' && currentStep === 'completed') {
          resetConversation();
          setIsTyping(false);
          return;
        }

        // Mettre à jour les données du job
        const currentField = steps[currentStep].field;
        const updatedJobData = {
          ...jobData,
          [currentField]: userInput
        };
        setJobData(updatedJobData);

        // Préparer la prochaine question
        const nextStep = steps[currentStep].next;
        let botResponse;

        if (nextStep === 'generate') {
          // Récapitulatif avant génération
          botResponse = `Parfait! Voici un récapitulatif de votre offre:
          
📋 **Titre:** ${updatedJobData.title}
🏢 **Entreprise:** ${updatedJobData.company}
📍 **Localisation:** ${updatedJobData.location}
👨‍💻 **Rôle:** ${updatedJobData.role}
⭐ **Niveau:** ${updatedJobData.niveau}
🛠️ **Technologies:** ${updatedJobData.environnement}

Tout semble correct? Tapez 'confirmer' pour générer la description ou 'modifier' si vous souhaitez changer quelque chose.`;
        } else {
          botResponse = steps[currentStep].question;
        }

        const newBotMessage = {
          id: messages.length + 2,
          text: botResponse,
          isBot: true,
        };

        setMessages(prev => [...prev, newBotMessage]);
        setCurrentStep(nextStep);
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Une erreur est survenue. Pouvez-vous réessayer?",
        isBot: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-20"
        >
          <MessageOutlined className="text-2xl" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-20 border border-gray-200">
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                <MessageOutlined className="text-blue-800" />
              </div>
              <h3 className="font-medium">Assistant RH</h3>
            </div>
            <button onClick={toggleChat} className="hover:text-gray-300">
              <CloseOutlined />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-xs rounded-lg px-4 py-2 shadow-sm ${
                    message.isBot 
                      ? 'bg-white border border-gray-200 text-gray-800' 
                      : 'bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white'
                  }`}
                >
                  <div className="whitespace-pre-line">{message.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder={
                  currentStep === 'completed' 
                    ? "Tapez 'nouveau' pour recommencer..." 
                    : "Tapez votre réponse..."
                }
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="ml-2 w-10 h-10 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                disabled={!input.trim()}
              >
                <SendOutlined />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;