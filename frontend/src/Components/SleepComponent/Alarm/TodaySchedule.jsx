// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";

// const TodaySchedule = () => {
//   const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
//   const [alarmTime, setAlarmTime] = useState(localStorage.getItem("alarmTime") || "");
//   const [alarmTriggered, setAlarmTriggered] = useState(false);
//   const [showAlarmModal, setShowAlarmModal] = useState(false);
//   const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem("isAlarmSet") === "true");
  
//   const audioRef = useRef();
//   const alarmIntervalRef = useRef();

//   useEffect(() => {
//     if (isAlarmSet) {
//       alarmIntervalRef.current = setInterval(checkAlarm, 1000);
//     }
//     return () => clearInterval(alarmIntervalRef.current);
//   }, [isAlarmSet, alarmTime]);

//   const checkAlarm = () => {
//     if (!alarmTime || !isAlarmSet) return;

//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);

//     if (currentHour === alarmHour && currentMinute === alarmMinute) {
//       triggerAlarm();
//     }
//   };

//   const triggerAlarm = () => {
//     setAlarmTriggered(true);
//     setShowAlarmModal(true);
//     if (audioRef.current) {
//       audioRef.current.play();
//     }
//     if (navigator.vibrate) {
//       navigator.vibrate([1000, 500, 1000, 500]);
//     }
//   };

//   const stopAlarm = () => {
//     setAlarmTriggered(false);
//     setShowAlarmModal(false);
//     setIsAlarmSet(false);
//     setBedTime("");
//     setAlarmTime("");
//     localStorage.removeItem("alarmTime");
//     localStorage.removeItem("bedTime");
//     localStorage.removeItem("isAlarmSet");
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//     if (navigator.vibrate) {
//       navigator.vibrate(0);
//     }
//   };

//   const handleSave = () => {
//     if (!bedTime || !alarmTime) {
//       toast.error("Please set both bedtime and wake-up time!");
//       return;
//     }
//     localStorage.setItem("bedTime", bedTime);
//     localStorage.setItem("alarmTime", alarmTime);
//     localStorage.setItem("isAlarmSet", "true");
//     setIsAlarmSet(true);
//     toast.success("Alarm set successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 p-4">
//       <div className="max-w-md mx-auto">
//         <ToastContainer />
//         <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>

//         <h2 className="text-2xl font-bold text-gray-200 mb-5 mt-4">Add Alarm</h2>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-6 bg-gray-400 rounded-xl">
//             <span className="text-gray-700 text-xl">Bedtime</span>
//             <input type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} className="text-right text-gray-600 bg-transparent" />
//           </div>
//           <div className="flex items-center justify-between p-6 bg-gray-400 rounded-xl">
//             <span className="text-gray-700 text-xl">Wake Up</span>
//             <input type="time" value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} className="text-right text-gray-600 bg-transparent" />
//           </div>
//         </div>
//         <button onClick={handleSave} className="w-full py-4 bg-blue-500 text-white rounded-xl font-medium mt-8">Add</button>
//         {showAlarmModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 text-center">
//               <h3 className="text-2xl font-bold">Time to Wake Up!</h3>
//               <p className="text-gray-600 mt-2">{alarmTime}</p>
//               <button onClick={stopAlarm} className="w-full py-3 px-4 bg-red-500 text-white rounded-xl mt-4">Stop</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodaySchedule;









// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";

// const TodaySchedule = () => {
//   const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
//   const [alarmTime, setAlarmTime] = useState(localStorage.getItem("alarmTime") || "");
//   const [alarmTriggered, setAlarmTriggered] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showAlarmModal, setShowAlarmModal] = useState(false);
//   const [lastAlarmCheck, setLastAlarmCheck] = useState(null);
//   const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
//   const [hoursOfSleep, setHoursOfSleep] = useState();
//   const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem("isAlarmSet") === "true");
  
//   const audioRef = useRef();
//   const alarmTimeoutRef = useRef()
//   const alarmIntervalRef = useRef();

