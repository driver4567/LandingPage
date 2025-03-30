
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './translations/en.json';
import deTranslations from './translations/de.json';
import frTranslations from './translations/fr.json';
import jaTranslations from './translations/ja.json';
import esTranslations from './translations/es.json';

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

// Supported languages in our app
const supportedLngs = languages.map(lang => lang.code);

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
    supportedLngs,
    nonExplicitSupportedLngs: true, // Will detect language variants (e.g., en-US will use en)
    detection: {
      order: ['querystring', 'navigator', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      // Convert language codes from navigator (which might be like 'en-US')
      // to our supported codes (like 'en')
      convertDetectedLanguage: (lng) => {
        // Handle specific language variants
        if (lng.startsWith('en-')) return 'en';
        if (lng.startsWith('de-')) return 'de';
        if (lng.startsWith('fr-')) return 'fr';
        if (lng.startsWith('ja-')) return 'ja';
        if (lng.startsWith('es-')) return 'es';
        return lng;
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
