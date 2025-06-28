"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const { text } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-transparent border-t-[2px] border-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} {text.yourNameF || "Mohammad Hossein Dokhaei"}.{" "}
            {text.rightsReservedF || "The Real One."}
          </div>
          <div className="flex gap-5">
            <a
              href="https://github.com/frogtage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mohammad-hossein-926b0435a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