//   useEffect(() => {
//     const savedAlarmState = localStorage.getItem('alarmState');
//     if (savedAlarmState) {
//       const { alarmTime: savedAlarmTime, bedTime: savedBedTime, isSet } = JSON.parse(savedAlarmState);
//       if (isSet) {
//         setBedTime(savedBedTime);
//         setAlarmTime(savedAlarmTime);
//         setIsAlarmSet(true);
//       }
//     }
//   }, []);
  
//    // Calculate hours of sleep whenever bedTime or alarmTime changes
//    useEffect(() => {
//     if (bedTime && alarmTime) {
//       const [bedHours, bedMinutes] = bedTime.split(":").map(Number);
//       const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number);

//       let hours = alarmHours - bedHours;
//       let minutes = alarmMinutes - bedMinutes;

//       if (hours < 0) {
//         hours += 24;
//       }

//       if (minutes < 0) {
//         hours -= 1;
//         minutes += 60;
//       }

//       const totalHours = hours + minutes / 60;
//       setHoursOfSleep(`${Math.floor(totalHours)} hours ${minutes} min`);
//     } else {
//       setHoursOfSleep("Set times to calculate");
//     }
//    }, [bedTime, alarmTime]);
  
//   useEffect(() => {
//     if (isAlarmSet) {
//       alarmIntervalRef.current = setInterval(checkAlarm, 1000);
//     }
//     return () => clearInterval(alarmIntervalRef.current);
//   }, [isAlarmSet, alarmTime]);

//   useEffect(() => {
//       // If alarm is set, save to localStorage
//         if (isAlarmSet && alarmTime) {
//           localStorage.setItem('alarmState', JSON.stringify({
//             alarmTime,
//             bedTime,
//             isSet: true
//           }));
//         }
//    });

//   const checkAlarm = () => {
//     if (!alarmTime || !isAlarmSet) return;

//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();
//     const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);

//     const currentTimeIdentifier = `${now.getDate()}-${currentHour}-${currentMinute}`;

//     if (currentHour === alarmHour && currentMinute === alarmMinute &&
//       currentTimeIdentifier !== lastAlarmCheck) {
//       triggerAlarm();
//       setLastAlarmCheck(currentTimeIdentifier);
//       setAlarmTriggered(true);
//       setVibrateOnAlarm(true);
//     }
//   };

//   const triggerAlarm = () => {
//     setAlarmTriggered(true);
//     setShowAlarmModal(true);
//     if (audioRef.current) {
//       audioRef.current.play();
//     }
//     if (navigator.vibrate) {
//       // navigator.vibrate([1000, 500, 1000, 500]);
//       if (vibrateOnAlarm) {
//         alarmTimeoutRef.current = {
//           timeout: setTimeout(() => {
//             vibratePattern();
//           }, 5 * 60 * 1000 ), // Vibrate every 5 minutes
//           };
//       }
//     }
//   };

//   // const stopAlarm = () => {
//   //   setAlarmTriggered(false);
//   //   setShowAlarmModal(false);
//   //   setIsAlarmSet(false);
//   //   setBedTime("");
//   //   setAlarmTime("");
//   //   localStorage.removeItem("alarmTime");
//   //   localStorage.removeItem("bedTime");
//   //   localStorage.removeItem("isAlarmSet");
//   //   if (audioRef.current) {
//   //     audioRef.current.pause();
//   //     audioRef.current.currentTime = 0;
//   //   }
//   //   if (navigator.vibrate) {
//   //     navigator.vibrate(0);
//   //   }
//   // };
//   const stopAlarm = () => {
//     setBedTime("");
//     setAlarmTime("");
//     localStorage.removeItem("alarmTime");
//     localStorage.removeItem("bedTime");
//     localStorage.removeItem("isAlarmSet");
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
    
//     if (navigator.vibrate) {
//       navigator.vibrate(0);
//     }
    
