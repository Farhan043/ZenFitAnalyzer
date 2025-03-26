import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const Progress = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake-weekly`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const weeklyData = response.data.map((entry) => ({
          day: entry.day,
          total: parseFloat(entry.total),
          goal: 4 // Daily water intake goal in liters
        }));
        setData(weeklyData);
      } catch (error) {
        console.error("Error fetching weekly water intake data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-500/20">
          <p className="text-blue-400 font-medium">{label}</p>
          <p className="text-white">
            Intake: {payload[0].value.toFixed(2)}L
          </p>
          <p className="text-gray-400">
            Goal: {payload[1].value}L
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">Weekly Progress</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGoal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="day"
                stroke="#60A5FA"
                tick={{ fill: '#60A5FA' }}
              />
              <YAxis
                stroke="#60A5FA"
                tick={{ fill: '#60A5FA' }}
                label={{
                  value: 'Liters',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#60A5FA' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
              <Area
                type="monotone"
                dataKey="goal"
                stroke="#60A5FA"
                fillOpacity={1}
                fill="url(#colorGoal)"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
};

export default Progress;







