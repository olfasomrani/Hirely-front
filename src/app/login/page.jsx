import React from "react";
import LoginForm from "./form";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <aside className="hidden md:flex flex-col items-center justify-between bg-gradient-to-br from-indigo-800 to-purple-900 relative overflow-hidden p-10">
          {/* Cercles décoratifs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Grille décorative */}
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
              Connectez-vous pour accéder à notre plateforme de recrutement innovante
            </p>
          </div>
          
          {/* Illustration au centre */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-64 h-64">
              {/* Cercle central */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20"></div>
              
              {/* Éléments d'interface illustrés */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-56 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 flex flex-col shadow-lg">
                  <div className="w-full h-1/3 bg-white bg-opacity-20 rounded-lg mb-3"></div>
                  <div className="w-3/4 h-2 bg-white bg-opacity-30 rounded mb-2"></div>
                  <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-3"></div>
                  <div className="flex space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-30"></div>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-white bg-opacity-30 rounded"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-30"></div>
                    <div className="flex-1">
                      <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-white bg-opacity-30 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-auto w-full h-6 bg-indigo-500 bg-opacity-50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistiques */}
          {/* <div className="flex space-x-4 mt-8 z-10 mb-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white text-opacity-80">Entreprises</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">10k+</div>
              <div className="text-sm text-white text-opacity-80">Candidats</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-white text-opacity-80">Satisfaction</div>
            </div>
          </div> */}
        </aside>
        <section className="p-6 md:p-10 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Bienvenue</h1>
            <p className="mt-2 text-gray-600">
              Connectez-vous pour accéder à votre espace recrutement
            </p>
          </div>
          
          <div className="flex gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-gray-700">Continuer avec Google</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm text-gray-500">ou continuer avec email</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          
          <LoginForm />
          
          <p className="text-center mt-8 text-gray-600">
            Vous n'avez pas de compte? <a href="/inscription" className="text-indigo-600 font-medium hover:underline">S'inscrire</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;