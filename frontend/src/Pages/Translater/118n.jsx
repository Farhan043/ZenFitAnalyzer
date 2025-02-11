// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// const resources = {
//   en: { translation: { "Privacy Policy": "Privacy Policy", "Settings": "Settings" , "Other": "Other", "Language": "Language", "Select Language": "Select Language", "Close": "Close" } },
//   es: { translation: { "Privacy Policy": "Política de privacidad", "Settings": "Configuración" , "Other": "Otro", "Language": "Idioma", "Select Language": "Seleccionar idioma", "Close": "Cerrar" } },
//   fr: { translation: { "Privacy Policy": "Politique de confidentialité", "Settings": "Paramètres" , "Other": "Autre", "Language": "Langue", "Select Language": "Sélectionner la langue", "Close": "Fermer" } },
//   de: { translation: { "Privacy Policy": "Datenschutzrichtlinie", "Settings": "Einstellungen" , "Other": "Andere", "Language": "Sprache", "Select Language": "Sprache wählen", "Close": "Schließen" } },
//   hi: { translation: { "Privacy Policy": "गोपनीयता नीति", "Settings": " सेटिंग्स" , "Other": "अन्य", "Language": "भाषा", "Select Language": "भाषा चुनें", "Close": "बंद करें" } },
//   ur: { translation: { "Privacy Policy": "رازداری کی پالیسی", "Settings": "سیٹنگز" , "Other": "دیگر", "Language": "زبان", "Select Language": "زبان منتخب کریں", "Close": "بند کریں" } },
//   zh: { translation: { "Privacy Policy": "隐私政策", "Settings": "设置" , "Other": "其他", "Language": "语言", "Select Language": "选择语言", "Close": "关闭" } },
//   ar: { translation: { "Privacy Policy": "سياسة الخصوصية", "Settings": "الإعدادات" , "Other": "أخرى", "Language": "اللغة", "Select Language": "اختر اللغة", "Close": "إغلاق" } },
// };

// const options = {
//   order: ['navigator', 'htmlTag', 'path', 'subdomain'],
//   lookupFromPathIndex: 0,
//   lookupFromSubdomainIndex: 0,
// };

// i18n.use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     detection: options,
//     lng: localStorage.getItem('language') || 'en', // Load saved language
//     fallbackLng: 'en',
//     interpolation: { escapeValue: false },
//   });

// // Function to change language
// export const changeLanguage = (lang) => {
//   i18n.changeLanguage(lang);
//   localStorage.setItem('language', lang); // Save preference
// };

// export default i18n;




import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    interpolation: { escapeValue: false },
  });

export const translateText = async (text, targetLang) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[0]?.[0]?.[0] || text; // Return translated text or original if error
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

export const changeLanguage = async (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};

export default i18n;

