
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

const Sleep = () => {
  const [sleepHours, setSleepHours] = useState('');
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

  // Determine Sleep Quality
  const getSleepQuality = (hours) => {
    if (hours < 4) return 'poor';
    if (hours >= 4 && hours < 6) return 'fair';
    if (hours >= 6 && hours < 8) return 'good';
    return 'excellent';
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const date = new Date().toISOString().split('T')[0];
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/sleep-data`,
        { sleepHours, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSleepData(response.data.dailyLog);
      const quality = getSleepQuality(sleepHours);
      toast.success(`Sleep quality: ${quality}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      fetchSleepData();
      setSleepHours('');
    } catch (error) {
      console.error('Error updating sleep data:', error);
      toast.error('Failed to update sleep data!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Load Sleep Data on Component Mount
  useEffect(() => {
    fetchSleepData();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-t from-blue-100 to-blue-100 rounded-lg max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Sleep Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="sleepHours" className="text-gray-600">
            Enter Sleep Hours
          </label>
          <input
            type="number"
            id="sleepHours"
            className="p-2 border-2 border-gray-300 bg-gray-300 rounded-lg"
            placeholder="e.g., 8"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-300 to-blue-500 text-white px-4 py-2 rounded-md "
          >
            Save Sleep Data
          </button>

          <button
            onClick={() => navigate('/Sleeps')}
            className="bg-gradient-to-r from-green-500 to-blue-300 text-white px-4 py-2 rounded-md "
          >
            View All Sleep Data
          </button>
        </div>
      </form>

      <div className="bg-gradient-to-t from-blue-200 to-pink-200 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Sleep Data Visualization</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={sleepData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#555', fontSize: 12 }}
              label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tick={{ fill: '#555', fontSize: 12 }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', offset: -5 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="sleepHours" barSize={20} fill="#8884d8" name="Sleep Hours" />
            <Line
              type="monotone"
              dataKey="sleepHours"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ fill: '#82ca9d', r: 4 }}
              name="Trend Line"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Sleep;

