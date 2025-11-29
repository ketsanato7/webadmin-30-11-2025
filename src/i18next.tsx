import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './language/en.json';

import LanguageDetector from 'i18next-browser-languagedetector';
i18next.use(initReactI18next).use(LanguageDetector).init({
  debug: true,   
  interpolation: {
    escapeValue: true, // not needed for react as it escapes by default
  },
  resources: {
    en: {
        translation,
    },
    la:{
        translation,
    }
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});
