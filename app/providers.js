'use client';

import { LanguageProvider } from "../context/LanguageContext";

export function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
