
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { io } from "socket.io-client";


// const socket = io("http://localhost:4000");

const WaterIntake = () => {
  const [waterData, setWaterData] = useState({ logs: [], total: 0 });

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

  const addWaterIntake = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/water-intake`,
        { amount: 250 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWaterData(response.data.dailyLog);
      toast.success(`Added 250ml of water! Total intake is now ${response.data.dailyLog.total / 1000} liters`);
      // socket.emit("addWater", { message: "Water intake updated!" }); // Emit event
    } catch (error) {
      console.error('Error updating water intake:', error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  

  useEffect(() => {
    fetchWaterData();
  }, []);

  return (
    <>
     {/* <div className="relative w-full h-screen flex items-center justify-center overflow-hidden"> */}
    
      <div className="mockup-phone border-primary mt-5">
      <div className=" flex flex-col items-center justify-center w-full  md:w-5/5  p-6    mt-3 mb-3  rounded-md shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Water Intake <span className='text-blue-500'> Tracker</span></h2>
        
        <img src='/public/water.gif' alt="Water Animation" className="w-72 h-52 mb-10" />

        <div className='flex items-center item gap-5'>


        <button 
          onClick={addWaterIntake} 
          className=" bg-slate-900  px-8 py-5 rounded-lg text-lg font-semibold hover:border border-blue-500 transition-all duration-300 "
        >
          Add 250ml
        </button>
        <div className="text-2xl border border-blue-500 px-4 py-4 rounded-full font-semibold">{waterData.total / 1000} L</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-6 bg-gray-700 rounded-full mt-10  relative">
          <div 
            className="absolute top-0 left-0 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300" 
            style={{ width: `${(waterData.total / 4000) * 100}%` }}
          ></div>
        </div>
      </div>
      </div>
      <ToastContainer />
    {/* </div> */}
    </>
  );
};

export default WaterIntake;


















