import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    debug: true,
    fallbackLng: 'en', // Use English if detected language is not available

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          description: "This is an example of internationalization using i18next.",

