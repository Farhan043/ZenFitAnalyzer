import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from 'react-i18next'; 
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';

const Latest = () => {
  const [intake, setIntake] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
    const { t, i18n } = useTranslation();
  const [translatedTitles, setTranslatedTitles] = useState({});
  
    useEffect(() => {
      const updateTranslations = async () => {
        const translations = {
          latestActivity: await translateText('Latest Activity', i18n.language),
          Norecentwaterintakerecorded: await translateText('No recent water intake recorded.', i18n.language),
          drinking: await translateText('Drinking', i18n.language),
          Mlwater: await translateText('ml Water', i18n.language),
          about: await translateText('About', i18n.language),
          ago: await translateText('ago', i18n.language),
        };
        setTranslatedTitles(translations);
      };
  
      updateTranslations();
    }, [i18n.language]);

  useEffect(() => {
    fetchWaterIntake();
  }, []);

  const fetchWaterIntake = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setIntake(data.logs || []);
      if (data.logs.length > 0) {
        setLastUpdated(data.logs[data.logs.length - 1].time);
      }
    } catch (error) {
      console.error("Error fetching water intake:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mt-7 ml-5 text-blue-400">{translatedTitles.latestActivity}</h2>
      <div className="bg-black bg-opacity-50 rounded-xl  p-4 shadow-md mx-5 mt-3">
        {intake.length > 0 ? (
          <div className="flex items-center gap-3 mt-2">
            <span><i className="ri-goblet-2-line text-blue-400 text-4xl"></i></span>
            <div>
              <p className="text-blue-500 text-lg font-medium">
                {translatedTitles.drinking} {intake[intake.length - 1].amount} {translatedTitles.Mlwater}
              </p>
              <span className="text-gray-400 text-lg">{translatedTitles.about} {lastUpdated} {translatedTitles.ago}</span>
            </div>
          </div>
        ) : (
          <p className="text-blue-500 text-base mt-2">{translatedTitles.Norecentwaterintakerecorded}.</p>
        )}
      </div>
    </>

  );
};

export default Latest;




























