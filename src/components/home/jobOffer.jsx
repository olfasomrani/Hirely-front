"use client";
import React from "react";

const JobOffersCard = ({ offres, getActions }) => { 
  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Offres d'emploi récentes
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offres.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            {/* Image d'illustration */}
            <img
              src={
                job.image?.length > 0
                  ? `${process.env.NEXT_PUBLIC_API_URL}${job.image}`
                  : "/images/default-offre.png"
              }
              alt="Illustration offre"
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
            <p className="text-sm text-gray-500">
              {job.company} - {job.location}
            </p>
            <p className="mt-2 text-gray-700">{job.description}</p>
            {getActions && (
              <div className="flex gap-4 mt-4 text-xl text-blue-800">
                {getActions(job)}
              </div>
            )}
            <button className="mt-4 inline-block bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white px-4 py-2 rounded hover:opacity-90">
              Voir plus
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default JobOffersCard;
