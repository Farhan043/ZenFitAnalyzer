

import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import useAlarm from "../../SleepComponent/Alarm/useAlarm";

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

  return (
    <div className="py-7 px-4">
      <div className="max-w-md mx-auto">
        <ToastContainer />
        <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>

        {/* Settings List */}
        <div className="space-y-4">
          <div className="">
            <h2 className="text-2xl font-bold text-blue-400 mb-3 mt-4">Add Alarm</h2>
          </div>
          {/* Bedtime */}
          <div className="flex items-center justify-between p-6 glass rounded-xl">
            <div className="flex items-center">
              <i className="ri-hotel-bed-line text-3xl text-blue-400 mr-3"></i>
              <span className="text-blue-400 text-xl">Bedtime</span>
            </div>
            <input
              type="time"
              value={bedTime || ""}
              onChange={(e) => setBedTime(e.target.value)}
              className="text-right text-blue-400 bg-transparent"
            />
          </div>

          {/* Hours of Sleep */}
          <div className="flex items-center justify-between p-6 glass rounded-xl">
            <div className="flex items-center">
              <i className="ri-time-line text-3xl text-blue-400 mr-3"></i>
              <span className="text-blue-400 text-xl">Hours of sleep</span>
            </div>
            <span className="text-blue-400">{hoursOfSleep}</span>
          </div>

          {/* Alarm Time */}
          <div className="flex items-center justify-between p-6 glass rounded-xl">
            <div className="flex items-center">
              <i className="ri-alarm-warning-line text-3xl text-blue-400 mr-3"></i>
              <span className="text-blue-400 text-xl">Wake up</span>
            </div>
            <input
              type="time"
              value={alarmTime || ""}
              onChange={(e) => {
                setAlarmTime(e.target.value);
                setAlarmTriggered(false);
              }}
              className="text-right text-blue-400 bg-transparent"
            />
          </div>

          {/* Vibrate Toggle */}
          <div className="flex items-center justify-between p-6 glass rounded-xl">
            <div className="flex items-center">
              <i className="ri-volume-vibrate-line text-3xl text-blue-400 mr-3"></i>
              <span className="text-blue-400 text-xl">Vibrate when alarm sound</span>
            </div>
            <div
              className={`w-12 h-8 rounded-full flex items-center transition-colors duration-300 ${
                vibrateOnAlarm ? "bg-blue-400" : "bg-gray-300"
              }`}
              onClick={() => setVibrateOnAlarm(!vibrateOnAlarm)}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  vibrateOnAlarm ? "translate-x-6" : "translate-x-1"
                }`}
              ></span>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full py-4 glass text-blue-400 rounded-xl font-medium mt-8"
          >
            Add
          </button>
        </div>

        {/* Alarm Modal */}
        {showAlarmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass p-8 rounded-2xl max-w-sm w-full mx-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Time to Wake Up!</h3>
                <p className="text-blue-400 mt-2">{alarmTime}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={stopAlarm}
                  className="w-full py-3 px-4 glass text-blue-400 rounded-xl"
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














