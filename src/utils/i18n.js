import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Cache from 'i18next-localstorage-cache'
import Fetch from 'i18next-fetch-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const translateURL = 'http://localhost:8082/locales/{{lng}}/{{ns}}.json'

i18n
  .use(Fetch)
  .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      backend: {
        loadPath: translateURL
      }
    })


// i18n
//   .use(Fetch)
//   .use(Cache)
//   .use(LanguageDetector)
//   .init({
//     fallbackLng: 'en',
//     // have a common namespace used around the full app
//     ns: ['view'],
//     defaultNS: 'view',

//     load: 'all',
//     backend: {
//       loadPath: translateURL
//     },
//     interpolation: {
//       formatSeparator: ',',
//       format: function(value, format, lng) {
//         if (Object.is(format, 'uppercase')) {
//           return value.toUpperCase()
//         } else {
//           return value
//         }
//       }
//     }
//   })

export default i18n
