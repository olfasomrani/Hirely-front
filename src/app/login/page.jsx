"use client";
import React from "react";
import LoginForm from "./form";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-7">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl overflow-hidden">
        <aside className="hidden md:flex items-center justify-center bg-gray-900">
          <img
            src={"/images/login.jpg"}
            alt="Login"
            className="w-full h-full object-cover opacity-90"
          />
        </aside>
        <section className="p-10 flex flex-col justify-center bg-white">
          <h1 className="text-4xl font-bold text-slate-900">Recrutement Login</h1>
          <p className="mt-2 text-gray-600">
            Veuillez remplir vos coordonnées pour accéder à votre compte.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </section>

      </div>
    </div>
  );
}

export default LoginPage;
