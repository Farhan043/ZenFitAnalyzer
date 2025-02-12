// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";

// const AlarmAndBedtime = () => {
//   const [bedTime, setBedTime] = useState("");
//   const [alarmTime, setAlarmTime] = useState("");
//   const [alarmTriggered, setAlarmTriggered] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [showAlarmModal, setShowAlarmModal] = useState(false);
//   const [lastAlarmCheck, setLastAlarmCheck] = useState(null);
//   const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
//   const [hoursOfSleep, setHoursOfSleep] = useState("8 hours");
//   // const [isAlarmSet, setIsAlarmSet] = useState(false);
//   const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem("isAlarmSet") === "true");

//   const audioRef = useRef();  //Points to the alarm sound for controlling playback.
//   const alarmTimeoutRef = useRef();//Stores the timer that stops the alarm after 5 minutes.
//   const alarmIntervalRef = useRef();// Stores the interval for checking the alarm time every second.

//   //Load saved alarm state on component mount
//   // what is the pupose of this? store the alarm state in the local storage
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
//   }, [  ]);

//   // Calculate hours of sleep whenever bedTime or alarmTime changes
//   useEffect(() => {
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
//   }, [bedTime, alarmTime]);

//   // Fetch saved alarm and bedtime settings
//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/alarm`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const { bedTime, alarmTime, vibrateOnAlarm, isAlarmSet } = response.data;
//         setBedTime(bedTime || "");
//         setAlarmTime(alarmTime || "");
//         setVibrateOnAlarm(vibrateOnAlarm || false);
//         setIsAlarmSet(isAlarmSet || false);

//         // If alarm is set, save to localStorage
//         // if (isAlarmSet && alarmTime) {
//         //   localStorage.setItem('alarmState', JSON.stringify({
//         //     alarmTime,
//         //     bedTime,
//         //     isSet: true
//         //   }));
//         // }
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   // what is the purpose of this code ? if user set alarm and close the app and open it again the alarm will be triggered if the time is reached 
//   useEffect(() => {
//     const checkAlarm = () => {
//       if (!alarmTime || !isAlarmSet) () => {
//         return;
//       }
 
//       const now = new Date(); // this line means that the current time is stored in the now variable
//       const currentHour = now.getHours(); // this line means that the current hour is stored in the currentHour variable
//       const currentMinute = now.getMinutes(); //this line means that the current minute is stored in the currentMinute variable
      
//       const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
      
//       const currentTimeIdentifier = `${now.getDate()}-${currentHour}-${currentMinute}`;
      
//       if (currentHour === alarmHour && 
//           currentMinute === alarmMinute && 
//           currentTimeIdentifier !== lastAlarmCheck) {
//         setLastAlarmCheck(currentTimeIdentifier);
//         setAlarmTriggered(true);
//         setVibrateOnAlarm(true);
//         playAlarmSound();
//       }
//     };

//     // Clear any existing interval
//     if (alarmIntervalRef.current) {
//       clearInterval(alarmIntervalRef.current);
//     }

//     // Start new interval if alarm is set
//     if (isAlarmSet) {
//       alarmIntervalRef.current = setInterval(checkAlarm, 1000);
//     }

//     // Cleanup function
//     return () => {
//       if (alarmIntervalRef.current) {
//         clearInterval(alarmIntervalRef.current);
//       }
//     };
//   }, [alarmTime, alarmTriggered, lastAlarmCheck, isAlarmSet]);

//   const playAlarmSound = () => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = 0;
//       audioRef.current.loop = true;
//       audioRef.current
//         .play()
//         .then(() => {
//           setShowAlarmModal(true);
//           if (navigator.vibrate) {
//             // Continuous vibration pattern
//             const vibratePattern = () => {
//               navigator.vibrate([1000, 500]);
//             };
            
//             vibratePattern();
//             const vibrateInterval = setInterval(vibratePattern, 1500);
            
