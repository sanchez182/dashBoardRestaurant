import  i18n from 'i18next';
import { initReactI18next } from "react-i18next";

// Languages
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json"; 

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "es",

        //keySeparator: false, // we do not use keys in form messages.welcome
        // debug: process.env.NODE_ENV !== 'production',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
