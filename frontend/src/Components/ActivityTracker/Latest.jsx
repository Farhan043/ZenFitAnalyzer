import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast, ToastContainer } from 'react-toastify';

const Latest = () => {
  const [intake, setIntake] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchWaterIntake = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Backend returns { logs: [], total: number }
      if (response.data && response.data.logs) {
        const formattedLogs = response.data.logs.map(log => {
          try {
            const [hours, minutes] = log.time.split(':');
            const today = new Date();
            today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

            return {
              ...log,
              time: today,
              formattedTime: format(today, 'h:mm a')
            };
          } catch (error) {
            console.error("Error parsing time:", error);
            return {
              ...log,
              time: new Date(),
              formattedTime: format(new Date(), 'h:mm a')
            };
          }
        });

        // Sort logs by time in descending order
        const sortedLogs = formattedLogs.sort((a, b) => b.time - a.time);
        setIntake(sortedLogs);
        
        if (sortedLogs.length > 0) {
          setLastUpdated(format(sortedLogs[0].time, 'h:mm a'));
        }
      }
    } catch (error) {
      console.error("Error fetching water intake:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to fetch recent activity.");
      }
    }
  };

  useEffect(() => {
    fetchWaterIntake();
    // Set up an interval to refresh data every minute
    const interval = setInterval(fetchWaterIntake, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {intake.length > 0 ? (
          intake.slice(0, 3).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-500/10 rounded-2xl p-4 backdrop-blur-sm border border-blue-500/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <i className="ri-goblet-2-line text-2xl text-blue-400"></i>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-blue-400">
                      {log.amount} ml Water
                    </p>
                    <p className="text-sm text-blue-300/80">
                      Added at {log.formattedTime}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-[300px] text-center"
          >
            <i className="ri-water-flash-line text-5xl text-blue-400/50 mb-4"></i>
            <p className="text-blue-300">No recent water intake recorded</p>
            <p className="text-blue-400/50 text-sm mt-2">
              Start tracking your water intake to see your progress
            </p>
          </motion.div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Latest;










































