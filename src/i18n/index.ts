import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import translationsAZ from './locales/az/translations.json';
import translationsEN from './locales/en/translations.json';
import translationsRU from './locales/ru/translations.json';

// The translations
const resources = {
  en: translationsEN,
  az: translationsAZ,
  ru: translationsRU,
};

// Languages
export const languages = [
  {
    code: 'az',
    name: 'Azərbaycan',
  },
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ru',
    name: 'Русский',
  },
];

// Supported languages
export const supportedLngs = languages.map((language) => language.code);

// Language detection
const lng =
  (supportedLngs.includes(window.location.pathname.split('/')[1]) &&
    window.location.pathname.split('/')[1]) ||
  localStorage.getItem('LANG')?.toString();

// Fallback language
const fallbackLng = 'az';

// Development mode
const debug = import.meta.env.MODE === 'development';

i18n.use(initReactI18next).init({
  lng,
  debug,
  resources,
  fallbackLng,
  supportedLngs,
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('LANG', lng);
});

export default i18n;
