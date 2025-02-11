
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import { useTranslation } from 'react-i18next'; 
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';


const WaterIntake = () => {
  const [waterData, setWaterData] = useState({ logs: [], total: 0 });
   const { t, i18n } = useTranslation();
    const [translatedTitles, setTranslatedTitles] = useState({});

  const fetchWaterData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWaterData(response.data);
    } catch (error) {
      console.error('Error fetching water data:', error);
    }
  };

  const addWaterIntake = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/water-intake`,
        { amount: 250 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWaterData(response.data.dailyLog);
      toast.success(`Added 250ml of water! Total intake is now ${response.data.dailyLog.total / 1000} liters`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error updating water intake:', error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }); // Show the error toast
      }
    }
  };


   useEffect(() => {
      const updateTranslations = async () => {
        const translations = {
          waterIntake: await translateText('Water Intake', i18n.language),
          add250ml: await translateText('Add 250ml', i18n.language),
        };
        setTranslatedTitles(translations);
      };
  
      updateTranslations();
    }, [i18n.language]);

  useEffect(() => {
    fetchWaterData();
  }, []);

  return (
    <>
    <div className="p-4 bg-black bg-opacity-40 rounded-lg">
        <h2 className=" text-2xl  text-blue-400 font-bold text-center">{translatedTitles.waterIntake}</h2>
      <div className='flex items-center justify-between mt-4'>
      <div  className="w-24 h-24 mr-2 rounded-full bg-black bg-opacity-100 mt-3 flex items-center justify-center">
      <p className="text-2xl text-center  text-white">{waterData.total / 1000} L</p>
      </div>
      <div className="mt-4 ">
        <button
          onClick={() => addWaterIntake(250)}
          className=" bg-black bg-opacity-100 px-6 py-5 rounded-lg text-lg font-semibold text-blue-400 "
        >
          {translatedTitles.add250ml}
        </button>
      </div>
      </div>
      <div className="relative w-full bg-black bg-opacity-100 rounded-full h-6 my-4">
        <div
          className="absolute top-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500 h-6 rounded-full"
          style={{ width: `${(waterData.total / 4000) * 100}%` }}
        ></div>
      </div>
    </div>
      <ToastContainer></ToastContainer>
      </>
  );
};

export default WaterIntake;


