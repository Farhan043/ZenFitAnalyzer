// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Sleep = ({ userId }) => {
//   const [bedTime, setBedTime] = useState("");
//   const [alarmTime, setAlarmTime] = useState("");
//   const [bedDate, setBedDate] = useState(new Date());
//   const [alarmDate, setAlarmDate] = useState(new Date());
//   const [hoursOfSleep, setHoursOfSleep] = useState("--:--");
//   const [sleepData, setSleepData] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [audio, setAudio] = useState(null);
//   const [alarm, setAlarm] = useState(null);

//   useEffect(() => {
//     const checkAlarms = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/users/alarms', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         const now = new Date();
//         const upcomingAlarm = response.data.find((a) => new Date(a.alarmTime) <= now);
//         if (upcomingAlarm) setAlarm(upcomingAlarm);
//       } catch (error) {
//         console.error("Error fetching alarms:", error);
//         setErrorMessage("Error fetching alarms. Please try again later.");
//       }
//     };
//     const interval = setInterval(checkAlarms, 60000); // Check every minute
//     return () => clearInterval(interval);
//   }, []);

//   const playAlarm = () => {
//     const alarmAudio = new Audio("/sounds/alarm-sound.mp3");
//     alarmAudio.loop = true; // Loop until dismissed
//     alarmAudio.play().catch((error) => console.error("Audio playback failed:", error));
//     setAudio(alarmAudio);
//     if (navigator.vibrate) {
//       navigator.vibrate([200, 100, 200, 100, 200]); // Vibrate pattern
//     }
//   };

//   const handleClose = () => {
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0;
//     }
//     if (navigator.vibrate) {
//       navigator.vibrate(0); // Stop vibration
//     }
//     setAlarm(null);
//   };

//   useEffect(() => {
//     if (alarm) {
//       playAlarm();
//     }
//   }, [alarm]);

//   useEffect(() => {
//     if (bedTime && alarmTime) {
//       calculateHoursOfSleep();
//     }
//   }, [bedTime, alarmTime]);

//   // Function to calculate sleep duration and correct date
//   const calculateHoursOfSleep = () => {
//     const now = new Date();
//     const bedDateTime = new Date(bedDate);
//     const alarmDateTime = new Date(alarmDate);

//     const [bedHour, bedMin] = bedTime.split(":").map(Number);
//     const [alarmHour, alarmMin] = alarmTime.split(":").map(Number);

//     bedDateTime.setHours(bedHour, bedMin, 0);
//     alarmDateTime.setHours(alarmHour, alarmMin, 0);

//     // If the alarm time is *before* bedtime, set alarm to next day
//     if (alarmDateTime <= bedDateTime) {
//       alarmDateTime.setDate(bedDateTime.getDate() + 1);
//     }

//     let totalMinutes = (alarmDateTime - bedDateTime) / (1000 * 60);
//     const sleepDuration = `${Math.floor(totalMinutes / 60)}h ${
//       totalMinutes % 60
//     }m`;

//     setHoursOfSleep(sleepDuration);
//     setSleepData([{ name: "Today", hours: totalMinutes / 60 }]);
//     setAlarmDate(alarmDateTime);
//     setErrorMessage("");
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/users/sleep",
//         { bedTime, alarmTime }, // Send formatted data
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is sent
//           },
//         }
//       );
//       toast.success("Sleep data saved successfully!");
//     } catch (error) {
//       console.error("Error saving sleep data:", error);
//       setMessage("Error saving data. Please try again.");
//     }
//   };

