"use client";
import React from "react";

const statistiqueSection = () => {
  return (
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
  );
};
export default statistiqueSection;
