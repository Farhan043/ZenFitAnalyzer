import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const Sleep = () => {
  const [sleepData, setSleepData] = useState([]);
  const navigate = useNavigate();

  // Fetch Sleep Data from the API
  const fetchSleepData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/sleep-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSleepData(response.data);
    } catch (error) {
      console.error('Error fetching sleep data:', error);
    }
  };

  useEffect(() => {
    fetchSleepData();
  }, []);

  return (
    <div className='glass p-6 rounded-lg  cursor-pointer' >
      <div 
        onClick={() => navigate('/alarm')}
        className="glass p-6  rounded-lg  cursor-pointer"
      >
        <h2 className="text-black text-2xl font-bold mb-2">Sleep</h2>
        <div className="text-3xl text-blue-500 font-semibold mb-4">
          8h 20m
        </div>
        <div className="h-[100px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { value: 4 },
                { value: 6 },
                { value: 5 },
                { value: 8 },
                { value: 7 },
                { value: 9 },
                { value: 8 },
              ]}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="natural"
                dataKey="value"
                stroke="#60A5FA"
                strokeWidth={2}
                fill="url(#sleepGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Sleep;



