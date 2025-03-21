// import React, { useState, useEffect } from "react";
// import { getDistance } from "geolib";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaWalking, FaRunning, FaBicycle } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";

// const GPSTracker = ({ userId }) => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [distance, setDistance] = useState(0);
//   const [caloriesBurned, setCaloriesBurned] = useState(0);
//   const [isTracking, setIsTracking] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [activityType, setActivityType] = useState("running");

//   useEffect(() => {
//     let watchId;
//     if (isTracking) {
//       setStartTime(Date.now());
//       watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const newPoint = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setCoordinates((prev) => {
//             if (prev.length > 0) {
//               const lastPoint = prev[prev.length - 1];
//               const newDistance = getDistance(lastPoint, newPoint);
//               setDistance((d) => d + newDistance);
//             }
//             return [...prev, newPoint];
//           });
//         },
//         (error) => console.error("GPS Error:", error),
//         { enableHighAccuracy: true, maximumAge: 0 }
//       );
//     } else {
//       navigator.geolocation.clearWatch(watchId);
//     }
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, [isTracking]);

//   // useEffect(() => {
//   //   if (!isTracking && startTime) {
//   //     const timeTaken = (Date.now() - startTime) / 1000 / 60;
//   //     const calorieRates = { walking: 50, running: 80, cycling: 40 };
//   //     setCaloriesBurned((distance / 1000) * calorieRates[activityType]);
//   //   }
//   // }, [isTracking]);

//   useEffect(() => {
//     if (!isTracking && startTime) {
//       const timeTaken = (Date.now() - startTime) / 1000 / 60 / 60; // in hours
//       const weight = 70; // Assume 70kg (Make this dynamic for user input)
      
//       const MET_values = { walking: 3.8, running: 8.0, cycling: 6.8 };   //Walking (~5 km/h): 3.8, Running (~8 km/h): 8.0, Cycling (~16 km/h): 6.8
      
//       setCaloriesBurned(MET_values[activityType] * weight * timeTaken);
//     }
//   }, [isTracking]);

 

//   const handleSaveActivity = async () => {
//     try {
//       await axios.post("http://localhost:4000/api/gps", {
//         userId,
//         activityType,
//         distance,
//         caloriesBurned,
//         duration: (Date.now() - startTime) / 1000 / 60,
//         timestamps: coordinates,
//       });
//       alert("Activity saved!");
//     } catch (error) {
//       console.error("Error saving activity:", error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="p-8 bg-black  mockup-phone border-primary   w-full h-auto text-white rounded-lg max-w-lg  shadow-2xl"
//     >
//       <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
//         <MdLocationOn className="text-red-500" /> GPS Activity Tracker
//       </h2>
//       <div className="flex flex-col space-y-3 mt-4">
//         <label className="text-sm font-semibold">Select Activity Type:</label>
//         <select
//           className="p-3 bg-gray-800 text-white rounded-md border border-gray-700"
//           value={activityType}
//           onChange={(e) => setActivityType(e.target.value)}
//         >
//           <option value="walking">🚶 Walking</option>
//           <option value="running">🏃 Running</option>
//           <option value="cycling">🚴 Cycling</option>
//         </select>
//       </div>

//       <div className="mt-6 space-y-2 text-lg">
//         <p>📏 Distance: <b>{(distance / 1000).toFixed(2)} km</b></p>
//         <p>🔥 Calories Burned: <b>{caloriesBurned.toFixed(2)} kcal</b></p>
//       </div>

//       <div className="flex justify-between mt-6 space-x-2">
//         <button
//           onClick={() => setIsTracking((prev) => !prev)}
//           className={`p-3 w-full rounded-lg text-white font-bold transition-all duration-300 shadow-md ${
//             isTracking ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {isTracking ? "Stop Tracking" : "Start Tracking"}
//         </button>
//         {!isTracking && distance > 0 && (
//           <button
//             onClick={handleSaveActivity}
//             className="p-3 bg-green-600 hover:bg-green-700 rounded-lg w-full text-white font-bold transition-all duration-300 shadow-md"
//           >
//             Save Activity
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default GPSTracker;



















import React, { useState, useEffect } from "react";
import { getDistance } from "geolib";
import axios from "axios";
import { motion } from "framer-motion";
import { FaWalking, FaRunning, FaBicycle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const GPSTracker = ({ userId }) => {
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [activityType, setActivityType] = useState("running");
  const [weight, setWeight] = useState(70); // Default weight is 70kg, user can change it

  useEffect(() => {
    let watchId;
    if (isTracking) {
      setStartTime(Date.now());
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates((prev) => {
            if (prev.length > 0) {
              const lastPoint = prev[prev.length - 1];
              const newDistance = getDistance(lastPoint, newPoint);
              setDistance((d) => d + newDistance);
            }
            return [...prev, newPoint];
          });
        },
        (error) => console.error("GPS Error:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      navigator.geolocation.clearWatch(watchId);
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, [isTracking]);

  useEffect(() => {
    if (!isTracking && startTime) {
      const timeTaken = (Date.now() - startTime) / 1000 / 60 / 60; // Convert ms to hours
      const MET_values = { walking: 3.8, running: 8.0, cycling: 6.8 };
      setCaloriesBurned(MET_values[activityType] * weight * timeTaken);
    }
  }, [isTracking, weight]);


  const handleWeightChange = (e) => {
    const newWeight = Number(e.target.value);
    if (newWeight > 0) {
      setWeight(newWeight);
    }
  };


  const handleSaveActivity = async () => {
    try {
      await axios.post("http://localhost:4000/api/gps", {
        userId,
        activityType,
        distance,
        caloriesBurned,
        duration: (Date.now() - startTime) / 1000 / 60,
        timestamps: coordinates,
      });
      alert("Activity saved!");
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <>
    <div className="mockup-phone min-h-screen bg-gray-900 flex items-center justify-center border-primary ">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-gray-800 w-full max-w-md  shadow-lg   text-white rounded-lg  "
    >
      <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
        <MdLocationOn className="text-red-500" /> GPS Activity Tracker
      </h2>
      <div className="flex flex-col space-y-3 mt-4">
        <label className="text-sm mt-3 font-semibold">Select Activity Type:</label>
        <select
          className="p-3 bg-gray-700 text-white rounded-md border border-gray-700"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
        >
          <option value="walking">🚶 Walking</option>
          <option value="running">🏃 Running</option>
          <option value="cycling">🚴 Cycling</option>
        </select>
      </div>
      <div className="flex flex-col space-y-3 mt-4">
        <label className="text-sm mt-3 font-semibold">Enter Weight (kg):</label>
        <input
          type="number"
          className="p-3 bg-gray-700 text-white rounded-md border border-gray-700 w-full"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <div className="mt-7 space-y-2 text-lg">
        <p>📏 Distance: <b>{(distance / 1000).toFixed(2)} km</b></p>
        <p>🔥 Calories Burned: <b>{caloriesBurned.toFixed(2)} kcal</b></p>
      </div>
      <div className="flex justify-between mt-8 space-x-2">
        <button
          onClick={() => setIsTracking((prev) => !prev)}
          className={`p-3 w-full rounded-lg text-white font-bold transition-all duration-300 shadow-md ${
            isTracking ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>
        {!isTracking && distance > 0 && (
          <button
            onClick={handleSaveActivity}
            className="p-3 bg-green-600 hover:bg-green-700 rounded-lg w-full text-white font-bold transition-all duration-300 shadow-md"
          >
            Save Activity
          </button>
        )}
      </div>
    </motion.div>
    </div>
    </>

  );
};

export default GPSTracker;
