import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ActivityStatus = () => {
  const [heartRateData, setHeartRateData] = useState([]);

  useEffect(() => {
    const fetchHeartRateData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/heart-rate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHeartRateData(response.data);
      } catch (error) {
        console.error('Error fetching heart rate data:', error);
      }
    };

    fetchHeartRateData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Status</h2>
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
        {heartRateData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heartRateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ActivityStatus;