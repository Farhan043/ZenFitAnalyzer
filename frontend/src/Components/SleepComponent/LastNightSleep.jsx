

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";

const LastNightSleep = () => {
  const [lastNightSleep, setLastNightSleep] = useState(null);
  const [lastNightData, setLastNightData] = useState([]);

  // Fetch Sleep Data
  const fetchLastNightSleep = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/sleep-data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const sleepData = response.data;

      if (sleepData.length > 0) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDateString = yesterday.toISOString().split("T")[0];

        const lastNight = sleepData.find(
          (entry) => entry.date === yesterdayDateString
        );

        if (lastNight) {
          setLastNightSleep(lastNight);
          // Format data for the chart
          setLastNightData([lastNight]);
        } else {
          setLastNightSleep(null);
        }
      }
    } catch (error) {
      console.error("Error fetching sleep data:", error);
    }
  };

  // Load sleep data on component mount
  useEffect(() => {
    fetchLastNightSleep();
  }, []);

  return (
    <div className="flex justify-center">
      {lastNightSleep ? (
        <div className="bg-gradient-to-t from-pink-400 to-indigo-200 text-white p-6 rounded-lg  w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Last Night's Sleep</h2>
          <p className="text-4xl font-bold mt-2">{lastNightSleep.sleepHours}h</p>
          <p className="mt-1 text-sm">{lastNightSleep.date}</p>

          {/* Recharts Visualization */}
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                data={lastNightData}
                margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.1}
                  stroke="#ffffff"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#fff", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#fff", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    color: "#333",
                  }}
                  itemStyle={{ color: "#4f46e5" }}
                  labelStyle={{ color: "#93c5fd" }}
                  formatter={(value) => `${value}h`}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="sleepHours"
                  stroke="#4f46e5"
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
        <div className="text-gray-500 text-center">
          No sleep data available for yesterday.
        </div>
      )}
    </div>
  );
};

export default LastNightSleep;