//             // Store the interval ID for cleanup
//             alarmTimeoutRef.current = {
//               timeout: setTimeout(() => {
//                 clearInterval(vibrateInterval);
//                 stopAlarm();
//               }, 5 * 60 * 1000), // 5 minutes
//               vibrateInterval
//             };
//           }
//         })
//         .catch((err) => console.error("Error playing alarm sound:", err));
//     }
//   };

//   const stopAlarm = () => {
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

//   const handleSave = async () => {
//     if (!bedTime || !alarmTime) {
//       toast.error('Please set both bedtime and wake up time!', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//       return;
//     }

//     // try {
//     //   const data = { 
//     //     bedTime, 
//     //     alarmTime,
//     //     vibrateOnAlarm: false,
//     //     isAlarmSet: true
//     //   };
//     //   const token = localStorage.getItem("token");
//     //   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/alarm`, data, {
//     //     headers: { Authorization: `Bearer ${token}` },
//     //   });

//     //   if (response.status === 200) {
//     //     setIsAlarmSet(true); 
//     localStorage.setItem("bedTime", bedTime);
//     localStorage.setItem("alarmTime", alarmTime);
//     localStorage.setItem("isAlarmSet", "true");
//     setIsAlarmSet(true);
//         // Save alarm state to localStorage
//         localStorage.setItem('alarmState', JSON.stringify({
//           alarmTime,
//           bedTime,
//           isSet: true
//         }));
        
//         toast.success('Alarm and bedtime set successfully!', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       }


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-800 p-4">
//       <div className="max-w-md mx-auto">
//         <ToastContainer />
//         <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>

//         {/* Settings List */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between ">
//             <Link to="/home"><i className="ri-arrow-left-s-line glass rounded-full  text-4xl text-gray-200"></i> </Link> 
//             <h2 className="text-2xl font-bold text-gray-200 mb-5 mt-4">Add Alarm</h2> 
//             <Link to="/sleepTracker"><i className="ri-arrow-right-s-line glass rounded-full text-4xl  text-gray-200"></i> </Link> 
//           </div>
//           {/* Bedtime */}
//           <div className="flex items-center justify-between p-6  bg-gray-400 rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-hotel-bed-line text-3xl text-gray-700 mr-3"></i>
//               <span className="text-gray-700 text-xl">Bedtime</span>
//             </div>
//             <input
//               type="time"
//               value={bedTime || ""}
//               onChange={(e) => setBedTime(e.target.value)}
//               className=" text-right text-gray-600 bg-transparent"
//             />
//           </div>

//           {/* Hours of Sleep */}
//           <div className="flex items-center justify-between p-6 bg-gray-400 rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-time-line text-3xl text-gray-700 mr-3"></i>
//               <span className="text-gray-700 text-xl ">Hours of sleep</span>
//             </div>
//             <span className="text-gray-600 ">{hoursOfSleep}</span>
//           </div>

//           {/* Alarm Time */}
//           <div className="flex items-center justify-between p-6 bg-gray-400 rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-alarm-warning-line text-3xl text-gray-700 mr-3"></i>
//               <span className="text-gray-700 text-xl">Wake up</span>
//             </div>
//             <input
//               type="time"
//               value={alarmTime || ""}
//               onChange={(e) => {
//                 setAlarmTime(e.target.value);
//                 setAlarmTriggered(false);
//               }}
//               className="text-right text-gray-600 bg-transparent"
//             />
//           </div>

//           {/* Vibrate Toggle */}
//           <div className="flex items-center justify-between p-6 bg-gray-400 rounded-xl">
//             <div className="flex items-center">
//               <i className="ri-volume-vibrate-line text-3xl text-gray-700 mr-3"></i>
//               <span className="text-gray-700 text-xl">Vibrate when alarm sound</span>
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
//         <div className="mt-72">
//           <button
//             onClick={handleSave}
//             className="w-full py-4 glass text-white rounded-xl font-medium mt-8 "
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
//                 <p className="text-gray-200 mt-2">{alarmTime}</p>
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={stopAlarm}
//                   className="w-full py-3 px-4 glass text-white rounded-xl"
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

// export default AlarmAndBedtime;









