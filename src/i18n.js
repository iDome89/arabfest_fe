import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { store } from './features/store';
import { setLanguage } from './features/languageReducer';


import enTranslation from './locales/en/translation.json';
import csTranslation from './locales/cs/translation.json';
console.log("ciolla")
const resources = {
  en: {
    translation: enTranslation
  },
  cs: {
    translation: csTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'cs',
    supportedLngs: ['cs', 'en'],
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    }
  });

// Sync i18n language changes with Redux
i18n.on('languageChanged', (lng) => {
  store.dispatch(setLanguage(lng));
});

// Ensure i18n is using the language from Redux store on init
const currentLanguage = store.getState().language.current;
if (currentLanguage && i18n.language !== currentLanguage) {
  i18n.changeLanguage(currentLanguage);
}

export default i18n;