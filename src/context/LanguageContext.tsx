import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, TRANSLATIONS, getTranslation } from '../data/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sp_app_language') as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sp_app_language', lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const translated = getTranslation(key, language);
    if (translated === key && fallback) {
      return fallback;
    }
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
