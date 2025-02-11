// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// const LastNightSleep = () => {
//   const [lastNightSleep, setLastNightSleep] = useState(null);
//   const [lastNightData, setLastNightData] = useState([]);

//   // Fetch Sleep Data
//   const fetchLastNightSleep = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/users/sleep-data`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const sleepData = response.data;

//       if (sleepData.length > 0) {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const yesterdayDateString = yesterday.toISOString().split("T")[0];

//         const lastNight = sleepData.find(
//           (entry) => entry.date === yesterdayDateString
//         );

//         if (lastNight) {
//           setLastNightSleep(lastNight);
//           // Format data for the chart
//           setLastNightData([lastNight]);
//         } else {
//           setLastNightSleep(null);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching sleep data:", error);
//     }
//   };

//   // Load sleep data on component mount
//   useEffect(() => {
//     fetchLastNightSleep();
//   }, []);

//   return (
//     <div className="flex justify-center mt-7 mb-8 ml-3">
//       {lastNightSleep ? (
//         <div className="bg-blue-200/70 rounded-3xl w-full h-full p-6 relative overflow-hidden">
//           <div className="relative z-10">
//             <h2 className="text-lg font-medium text-blue-900/80">Last Night Sleep</h2>
//             <p className="text-3xl font-semibold text-blue-900 mt-2">
//               {lastNightSleep.sleepHours}h {Math.round((lastNightSleep.sleepHours % 1) * 60)}m
//             </p>
//           </div>
          
//           <div className="absolute inset-0 z-0">
//             <ResponsiveContainer className={`w-96 h-[20vh]`}>
//               <AreaChart
//                 data={lastNightData}
//                 margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
//               >
//                 <defs>
//                   <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#ffffff" stopOpacity={0.1} />
//                   </linearGradient>
//                 </defs>
//                 <Area
//                   type="natural"
//                   dataKey="sleepHours"
//                   stroke="#ffffff"
//                   strokeWidth={2}
//                   fillOpacity={1}
//                   fill="url(#colorSleep)"
//                   name="Hours Slept"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       ) : (
//         <div className="text-gray-200 text-center">
//           No sleep data available for last night
//         </div>
//       )}
//     </div>
//   );
// };

// export default LastNightSleep;







import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const LastNightSleep = () => {
  const [lastNightSleep, setLastNightSleep] = useState(null);
  const [lastNightData, setLastNightData] = useState([]);
  const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
  const [alarmTimes, setAlarmTimes] = useState(
    JSON.parse(localStorage.getItem("alarmTimes")) || []
  );

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
          setLastNightData([lastNight]);
        } else {
          setLastNightSleep(null);
        }
      }
    } catch (error) {
      console.error("Error fetching sleep data:", error);
    }
  };

  useEffect(() => {
    fetchLastNightSleep();
  }, []);

  return (
    <div className="flex flex-col items-center mt-7 mb-8 ml-3">
      {lastNightSleep ? (
        <div className="bg-blue-200/70 rounded-3xl w-full h-full p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-medium text-blue-900/80">Last Night Sleep</h2>
            <p className="text-3xl font-semibold text-blue-900 mt-2">
              {lastNightSleep.sleepHours}h {Math.round((lastNightSleep.sleepHours % 1) * 60)}m
            </p>
            <p className="text-lg text-blue-900 mt-2">Bedtime: {bedTime || "Not set"}</p>
            <p className="text-lg text-blue-900 mt-1">Alarms:</p>
            <ul className="text-blue-900">
              {alarmTimes.length > 0 ? (
                alarmTimes.map((time, index) => <li key={index}>{time}</li>)
              ) : (
                <li>No alarms set</li>
              )}
            </ul>
          </div>
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
                  type="natural"
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
        <div className="text-gray-200 text-center">
          No sleep data available for last night
        </div>
      )}
    </div>
  );
};

export default LastNightSleep;
