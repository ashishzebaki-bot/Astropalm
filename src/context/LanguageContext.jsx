import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { APP_CONFIG } from '../config/appConfig';
import { localStorageService } from '../services/storage/localStorageService';

import {
  getBrowserLanguage,
  isSupportedLanguage,
  supportedLanguages,
  translate
} from '../services/i18n/translationService';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorageService.get(APP_CONFIG.STORAGE_KEYS.LANGUAGE, null);

    const initialLanguage =
      savedLanguage && isSupportedLanguage(savedLanguage)
        ? savedLanguage
        : getBrowserLanguage();

    setLanguageState(initialLanguage);
    applyDocumentLanguage(initialLanguage);
  }, []);

  const setLanguage = (newLanguage) => {
    if (!isSupportedLanguage(newLanguage)) {
      console.warn(`Unsupported language: ${newLanguage}`);
      return;
    }

    setLanguageState(newLanguage);
    localStorageService.set(APP_CONFIG.STORAGE_KEYS.LANGUAGE, newLanguage);
    applyDocumentLanguage(newLanguage);
  };

  const t = (key, fallback = '') => translate(language, key, fallback);

  const currentLanguage = useMemo(() => {
    return supportedLanguages.find((item) => item.code === language) || supportedLanguages[0];
  }, [language]);

  const value = useMemo(
    () => ({ language, currentLanguage, availableLanguages: supportedLanguages, setLanguage, t }),
    [language, currentLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

function applyDocumentLanguage(languageCode) {
  const languageMeta = supportedLanguages.find((item) => item.code === languageCode) || supportedLanguages[0];

  document.documentElement.lang = languageMeta.locale;
  document.documentElement.dir = 'ltr';
  document.documentElement.setAttribute('data-language', languageMeta.code);
}

export default LanguageContext;
