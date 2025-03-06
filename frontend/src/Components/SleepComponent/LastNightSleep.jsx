import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const LastNightSleep = () => {
  const [lastNightSleep, setLastNightSleep] = useState(null);
  const [lastNightData, setLastNightData] = useState([]);

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/sleep-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDateString = yesterday.toISOString().split("T")[0];

        const lastNight = response.data.find(entry => entry.date === yesterdayDateString);
        
        if (lastNight && lastNight.sleepHours > 0) {
          setLastNightSleep(lastNight);
          setLastNightData([lastNight]);
        } else {
          setLastNightSleep(null);
        }
      }
    } catch (error) {
      console.error("Error fetching sleep data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-7 mb-8 ml-3">
      {lastNightSleep ? (
        <div className="bg-indigo-500/80 rounded-3xl w-full h-full p-6 relative overflow-hidden text-white">
          <h2 className="text-lg font-medium">Last Night's Sleep</h2>
          <p className="text-3xl font-semibold mt-2">
            {lastNightSleep.sleepHours}h {Math.round((lastNightSleep.sleepHours % 1) * 60)}m
          </p>
          <div className="absolute inset-0 z-0">
            <ResponsiveContainer className={`w-96 h-[20vh]`}>
              <AreaChart
                data={lastNightData}
                margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="sleepHours"
                  stroke="#ffffff"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSleep)"
                  name="Hours Slept"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center text-lg">No sleep data available for last night</div>
      )}
    </div>
  );
};

export default LastNightSleep;
