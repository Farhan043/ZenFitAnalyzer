import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBed, FaClock, FaBell, FaMobileAlt, FaMoon, FaRegMoon, FaSun, FaHistory, FaChartLine, FaCalendarCheck } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import useAlarm from "../SleepComponent/Sleep";
import axios from "axios";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.userId || payload._id;
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

const TodaySchedule = () => {
  const {
    bedTime,
    setBedTime,
    alarmTime,
    setAlarmTime,
    alarmTriggered,
    setAlarmTriggered,
    showAlarmModal,
    setShowAlarmModal,
    lastAlarmCheck,
    setLastAlarmCheck,
    hoursOfSleep: alarmHoursOfSleep,
    isAlarmSet,
    setIsAlarmSet,
    vibrateOnAlarm,
    setVibrateOnAlarm,
    audioRef,
    stopAlarm,
    handleSave: saveAlarm,
  } = useAlarm();
  
  // Local state for hours of sleep
  const [hoursOfSleep, setHoursOfSleep] = useState("--");
  const [bedDate, setBedDate] = useState(new Date());
  const [alarmDate, setAlarmDate] = useState(new Date());
  const [schedule, setSchedule] = useState(null);
  const [sleepInsights, setSleepInsights] = useState(false);
  const [insightData, setInsightData] = useState({
    averageSleep: "--",
    bestDay: "--",
    sleepGoal: "8 hrs",
    consistency: "--",
    sleepTrend: "neutral"
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Format date and time for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "--:--";
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  // Calculate sleep duration in hours when times change
  useEffect(() => {
    if (bedTime && alarmTime) {
      // Parse time strings
      const [bedHour, bedMinute] = bedTime.split(':').map(Number);
      const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
      
      // Create Date objects
      const bedTimeDate = new Date();
      bedTimeDate.setHours(bedHour, bedMinute, 0);
      
      const alarmTimeDate = new Date();
      alarmTimeDate.setHours(alarmHour, alarmMinute, 0);
      
      // If alarm time is earlier than bed time, assume it's for the next day
      if (alarmTimeDate <= bedTimeDate) {
        alarmTimeDate.setDate(alarmTimeDate.getDate() + 1);
      }
      
      // Calculate difference in hours
      const diffMs = alarmTimeDate - bedTimeDate;
      const diffHours = diffMs / (1000 * 60 * 60);
      
      // Update hours of sleep with one decimal place
      setHoursOfSleep(diffHours.toFixed(1));
    } else {
      setHoursOfSleep("--");
    }
  }, [bedTime, alarmTime]);

  // Get quality description based on hours
  const getSleepQuality = (hours) => {
    if (!hours || hours === "--") return { text: "Not set", color: "text-gray-400" };
    
    const numHours = parseFloat(hours);
    if (numHours < 6) return { text: "Poor", color: "text-red-400" };
    if (numHours < 7) return { text: "Fair", color: "text-yellow-400" };
    if (numHours < 9) return { text: "Good", color: "text-green-400" };
    return { text: "Excellent", color: "text-blue-400" };
  };

  // Update useEffect for initial data loading
  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    Promise.all([
      fetchTodaySchedule(),
      fetchSleepInsights()
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Update fetchTodaySchedule function
  const fetchTodaySchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(
        "http://localhost:4000/sleep/today-schedule",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId }
        }
      );
      
      setSchedule(response.data);
      
      // If we have a schedule, update the bedTime and alarmTime
      if (response.data && !response.data.isDefault) {
        const bedDateTime = new Date(response.data.bedTime);
        const alarmDateTime = new Date(response.data.alarmTime);
        
        // Format for input time field (HH:MM)
        const formatTimeInput = (date) => {
          return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        };
        
        setBedTime(formatTimeInput(bedDateTime));
        setAlarmTime(formatTimeInput(alarmDateTime));
        setBedDate(bedDateTime);
        setAlarmDate(alarmDateTime);
        
        // Extract sleep duration
        if (response.data.sleepDuration) {
          const hourMatch = response.data.sleepDuration.match(/(\d+)h/);
          const minuteMatch = response.data.sleepDuration.match(/(\d+)m/);
          
          const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
          const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
          
          setHoursOfSleep((hours + (minutes / 60)).toFixed(1));
        }
      }
      
      // Save to localStorage
      localStorage.setItem(`todaySchedule_${userId}`, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching today's schedule:", error);
      if (error.message === "User not authenticated") {
        navigate("/login");
      }
      return null;
    }
  };

  // Fetch sleep insights
  const fetchSleepInsights = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await axios.get(
        "http://localhost:4000/sleep/sleep-insights",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setInsightData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching sleep insights:", error);
      toast.error("Failed to load sleep insights");
      return null;
    }
  };

  // Update updateSchedule function
  const handleSave = async () => {
    if (!bedTime || !alarmTime) {
      toast.error("Please set both bedtime and wake-up time");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      // Parse time strings
      const [bedHour, bedMinute] = bedTime.split(':').map(Number);
      const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
      
      // Create Date objects
      const bedTimeDate = new Date();
      bedTimeDate.setHours(bedHour, bedMinute, 0);
      
      const alarmTimeDate = new Date();
      alarmTimeDate.setHours(alarmHour, alarmMinute, 0);
      
      // If alarm time is earlier than bed time, assume it's for the next day
      if (alarmTimeDate <= bedTimeDate) {
        alarmTimeDate.setDate(alarmTimeDate.getDate() + 1);
      }

      const response = await axios.put(
        "http://localhost:4000/sleep/update-schedule",
        { 
          bedTime: bedTimeDate, 
          alarmTime: alarmTimeDate, 
          userId 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSchedule(response.data);
      setBedDate(new Date(response.data.bedTime));
      setAlarmDate(new Date(response.data.alarmTime));
      
      // Set alarm in the useAlarm hook
      saveAlarm();
      
      // Update localStorage
      localStorage.setItem(`todaySchedule_${userId}`, JSON.stringify(response.data));
      toast.success("Sleep schedule saved successfully!");
      
      // Refresh insights
      fetchSleepInsights();
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast.error("Failed to update schedule");
    }
  };

  // Add cleanup function
  useEffect(() => {
    return () => {
      const userId = getUserId();
      if (userId) {
        localStorage.removeItem(`todaySchedule_${userId}`);
      }
    };
  }, []);

  // Add token removal listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setSchedule(null);
        navigate("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const sleepQuality = getSleepQuality(hoursOfSleep);
  
  // Get trend icon based on sleep trend
  const getTrendIcon = () => {
    switch(insightData.sleepTrend) {
      case 'improving':
        return <span className="text-green-400">↗</span>;
      case 'declining':
        return <span className="text-red-400">↘</span>;
      default:
        return <span className="text-blue-400">→</span>;
    }
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto my-8 px-4 sm:px-6">
      <ToastContainer position="top-center" theme="dark" />
      <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>
      
      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-6 py-10 sm:px-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-2xl"></div>
          </div>
          
          <div className="relative flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaMoon className="text-blue-400" />
              <span>Sleep Tracker</span>
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSleepInsights(!sleepInsights)}
              className="bg-gray-700/50 hover:bg-gray-700/80 text-white p-3 rounded-xl flex items-center gap-2 text-sm border border-gray-600"
            >
              <FaHistory />
              {sleepInsights ? "Hide" : "Sleep Insights"}
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <div className="text-lg text-gray-400 mb-1">Today's Date</div>
              <div className="text-2xl font-semibold text-white">{formatDate(new Date())}</div>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <div className="text-lg text-gray-400 mb-1">Sleep Time</div>
              <div className="text-2xl font-semibold text-white">{hoursOfSleep || "--"} hours</div>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <div className="text-lg text-gray-400 mb-1">Quality</div>
              <div className={`text-2xl font-semibold ${sleepQuality.color}`}>{sleepQuality.text}</div>
            </div>
          </div>
        </div>
        
        {/* Sleep Insights Panel */}
        <AnimatePresence>
          {sleepInsights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-800/50 px-6 sm:px-10 overflow-hidden"
            >
              <div className="py-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FaChartLine className="text-blue-400" />
                  Sleep Insights {isLoading && <span className="text-xs text-gray-400">(Loading...)</span>}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Average Sleep</span>
                      <FaRegMoon className="text-blue-400" />
                    </div>
                    <div className="text-xl font-bold text-white">
                      {insightData.averageSleep} hrs
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Best Day</span>
                      <FaCalendarCheck className="text-green-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{insightData.bestDay}</div>
                  </div>
                  
                  <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Sleep Goal</span>
                      <FaHistory className="text-amber-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{insightData.sleepGoal}</div>
                  </div>
                  
                  <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Consistency</span>
                      <FaClock className="text-purple-400" />
                    </div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      {insightData.consistency} {getTrendIcon()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Form */}
        <div className="px-6 py-8 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bedtime Input */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <FaMoon className="text-indigo-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Bedtime</h3>
              </div>
              
              <div className="relative">
                <input
                  type="time"
                  value={bedTime || ""}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full p-4 pl-12 bg-gray-700/40 border border-gray-600 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <FaBed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-700/50">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-300">{formatDate(bedDate)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-blue-400 font-medium">{formatTime(bedTime)}</span>
                </div>
              </div>
            </div>
            
            {/* Alarm Time Input */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-900/30 rounded-full flex items-center justify-center">
                  <FaSun className="text-amber-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white">Wake Up</h3>
              </div>
              
              <div className="relative">
                <input
                  type="time"
                  value={alarmTime || ""}
                  onChange={(e) => {
                    setAlarmTime(e.target.value);
                    setAlarmTriggered(false);
                  }}
                  className="w-full p-4 pl-12 bg-gray-700/40 border border-gray-600 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm"
                />
                <FaBell className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="bg-gray-700/20 rounded-xl p-4 border border-gray-700/50">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-300">{formatDate(alarmDate)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-amber-400 font-medium">{formatTime(alarmTime)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vibration Toggle */}
          <div className="mt-8 flex items-center justify-between p-5 bg-gray-700/30 rounded-xl border border-gray-700">
            <div className="flex items-center gap-3">
              <FaMobileAlt className="text-gray-400" />
              <span className="text-lg text-white">Vibrate on Alarm</span>
            </div>
            
            <div
              className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors ${
                vibrateOnAlarm ? "bg-blue-500" : "bg-gray-600"
              }`}
              onClick={() => setVibrateOnAlarm(!vibrateOnAlarm)}
            >
              <motion.div
                className="bg-white w-5 h-5 rounded-full shadow-lg"
                animate={{ x: vibrateOnAlarm ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>
          
          {/* Save Button */}
          <button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full mt-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white text-lg font-semibold shadow-lg transition-all"
          >
            Set Sleep Schedule
          </button>
          
          <p className="text-center text-gray-500 mt-4 text-sm">
            Your sleep schedule helps us track your sleep patterns and improve your rest quality
          </p>
        </div>
      </motion.div>
      
      {/* Alarm Modal */}
      <AnimatePresence>
        {showAlarmModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl max-w-md w-full mx-auto border border-gray-700 shadow-2xl"
            >
              <div className="flex justify-end">
                <button onClick={stopAlarm} className="text-gray-400 hover:text-white">
                  <IoCloseCircle size={24} />
                </button>
              </div>
              
              <div className="text-center mb-8 mt-4">
                <div className="w-24 h-24 bg-indigo-900/30 rounded-full mx-auto flex items-center justify-center mb-6">
                  <FaBell className="text-amber-400 text-4xl animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Time to Wake Up!
                </h3>
                <p className="text-xl text-blue-400 font-medium">{formatTime(alarmTime)}</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopAlarm}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white text-lg font-semibold shadow-lg"
              >
                Stop Alarm
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodaySchedule;
