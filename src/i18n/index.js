import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend'


const baseUrlEtiquetas = process.env.REACT_APP_API_ETIQUETAS_URL_;
const loadPath = `${baseUrlEtiquetas}/etiquetas/JsonFileFull`;


i18n
   .use(Backend)
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      interpolation: {
      escapeValue: false, // react already safes from xss
      },
      backend: {
         loadPath
       }
   });

export default i18n;