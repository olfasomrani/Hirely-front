"use client";
import React, { useState } from "react";
import { Input, notification, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const { login } = useAuth();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      if (error.response?.status === 401) {
        notification.error({
          message: "Email ou mot de passe incorrect",
        });
      } else {
        notification.error({
          message: "Erreur lors de la connexion",
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Adresse email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="votre@email.com"
          className={`${errors.email ? "border-red-500" : ""}`}
          status={errors.email ? "error" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Mot de passe oublié?
          </a>
        </div>
        <Input.Password
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Votre mot de passe"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          className={`${errors.password ? "border-red-500" : ""}`}
          status={errors.password ? "error" : ""}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center mb-6">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
          Se souvenir de moi
        </label>
      </div>

      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading}
        className="bg-indigo-600 hover:bg-indigo-700 h-12 flex items-center justify-center font-medium text-base shadow-md"
      >
        {loading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </div>
  );
};

export default LoginForm;
