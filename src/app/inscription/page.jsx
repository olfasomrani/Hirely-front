"use client";
import React from "react";
import RegistrationForm from "./form";

const  RegistrationPage = () => {
  return (
    <div className="h-100 flex items-center justify-center p-4 md:p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <aside className="hidden md:flex flex-col items-center justify-between bg-gradient-to-br from-indigo-800 to-purple-900 relative overflow-hidden p-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full grid grid-cols-10">
              {[...Array(10)].map((_, i) => (
                <div key={`col-${i}`} className="border-r border-white"></div>
              ))}
            </div>
            <div className="h-full w-full grid grid-rows-10">
              {[...Array(10)].map((_, i) => (
                <div key={`row-${i}`} className="border-b border-white"></div>
              ))}
            </div>
          </div>
          
          {/* Logo et contenu */}
          <div className="flex flex-col items-center z-10 mt-8">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">TalentSphere</h2>
            <p className="text-lg text-center mb-6 text-white text-opacity-80">
              Créez votre compte pour rejoindre notre plateforme de recrutement
            </p>
          </div>
          
          {/* Avantages */}
          <div className="flex flex-col space-y-6 z-10 w-full max-w-md">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-400 bg-opacity-30 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Profil personnalisé</h3>
                <p className="text-white text-opacity-70">Créez un profil qui met en valeur vos compétences et expériences</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-400 bg-opacity-30 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Processus optimisé</h3>
                <p className="text-white text-opacity-70">Une expérience fluide pour les candidats et les recruteurs</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-400 bg-opacity-30 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Sécurité garantie</h3>
                <p className="text-white text-opacity-70">Vos données personnelles sont protégées et sécurisées</p>
              </div>
            </div>
          </div>
          <div className="mt-8 z-10 bg-white  p-4 rounded-lg  w-full max-w-md">
            <p className="text-center text-black">
              Vous avez déjà un compte? <a href="/login" className="font-medium text-black hover:text-black">Connectez-vous</a>
            </p>
          </div>
        </aside>
        <section className="p-6 md:p-10 flex flex-col justify-center bg-white overflow-y-auto max-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Inscription</h1>
            <p className="mt-2 text-gray-600">
              Créez votre compte pour accéder à toutes nos fonctionnalités
            </p>
          </div>
          
          <RegistrationForm />
        </section>
      </div>
    </div>
  );
}

export default RegistrationPage;