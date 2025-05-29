"use client";
import { useState, useCallback } from "react";
import { Input, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const fields = [
  { name: "nom", label: "Nom", placeholder: "Entrez votre nom" },
  { name: "prenom", label: "Prénom", placeholder: "Entrez votre prénom" },
  { name: "email", label: "Email", placeholder: "Entrez votre email" },
  { name: "competence", label: "Compétence", placeholder: "Entrez vos compétences" },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    competence: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, [fields[step].name]: value });
  };

  const handleNext = () => {
    if (formData[fields[step].name].trim() === "") return;
    if (step < fields.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: { value: "#f0f0f0" },
    },
    fpsLimit: 60,
    particles: {
      color: { value: "#6366f1" },
      links: {
        color: "#6366f1",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        outMode: "bounce",
      },
      number: { value: 40 },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { value: 3 },
    },
    detectRetina: true,
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-6 overflow-hidden">
      <Particles init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Postuler Chez Nous!
        </h2>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <label className="block mb-2 text-gray-700 font-medium">
                {fields[step].label}
              </label>
              <Input
                size="large"
                placeholder={fields[step].placeholder}
                value={formData[fields[step].name]}
                onChange={handleChange}
                onPressEnter={handleNext}
                className="mb-3"
              />

              <div className="flex justify-between gap-4">
                <Button
                  type="default"
                  onClick={handlePrevious}
                  disabled={step === 0}
                  className="w-1/2 bg-gray-200 hover:bg-gray-300"
                >
                  Retour
                </Button>
                <Button
                  type="primary"
                  onClick={handleNext}
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-700"
                >
                  {step === fields.length - 1 ? "Valider" : "Suivant"}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="merci"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Votre candidature a été bien transmise
              </h3>
              <p className="text-gray-700">
                Voici les informations que vous avez saisies :
              </p>
              <ul className="mt-4 space-y-1 text-left text-gray-700">
                {fields.map((f, i) => (
                  <li key={i}>
                    <strong>{f.label} :</strong> {formData[f.name]}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
