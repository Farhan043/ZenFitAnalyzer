// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import i18n from '../src/118n';

// const LanguageModal = ({ closeModal }) => {
//   const { t } = useTranslation();



//   const changeLanguage = (language) => {
//     i18n.changeLanguage(language);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <div className="glass rounded-lg p-6 w-11/12 max-w-md">
//         <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{t('Select Language')}</h2>
//         <ul className="space-y-2">
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('en')}>English</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('es')}>Español</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('fr')}>Français</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('de')}>Deutsch</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('hi')}>हिन्दी</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('ur')}>اردو</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('zh')}>中文</li>
//               <li className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage('ar')}>العربية</li>
//             </ul>
//         <button className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full" onClick={closeModal}>{t('Close')}</button>
//       </div>
//     </div>
//   );
// };

// export default LanguageModal;















import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, translateText } from '../Translater/118n';

const LanguageModal = ({ closeModal }) => {
  const { t, i18n } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    selectLanguage: 'Select Language',
    close: 'Close'
  });

  useEffect(() => {
    const updateTranslations = async () => {
      const selectLanguage = await translateText('Select Language', i18n.language);
      const close = await translateText('Close', i18n.language);
      setTranslatedText({ selectLanguage, close });
    };

    updateTranslations();
  }, [i18n.language]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="glass rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl text-blue-400 font-bold mb-4 text-center">{translatedText.selectLanguage}</h2>
        <ul className="space-y-2">
          {[
              { code: 'en', name: 'English' },
              { code: 'de', name: 'Deutsch' }, // German
              { code: 'hi', name: 'हिन्दी' }, // Hindi
              { code: 'ur', name: 'اردو' }, // Urdu
              { code: 'zh', name: '中文' }, // Chinese (Simplified)
              { code: 'ar', name: 'العربية' }, // Arabic
              { code: 'bn', name: 'বাংলা' }, // Bengali
              { code: 'ru', name: 'Русский' }, // Russian
              { code: 'it', name: 'Italiano' }, // Italian
              { code: 'ta', name: 'தமிழ்' }, // Tamil
              { code: 'te', name: 'తెలుగు' }, // Telugu
              { code: 'fa', name: 'فارسی' }, // Persian (Farsi)
            
            
          ].map(({ code, name }) => (
            <li key={code} className="cursor-pointer text-blue-400 text-xl" onClick={() => changeLanguage(code)}>
              {name}
            </li>
          ))}
        </ul>
        <button className="mt-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg w-full" onClick={closeModal}>
          {translatedText.close}
        </button>
      </div>
    </div>
  );
};

export default LanguageModal;
