import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaBed, FaClock, FaBell, FaMobileAlt } from "react-icons/fa";
import useAlarm from "../SleepComponent/Sleep";

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
    hoursOfSleep,
    isAlarmSet,
    setIsAlarmSet,
    vibrateOnAlarm,
    setVibrateOnAlarm,
    audioRef,
    stopAlarm,
    handleSave,
  } = useAlarm();
  const [bedDate, setBedDate] = useState(new Date());
  const [alarmDate, setAlarmDate] = useState(new Date());

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

  return (
    <div className="min-h-screen  mockup-phone border-primary flex items-center justify-center bg-gray-900 text-white p-4">
      <ToastContainer />
      <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
         <span className=" text-5xl"> 🛌</span> Sleep Tracker
        </h2>

        {/* Bedtime Input */}
        <div className="mb-4">
          <label className="text-xl font-semibold"> <span className="text-2xl">🌙</span> Bedtime:</label>
          <input
            type="time"
            value={bedTime || ""}
            onChange={(e) => setBedTime(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400">
            📅 {formatDate(bedDate)} | 🕒 {formatTime(bedTime)}
          </p>
        </div>

        {/* Alarm Time Input */}
        <div className="mb-4">
          <label className="text-xl font-semibold"> <span className="text-2xl">⏰</span> Alarm Time:</label>
          <input
            type="time"
            value={alarmTime || ""}
            onChange={(e) => {
              setAlarmTime(e.target.value);
              setAlarmTriggered(false);
            }}
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400">
            📅 {formatDate(alarmDate)} | 🕒 {formatTime(alarmTime)}
          </p>
        </div>

        {/* Hours of Sleep */}
        <div className="mb-4 flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <span className="text-gray-300 flex items-center">
            <FaClock className="mr-2" /> Hours of Sleep:
          </span>
          <span className="text-blue-400">{hoursOfSleep}</span>
        </div>

        {/* Vibration Toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-300 flex items-center">
            <FaMobileAlt className="mr-2" /> Vibrate on Alarm
          </span>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
              vibrateOnAlarm ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setVibrateOnAlarm(!vibrateOnAlarm)}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: vibrateOnAlarm ? 24 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
        >
          Save Alarm
        </button>

        {/* Alarm Modal */}
        {showAlarmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-2xl max-w-sm w-full mx-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Time to Wake Up!
                </h3>
                <p className="text-blue-400 mt-2">{alarmTime}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={stopAlarm}
                  className="w-full py-3 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
