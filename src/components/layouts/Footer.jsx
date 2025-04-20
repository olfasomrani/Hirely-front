'use client';
import React from 'react';
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
        {/* Left side */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} RecruteApp. Tous droits réservés.
        </div>

        {/* Center links (optional) */}
        <div className="hidden md:flex gap-6">
          <a href="/about" className="hover:text-indigo-500 transition">À propos</a>
          <a href="/contact" className="hover:text-indigo-500 transition">Contact</a>
          <a href="/terms" className="hover:text-indigo-500 transition">Conditions</a>
        </div>

        {/* Right side - social icons */}
        <div className="flex gap-3 text-lg">
          <a href="#" className="hover:text-indigo-500 transition">
            <FacebookOutlined />
          </a>
          <a href="#" className="hover:text-indigo-500 transition">
            <TwitterOutlined />
          </a>
          <a href="#" className="hover:text-indigo-500 transition">
            <LinkedinOutlined />
          </a>
          <a href="mailto:contact@recruteapp.com" className="hover:text-indigo-500 transition">
            <MailOutlined />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
