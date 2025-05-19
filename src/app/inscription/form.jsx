"use client";
import React, { useState } from "react";
import { Input, DatePicker, Button, notification } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: null,
    role: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
    
    if (errors.birthDate) {
      setErrors({
        ...errors,
        birthDate: "",
      });
    }
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role,
    });
    
    if (errors.role) {
      setErrors({
        ...errors,
        role: "",
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!formData.lastName) {
      newErrors.lastName = "Le nom est requis";
    }
    
    // if (!formData.phone) {
    //   newErrors.phone = "Le numéro de téléphone est requis";
    // } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
    //   newErrors.phone = "Format de téléphone invalide";
    // }
    
    if (!formData.birthDate) {
      newErrors.birthDate = "La date de naissance est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.role) {
      newErrors.role = "Veuillez sélectionner un rôle";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async() => {
  
      try{
        const response = await axios.post("http://localhost:3001/auth/register", formData);
        console.log("formData", formData);
        console.log("response", response);

      
    
      notification.success({
        message: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      router.push("/login");}
      catch{
    
        notification.error({
          message: "Inscription a échoué"
        })
      }
    
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex justify-between mb-8">
        <div className={`flex-1 text-center pb-2 ${step >= 1 ? "border-b-2 border-indigo-600" : "border-b border-gray-200"}`}>
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} mb-2`}>1</span>
          <div className={step >= 1 ? "text-indigo-600 font-medium" : "text-gray-500"}>Compte</div>
        </div>
        <div className={`flex-1 text-center pb-2 ${step >= 2 ? "border-b-2 border-indigo-600" : "border-b border-gray-200"}`}>
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} mb-2`}>2</span>
          <div className={step >= 2 ? "text-indigo-600 font-medium" : "text-gray-500"}>Profil</div>
        </div>
        <div className={`flex-1 text-center pb-2 ${step >= 3 ? "border-b-2 border-indigo-600" : "border-b border-gray-200"}`}>
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"} mb-2`}>3</span>
          <div className={step >= 3 ? "text-indigo-600 font-medium" : "text-gray-500"}>Rôle</div>
        </div>
      </div>
      
      {/* Étape 1: Informations de compte */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="votre@email.com"
              className={errors.email ? "border-red-500" : ""}
              status={errors.email ? "error" : ""}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <Input.Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Créez un mot de passe sécurisé"
              className={errors.password ? "border-red-500" : ""}
              status={errors.password ? "error" : ""}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <Input.Password
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirmez votre mot de passe"
              className={errors.confirmPassword ? "border-red-500" : ""}
              status={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          
          <Button
            type="primary"
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-700 h-12 w-full flex items-center justify-center font-medium text-base shadow-md mt-6"
          >
            Continuer
          </Button>
        </div>
      )}
      
      {/* Étape 2: Informations personnelles */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Votre prénom"
                className={errors.firstName ? "border-red-500" : ""}
                status={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Votre nom"
                className={errors.lastName ? "border-red-500" : ""}
                status={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              prefix={<PhoneOutlined className="text-gray-400" />}
              placeholder="Votre numéro de téléphone"
              className={errors.phone ? "border-red-500" : ""}
              status={errors.phone ? "error" : ""}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date de naissance
            </label>
            <DatePicker
              id="birthDate"
              value={formData.birthDate}
              onChange={handleDateChange}
              placeholder="Sélectionnez une date"
              className={`w-full ${errors.birthDate ? "border-red-500" : ""}`}
              status={errors.birthDate ? "error" : ""}
            />
            {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              onClick={prevStep}
              className="h-12 flex-1 flex items-center justify-center font-medium text-base"
            >
              Retour
            </Button>
            <Button
              type="primary"
              onClick={nextStep}
              className="bg-indigo-600 hover:bg-indigo-700 h-12 flex-1 flex items-center justify-center font-medium text-base shadow-md"
            >
              Continuer
            </Button>
          </div>
        </div>
      )}
      
      {/* Étape 3: Sélection du rôle */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Choisissez votre rôle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option Candidat */}
            <div 
              className={`border rounded-xl p-6 cursor-pointer transition-all ${formData.role === "candidat" ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}
              onClick={() => handleRoleSelect("candidat")}
            >
              <div className="flex flex-col items-center text-center">
                {/* Image du candidat */}
                <div className="w-20 h-20 mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Candidat</h4>
                <p className="text-gray-600">Je cherche un emploi et souhaite postuler à des offres</p>
                
                <div className={`mt-4 inline-flex items-center justify-center w-6 h-6 border-2 rounded-full ${formData.role === "candidat" ? "border-indigo-600 bg-indigo-600" : "border-gray-300"}`}>
                  {formData.role === "candidat" && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div 
              className={`border rounded-xl p-6 cursor-pointer transition-all ${formData.role === "recruteur" ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}
              onClick={() => handleRoleSelect("recruteur")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Recruteur</h4>
                <p className="text-gray-600">Je recherche des candidats et souhaite publier des offres</p>
                
                <div className={`mt-4 inline-flex items-center justify-center w-6 h-6 border-2 rounded-full ${formData.role === "recruteur" ? "border-indigo-600 bg-indigo-600" : "border-gray-300"}`}>
                  {formData.role === "recruteur" && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
          
          <div className="flex space-x-4 pt-4">
            <Button
              onClick={prevStep}
              className="h-12 flex-1 flex items-center justify-center font-medium text-base"
            >
              Retour
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="bg-indigo-600 hover:bg-indigo-700 h-12 flex-1 flex items-center justify-center font-medium text-base shadow-md"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </Button>
          </div>
        </div>
      )}
      
      {/* Termes et conditions */}
      <div className="mt-8 text-sm text-gray-500">
        En créant un compte, vous acceptez nos <a href="#" className="text-indigo-600 hover:text-indigo-800">Conditions d'utilisation</a> et notre <a href="#" className="text-indigo-600 hover:text-indigo-800">Politique de confidentialité</a>.
      </div>
    </div>
  );
};

export default RegistrationForm;