//   // Format date and time for display
//   const formatDate = (date) => {
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (time) => {
//     if (!time) return "--:--";
//     const [hour, minute] = time.split(":").map(Number);
//     const period = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
//   };

//   return (
//     <>
//       <div className="p-8 bg-black mockup-phone border-primary rounded-lg shadow-2xl w-full max-w-lg text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           🛌 Sleep Tracker
//         </h2>

//         {/* Bedtime Section */}
//         <div className="flex flex-col space-y-3">
//           <label className="text-sm font-semibold">🌙 Bedtime:</label>
//           <input
//             type="time"
//             value={bedTime}
//             onChange={(e) => setBedTime(e.target.value)}
//             className="p-3 bg-gray-800 text-white rounded-md border border-gray-700 w-full"
//           />
//           <p className="text-xs text-gray-400">
//             📅 {formatDate(bedDate)} | 🕒 {formatTime(bedTime)}
//           </p>
//         </div>

//         {/* Alarm Time Section */}
//         <div className="flex flex-col space-y-3 mt-4">
//           <label className="text-sm font-semibold">⏰ Alarm Time:</label>
//           <input
//             type="time"
//             value={alarmTime}
//             onChange={(e) => setAlarmTime(e.target.value)}
//             className="p-3 bg-gray-800 text-white rounded-md border border-gray-700 w-full"
//           />
//           <p className="text-xs text-gray-400">
//             📅 {formatDate(alarmDate)} | 🕒 {formatTime(alarmTime)}
//           </p>
//         </div>

//         {errorMessage && (
//           <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//         )}

//         <button
//           onClick={handleSave}
//           className="mt-4 p-3 bg-green-600 hover:bg-green-700 rounded-lg w-full text-white font-bold transition-all duration-300 shadow-md"
//         >
//           Save Times
//         </button>

//         <div className="text-center mt-6 text-lg">
//           😴 Sleep Duration: <b>{hoursOfSleep}</b>
//         </div>
//       </div>

//       {alarm && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold">⏰ Alarm!</h2>
//             <p><strong>Bedtime:</strong> {new Date(alarm.bedTime).toLocaleTimeString()}</p>
//             <p><strong>Alarm Time:</strong> {new Date(alarm.alarmTime).toLocaleTimeString()}</p>
//             <button
//               onClick={handleClose}
//               className="mt-4 p-2 bg-red-500 text-white rounded-lg"
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sleep;













// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Sleep = () => {
//   const [bedTime, setBedTime] = useState("");
//   const [alarmTime, setAlarmTime] = useState("");
//   const [hoursOfSleep, setHoursOfSleep] = useState("--:--");
//   const [alarm, setAlarm] = useState(null);
//   const [audioSrc, setAudioSrc] = useState("/alarm-sound.mp3");

//   useEffect(() => {
//     fetch(audioSrc)
//       .then(response => response.blob())
//       .then(blob => {
//         const url = URL.createObjectURL(blob);
//         setAudioSrc(url);
//         console.log("Alarm audio fetched and set correctly");
//       })
//       .catch(error => console.error("Error fetching alarm audio:", error));
//   }, []);

//   useEffect(() => {
//     const checkAlarms = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/user/alarms", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         const now = new Date();
//         const upcomingAlarm = response.data.find((a) => new Date(a.alarmTime) <= now);
//         if (upcomingAlarm) {
//           console.log("Alarm triggered:", upcomingAlarm);
//           setAlarm(upcomingAlarm);
//         }
//       } catch (error) {
//         console.error("Error fetching alarms:", error);
//       }
//     };
//     const interval = setInterval(checkAlarms, 1000); // Check every second
//     return () => clearInterval(interval);
//   }, []);

//   const playAlarm = () => {
//     const alarmAudio = new Audio(audioSrc);
//     alarmAudio.loop = true;
//     alarmAudio.play().catch((error) => console.error("Audio playback failed:", error));
//   };

//   const handleClose = () => {
//     setAlarm(null);
//   };

//   useEffect(() => {
//     if (alarm) {
//       playAlarm();
//     }
//   }, [alarm]);

//   const handleSave = async () => {
//     if (!bedTime || !alarmTime) {
//       toast.error("Please select both bedtime and alarm time!");
//       return;
//     }
    
//     try {
//       const bedTimeDate = new Date();
//       const [bedHour, bedMin] = bedTime.split(":").map(Number);
//       bedTimeDate.setHours(bedHour, bedMin, 0);
      
//       const alarmTimeDate = new Date();
//       const [alarmHour, alarmMin] = alarmTime.split(":").map(Number);
//       alarmTimeDate.setHours(alarmHour, alarmMin, 0);
      
//       if (alarmTimeDate <= bedTimeDate) {
//         alarmTimeDate.setDate(bedTimeDate.getDate() + 1);
//       }
      
//       const sleepDuration = Math.floor((alarmTimeDate - bedTimeDate) / (1000 * 60 * 60)) + "h " + ((alarmTimeDate - bedTimeDate) / (1000 * 60) % 60) + "m";
//       setHoursOfSleep(sleepDuration);

//       await axios.post("http://localhost:4000/user/sleep", {
//         bedTime: bedTimeDate,
//         alarmTime: alarmTimeDate,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
      
//       toast.success("Sleep data saved successfully!");
//     } catch (error) {
//       console.error("Error saving sleep data:", error);
//       toast.error("Failed to save sleep data.");
//     }
//   };

//   return (
//     <>
//       <div className="p-8 bg-black rounded-lg shadow-2xl w-full max-w-lg text-white">
//         <h2 className="text-2xl font-bold text-center mb-6">🛌 Sleep Tracker</h2>
//         <label className="text-sm font-semibold">🌙 Bedtime:</label>
//         <input type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} className="p-3 bg-gray-800 text-white rounded-md w-full" />
//         <label className="text-sm font-semibold">⏰ Alarm Time:</label>
//         <input type="time" value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} className="p-3 bg-gray-800 text-white rounded-md w-full" />
//         <button onClick={handleSave} className="mt-4 p-3 bg-green-600 hover:bg-green-700 rounded-lg w-full text-white font-bold">Save Times</button>
//         <div className="text-center mt-6 text-lg">😴 Sleep Duration: <b>{hoursOfSleep}</b></div>
//       </div>
//       {alarm && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h2 className="text-xl font-bold">⏰ Alarm!</h2>
//             <p><strong>Bedtime:</strong> {new Date(alarm.bedTime).toLocaleTimeString()}</p>
//             <p><strong>Alarm Time:</strong> {new Date(alarm.alarmTime).toLocaleTimeString()}</p>
//             <button onClick={handleClose} className="mt-4 p-2 bg-red-500 text-white rounded-lg">Dismiss</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sleep;




import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';

const Sleep = () => {
  const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
  const [alarmTime, setAlarmTime] = useState(localStorage.getItem("alarmTime") || "");
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [lastAlarmCheck, setLastAlarmCheck] = useState(null);
  const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
  const [hoursOfSleep, setHoursOfSleep] = useState();
  const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem("isAlarmSet") === "true");

  const audioRef = useRef();
  const alarmTimeoutRef = useRef();
  const alarmIntervalRef = useRef();

  useEffect(() => {
    const savedAlarmState = localStorage.getItem('alarmState');
    if (savedAlarmState) {
      const { alarmTime: savedAlarmTime, bedTime: savedBedTime, isSet } = JSON.parse(savedAlarmState);
      if (isSet) {
        setBedTime(savedBedTime);
        setAlarmTime(savedAlarmTime);
        setIsAlarmSet(true);
      }
    }
  }, []);

  useEffect(() => {
    if (bedTime && alarmTime) {
      const [bedHours, bedMinutes] = bedTime.split(":").map(Number);
      const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number);

      let hours = alarmHours - bedHours;
      let minutes = alarmMinutes - bedMinutes;

      if (hours < 0) {
        hours += 24;
      }

      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }

      const totalHours = hours + minutes / 60;
      setHoursOfSleep(`${Math.floor(totalHours)} hours ${minutes} min`);
    } else {
      setHoursOfSleep("Set times to calculate");
    }
  }, [bedTime, alarmTime]);

  useEffect(() => {
    if (isAlarmSet) {
      alarmIntervalRef.current = setInterval(checkAlarm, 1000);
    }
    return () => clearInterval(alarmIntervalRef.current);
  }, [isAlarmSet, alarmTime]);

  useEffect(() => {
    if (isAlarmSet && alarmTime) {
      localStorage.setItem('alarmState', JSON.stringify({
        alarmTime,
        bedTime,
        isSet: true
      }));
    }
  });

  const checkAlarm = () => {
    if (!alarmTime || !isAlarmSet) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);

    const currentTimeIdentifier = `${now.getDate()}-${currentHour}-${currentMinute}`;

    if (currentHour === alarmHour && currentMinute === alarmMinute &&
      currentTimeIdentifier !== lastAlarmCheck) {
      triggerAlarm();
      setLastAlarmCheck(currentTimeIdentifier);
      setAlarmTriggered(true);
      setVibrateOnAlarm(true);
    }
  };

  const triggerAlarm = () => {
    setAlarmTriggered(true);
    setShowAlarmModal(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (navigator.vibrate) {
      navigator.vibrate([1000, 500, 1000, 500]);
    }
    alarmTimeoutRef.current = setTimeout(stopAlarm, 5 * 60 * 1000); // Stop alarm after 5 minutes
  };

  const stopAlarm = () => {
    setBedTime("");
    setAlarmTime("");
    // localStorage.removeItem("alarmTime");
    // localStorage.removeItem("bedTime");
    // localStorage.removeItem("isAlarmSet");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (navigator.vibrate) {
      navigator.vibrate(0);
    }

    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }

    setAlarmTriggered(false);
    setShowAlarmModal(false);
    setVibrateOnAlarm(false);
    setIsAlarmSet(false);
    localStorage.removeItem('alarmState');
  };

  const handleSave = () => {
    if (!bedTime || !alarmTime) {
      toast.error("Please set both bedtime and wake-up time!");
      return;
    }
    localStorage.setItem("bedTime", bedTime);
    localStorage.setItem("alarmTime", alarmTime);
    localStorage.setItem("isAlarmSet", "true");
    setIsAlarmSet(true);
    toast.success("Alarm set successfully!");
  };

  return {
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
  };
};

export default Sleep;