//     if (alarmTimeoutRef.current) {
//       clearTimeout(alarmTimeoutRef.current.timeout);
//       if (alarmTimeoutRef.current.vibrateInterval) {
//         clearInterval(alarmTimeoutRef.current.vibrateInterval);
//       }
//       alarmTimeoutRef.current = null;
//     }
    
//     setAlarmTriggered(false);
//     setShowAlarmModal(false);
//     setVibrateOnAlarm(false);
//     setIsAlarmSet(false);
//     localStorage.removeItem('alarmState');
//   };
//   const handleSave = () => {
//     if (!bedTime || !alarmTime) {
//       toast.error("Please set both bedtime and wake-up time!");
//       return;
//     }
//     localStorage.setItem("bedTime", bedTime);
//     localStorage.setItem("alarmTime", alarmTime);
//     localStorage.setItem("isAlarmSet", "true");
//     setIsAlarmSet(true);
//     toast.success("Alarm set successfully!");
//   };

//   // if (loading) {
//   //   return (
//   //     <div className="flex items-center justify-center h-screen">
//   //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className=" py-7 px-4">
//       <div className="max-w-md mx-auto">
//         <ToastContainer />
//         <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>

//         {/* Settings List */}
//         <div className="space-y-4">
//           <div className="">
            
//             <h2 className="text-2xl font-bold text-blue-400  mb-3 mt-4">Add Alarm</h2>
          
//           </div>
//           {/* Bedtime */}
//           <div className="flex items-center justify-between p-6  glass rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-hotel-bed-line text-3xl text-blue-400 mr-3"></i>
//               <span className="text-blue-400 text-xl">Bedtime</span>
//             </div>
//             <input
//               type="time"
//               value={bedTime || ""}
//               onChange={(e) => setBedTime(e.target.value)}
//               className=" text-right text-blue-400 bg-transparent"
//             />
//           </div>

//           {/* Hours of Sleep */}
//           <div className="flex items-center justify-between p-6 glass rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-time-line text-3xl text-blue-400 mr-3"></i>
//               <span className="text-blue-400 text-xl ">Hours of sleep</span>
//             </div>
//             <span className="text-blue-400 ">{hoursOfSleep}</span>
//           </div>

//           {/* Alarm Time */}
//           <div className="flex items-center justify-between p-6 glass rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-alarm-warning-line text-3xl text-blue-400 mr-3"></i>
//               <span className="text-blue-400 text-xl">Wake up</span>
//             </div>
//             <input
//               type="time"
//               value={alarmTime || ""}
//               onChange={(e) => {
//                 setAlarmTime(e.target.value);
//                 setAlarmTriggered(false);
//               }}
//               className="text-right text-blue-400 bg-transparent"
//             />
//           </div>

//           {/* Vibrate Toggle */}
//           <div className="flex items-center justify-between p-6 glass rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-volume-vibrate-line text-3xl text-blue-400 mr-3"></i>
//               <span className="text-blue-400 text-xl">Vibrate when alarm sound</span>
//             </div>
//             <div
//               className={`w-12 h-8 rounded-full flex items-center transition-colors duration-300 ${
//                 vibrateOnAlarm ? "bg-blue-400" : "bg-gray-300"
//               }`}
//             >
//               <span
//                 className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
//                   vibrateOnAlarm ? "translate-x-6" : "translate-x-1"
//                 }`}
//               ></span>
//             </div>
//           </div>
//         </div>

//         {/* Add Button */}
//         <div className="mt-4">
//           <button
//             onClick={handleSave}
//             className="w-full py-4 glass text-blue-400 rounded-xl font-medium mt-8 "
//           >
//             Add
//           </button>
//         </div>

//         {/* Alarm Modal */}
//         {showAlarmModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="glass p-8 rounded-2xl  max-w-sm w-full mx-4">
//               <div className="text-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   Time to Wake Up!
//                 </h3>
//                 <p className="text-blue-400 mt-2">{alarmTime}</p>
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={stopAlarm}
//                   className="w-full py-3 px-4 glass text-blue-400 rounded-xl"
//                 >
//                   Stop
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodaySchedule;












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





















