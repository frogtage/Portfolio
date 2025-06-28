"use client"

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Bars3Icon } from "@heroicons/react/24/solid";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="bg-gray-700/50 text-white font-semibold py-2 px-4 rounded-lg text-sm border border-transparent hover:border-gray-500 transition-all duration-300"
    >
      {language === "en" ? "فارسی" : "English"}
    </button>
  );
};

const Header = () => {
  const { text } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", key: "nav_about" },
    { href: "#experience", key: "nav_experience" },
    { href: "#technologies", key: "nav_technologies" },
    { href: "#projects", key: "nav_projects" },
    { href: "#contact", key: "nav_contact" },
  ];

  return (
    <header
      className={`navbar fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white">
          Dokhaei
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-gray-300 hover:text-white ..."
            >
              {text[link.key]}
              <span className="..." />
            </a>
          ))}
          <LanguageToggle />
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <LanguageToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-gray-900/90 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 px-6 ..."
          >
            {text[link.key]}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
