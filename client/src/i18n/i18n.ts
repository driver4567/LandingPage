
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './translations/en.json';
import deTranslations from './translations/de.json';
import frTranslations from './translations/fr.json';
import jaTranslations from './translations/ja.json';
import esTranslations from './translations/es.json';

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      de: { translation: deTranslations },
      fr: { translation: frTranslations },
      ja: { translation: jaTranslations },
      es: { translation: esTranslations }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'localStorage'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
