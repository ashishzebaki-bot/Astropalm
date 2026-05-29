import { APP_CONFIG } from '../config/appConfig';
import { localStorageService } from '../services/storage/localStorageService';

const DEFAULT_LANGUAGE = 'en';
const SUPPORTED = ['en', 'hi', 'es', 'fr', 'it', 'ko'];

export async function initializeLanguage() {
  try {
    const savedLanguage = localStorageService.get(APP_CONFIG.STORAGE_KEYS.LANGUAGE);

    if (savedLanguage && SUPPORTED.includes(savedLanguage)) {
      applyLanguage(savedLanguage);
      return savedLanguage;
    }

    const browserLanguage = navigator.language?.toLowerCase().split('-')[0];

    if (SUPPORTED.includes(browserLanguage)) {
      applyLanguage(browserLanguage);
      return browserLanguage;
    }

    applyLanguage(DEFAULT_LANGUAGE);
    return DEFAULT_LANGUAGE;
  } catch {
    applyLanguage(DEFAULT_LANGUAGE);
    return DEFAULT_LANGUAGE;
  }
}

export function applyLanguage(languageCode = 'en') {
  const safeLanguage = SUPPORTED.includes(languageCode) ? languageCode : DEFAULT_LANGUAGE;

  localStorageService.set(APP_CONFIG.STORAGE_KEYS.LANGUAGE, safeLanguage);

  document.documentElement.lang = safeLanguage;
  document.documentElement.dir = 'ltr';
  document.documentElement.setAttribute('data-language', safeLanguage);

  return safeLanguage;
}

export function getCurrentLanguage() {
  return localStorageService.get(APP_CONFIG.STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE;
}

export default initializeLanguage;
