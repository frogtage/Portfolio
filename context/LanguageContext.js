"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (language === 'fa') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'fa';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'fa' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    text: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
