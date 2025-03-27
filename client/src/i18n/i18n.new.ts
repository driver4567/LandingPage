import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import deTranslations from './translations/de.json';
import jaTranslations from './translations/ja.json';

// Define language data with flags
export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      fr: {
        translation: frTranslations
      },
      de: {
        translation: deTranslations
      },
      ja: {
        translation: jaTranslations
      }
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;