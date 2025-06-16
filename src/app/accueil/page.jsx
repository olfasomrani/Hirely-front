"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const sliderImages = [
  "https://images.unsplash.com/photo-1560264280-88b68371db39",
  "https://images.unsplash.com/photo-1581090700227-1e8e08504c41",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
];

const jobOffers = [
  {
    title: "Développeur Full Stack",
    company: "TechCorp",
    location: "Tunis, Tunisie",
    description:
      "Nous recherchons un développeur passionné pour rejoindre notre équipe agile.",
  },
  {
    title: "UX/UI Designer",
    company: "Designify",
    location: "Sfax, Tunisie",
    description:
      "Créez des expériences utilisateurs intuitives et esthétiques.",
  },
  {
    title: "Chef de Projet IT",
    company: "Innova",
    location: "Remote",
    description: "Pilotez des projets digitaux de grande envergure.",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // toutes les 5s
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );

  return (
    <div>
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          {/* Cercle TS */}
          <div className="bg-white text-[#1e3a8a] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            TS
          </div>
          {/* Texte Talent Sphère */}
          <span className="text-xl font-semibold text-white">
            Talent Sphère
          </span>
        </div>

        <nav className="space-x-4">
          <a href="/login" className="hover:underline">
            Connexion
          </a>
          <a href="/inscription" className="hover:underline">
            Inscription
          </a>
        </nav>
      </header>

      {/* Slider */}
      <div className="relative h-[400px] overflow-hidden">
        {sliderImages.map((url, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`${url}?auto=format&fit=crop&w=1600&q=80`}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
        >
          →
        </button>
      </div>
      {/* Section "Je suis..." */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Vous êtes...
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {[
            {
              label: "Un candidat",
              icon: "🧑‍💼",
              link: "/register?role=candidat",
            },
            {
              label: "Un chercheur d'emploi",
              icon: "🔍",
              link: "/register?role=chercheur",
            },
            {
              label: "Un recruteur",
              icon: "🏢",
              link: "/register?role=recruteur",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="flex items-center justify-center w-full md:w-1/3 border border-blue-200 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 transition"
            >
              <span className="text-3xl mr-3">{item.icon}</span>
              <span className="text-lg font-semibold text-blue-900">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Notre impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { number: "850+", label: "Candidats inscrits", icon: "👤" },
            { number: "120+", label: "Entreprises partenaires", icon: "🏢" },
            { number: "340+", label: "Entretiens réalisés", icon: "📅" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-blue-700 mt-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Fonctionnalités conçues pour vous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              title: "Recherche intelligente",
              description:
                "Trouvez rapidement les meilleurs profils grâce à des filtres avancés et une technologie de matching performante.",
              icon: "🔍",
            },
            {
              title: "Analyses détaillées",
              description:
                "Accédez à des statistiques précises pour suivre vos processus de recrutement et améliorer vos décisions.",
              icon: "📊",
            },
            {
              title: "Entretiens simplifiés",
              description:
                "Planifiez, organisez et gérez vos entretiens en toute simplicité avec des outils intégrés.",
              icon: "📅",
            },
            {
              title: "Collaboration d'équipe",
              description:
                "Travaillez efficacement en équipe avec des outils de partage et de commentaires sur les profils candidats.",
              icon: "🤝",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offres d'emploi */}
      <section className="py-12 px-6 bg-gray-50">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
    Offres d'emploi récentes
  </h2>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {jobOffers.map((job, index) => (
      <div
        key={index}
        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
      >
        {/* Image d'illustration */}
        <img
          src="https://f.hellowork.com/obs-static-images/seo/ObsJob/developpeur-web.jpg"
          alt="Illustration offre"
          className="w-full h-40 object-cover rounded-md mb-4"
        />

        <h3 className="text-xl font-semibold text-blue-800">
          {job.title}
        </h3>
        <p className="text-sm text-gray-500">
          {job.company} - {job.location}
        </p>
        <p className="mt-2 text-gray-700">{job.description}</p>
        <button className="mt-4 inline-block bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white px-4 py-2 rounded hover:opacity-90">
          Voir plus
        </button>
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} Talent Sphére. Tous droits
          réservés.
        </p>
      </footer>
    </div>
  );
}
