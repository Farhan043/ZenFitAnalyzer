import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';
import { useNavigate } from 'react-router-dom';

const ProgressPhotos = () => {
  const { t, i18n } = useTranslation();
  const [translatedTitles, setTranslatedTitles] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  
   useEffect(() => {
      const updateTranslations = async () => {
        const translations = {
          progressPhoto: await translateText('Progress Photos', i18n.language),
        };
        setTranslatedTitles(translations);
      };
  
      updateTranslations();
   }, [i18n.language]);
  
  return (
    <>
       {/* Header Section */}
       <div className="rounded flex items-center py-4 px-3">
        <i className="ri-arrow-left-s-line text-4xl" onClick={() => navigate('/home')}></i>
        <div className="text-center w-full font-bold text-2xl">
          <h1>{translatedTitles.progressPhoto}</h1>
          </div>
      </div>

            {/* Learn More Section */}
      <div className="bg-black bg-opacity-50 p-7 m-5 rounded-lg flex justify-between  items-center ">
        <div className=''>
        <p className="text-blue-400  font-semibold">Track Your Progress Each Month With <span className="text-blue-500">Photo</span></p>
          <button className="bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg mt-5" onClick={() => setShowPopup(true)}>Learn More</button>
          </div>
        <div>
        <img src="https://static.vecteezy.com/system/resources/previews/016/690/394/large_2x/calendar-3d-icon-png.png" alt="" className="w-32 h-32 mb-2" />
        </div>
      </div>

       {/* Compare My Photo */}
      <div className="flex items-center justify-between bg-black bg-opacity-40 p-4 m-3 rounded-full  ">
      <span className="text-blue-400 text-2xl font-medium">Compare my Photo</span>
      <button className="bg-black bg-opacity-100 text-white px-6 py-2 rounded-full "
        onClick={() =>  navigate('')}>
        compare
      </button>
      </div>
      

      
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="glass p-5 m-5 rounded-lg max-w-sm text-center">
            <h3 className="text-lg font-bold">Why Track Your Progress?</h3>
            <p className="mt-2 text-white">Taking regular progress photos helps you stay motivated and visually track your fitness journey. By comparing images over time, you can see real changes that might not be noticeable day-to-day.</p>
            <button className="bg-red-800 text-white px-6 py-3 rounded-lg mt-4" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProgressPhotos


