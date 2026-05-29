import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
import es from '../../locales/es.json';
import fr from '../../locales/fr.json';
import it from '../../locales/it.json';
import ko from '../../locales/ko.json';

const dictionaries = { en, hi, es, fr, it, ko };

export const supportedLanguages = [
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'hi', label: 'हिन्दी', locale: 'hi-IN' },
  { code: 'es', label: 'Español', locale: 'es-ES' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
  { code: 'it', label: 'Italiano', locale: 'it-IT' },
  { code: 'ko', label: '한국어', locale: 'ko-KR' }
];

export function getDictionary(languageCode = 'en') {
  return dictionaries[languageCode] || dictionaries.en;
}

export function translate(languageCode, key, fallback = '') {
  const dictionary = getDictionary(languageCode);

  const value = key.split('.').reduce((current, part) => {
    return current?.[part];
  }, dictionary);

  return value || fallback || key;
}

export function isSupportedLanguage(languageCode) {
  return Boolean(dictionaries[languageCode]);
}

export function getBrowserLanguage() {
  const browserLanguage = navigator.language?.split('-')[0];
  return isSupportedLanguage(browserLanguage) ? browserLanguage : 'en';
}
