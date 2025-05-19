'use client';
import React, { useState, useRef, useEffect } from 'react';
import { SendOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Bonjour! Comment puis-je vous aider aujourd'hui?", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Réponses prédéfinies - à remplacer par une vraie API
  const botResponses = [
    "Je vais vérifier cela pour vous immédiatement.",
    "Merci pour votre question. Que puis-je faire d'autre pour vous aider?",
    "N'hésitez pas à me poser d'autres questions si besoin.",
    "Cette information est disponible dans votre espace personnel.",
    "Pour cette demande spécifique, je vous recommande de contacter notre service client au 01 23 45 67 89."
  ];
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };
    
    setMessages([...messages, newUserMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simuler une réponse du bot après un délai
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <>
      {/* Bouton flottant pour ouvrir le chat */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-20"
        >
          <MessageOutlined className="text-2xl" />
        </button>
      )}
      
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-20 border border-gray-200">
          {/* Header du chat */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                <MessageOutlined className="text-blue-800" />
              </div>
              <h3 className="font-medium">Assistant</h3>
            </div>
            <button onClick={toggleChat} className="hover:text-gray-300">
              <CloseOutlined />
            </button>
          </div>
          
          {/* Corps du chat avec les messages */}
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
                  {message.text}
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
          
          {/* Zone de saisie */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="ml-2 w-10 h-10 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white flex items-center justify-center"
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