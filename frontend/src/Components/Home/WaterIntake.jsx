

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { Navigate, useNavigate } from 'react-router-dom';

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

  const addWaterIntake = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/water-intake`,
        { amount: 250 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWaterData(response.data.dailyLog);
      toast.success(`Added 250ml of water! Total intake is now ${response.data.dailyLog.total / 1000} liters`);// Update the water data with the new log
    } catch (error) {
      console.error('Error updating water intake:', error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message); // Show the error toast
      }
    }
  };

  useEffect(() => {
    fetchWaterData();
  }, []);

  return (
    <div className="p-4  bg-white  rounded-lg max-w-sm">
      <h2 className=" text-2xl font-bold">Water Intake</h2>
      <p className="text-3xl font-bold  text-blue-500">{waterData.total / 1000} Liters</p>
      <p className="text-sm text-gray-500">Real-time updates</p>
      {/* <ul className="mt-4">
        {waterData.logs.map((log, index) => (
          <li key={index} className="flex justify-between text-sm">
            <span>{log.time}</span>
            <span className="text-blue-500">{log.amount}ml</span>
          </li>
        ))}
      </ul> */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => addWaterIntake(250)}
          className="px-4 py-2 bg-gradient-to-t from-blue-300 to-blue-600 text-white rounded-lg"
        >
          Add 250ml
        </button>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-4 my-4">
        <div
          className="absolute top-0 left-0 bg-gradient-to-r from-pink-200 to-blue-400 h-6 rounded-full"
          style={{ width: `${(waterData.total / 4000) * 100}%` }}
        ></div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default WaterIntake;


