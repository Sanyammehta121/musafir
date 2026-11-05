'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, SUPPORTED_LANGUAGES } from '@/lib/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize Theme
    const savedTheme = localStorage.getItem('musafir_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    // Initialize Language
    const savedLang = localStorage.getItem('musafir_lang');
    if (savedLang && ['en', 'hi', 'bn', 'ta', 'fr', 'es'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('musafir_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('musafir_lang', newLang);
  };

  const t = getTranslation(language);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        changeLanguage,
        languages: SUPPORTED_LANGUAGES,
        t,
        mounted
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    // Graceful fallback for SSR or outside provider
    return {
      theme: 'light',
      toggleTheme: () => {},
      language: 'en',
      changeLanguage: () => {},
      languages: SUPPORTED_LANGUAGES,
      t: getTranslation('en'),
      mounted: false
    };
  }
  return context;
}
