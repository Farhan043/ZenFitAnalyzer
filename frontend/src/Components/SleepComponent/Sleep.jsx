// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area
// } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// const Sleep = () => {
//   const [sleepData, setSleepData] = useState([]);
//   const [sleepTime, setSleepTime] = useState(localStorage.getItem('sleepTime') || '22:00');
//   const [wakeTime, setWakeTime] = useState(localStorage.getItem('wakeTime') || '06:00');
//   const navigate = useNavigate();

//   // Fetch Sleep Data from the API
//   const fetchSleepData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/sleep-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSleepData(response.data);
//     } catch (error) {
//       console.error('Error fetching sleep data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSleepData();
//   }, []);

//   const calculateSleepDuration = () => {
//     const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
//     const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
//     let totalMinutes = (wakeHours * 60 + wakeMinutes) - (sleepHours * 60 + sleepMinutes);
//     if (totalMinutes < 0) totalMinutes += 1440;
//     return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
//   };

//   const handleSleepTimeChange = (event) => {
//     setSleepTime(event.target.value);
//     localStorage.setItem('sleepTime', event.target.value);
//   };

//   const handleWakeTimeChange = (event) => {
//     setWakeTime(event.target.value);
//     localStorage.setItem('wakeTime', event.target.value);
//   };

//   return (
//     <div className='glass p-6 rounded-lg cursor-pointer'>
//       <div onClick={() => navigate('/sleeptracker')} className="glass p-6 rounded-lg cursor-pointer">
//         <h2 className="text-black text-2xl font-bold mb-2">Sleep Schedule</h2>
//         <div className="mb-4 flex flex-col items-center gap-2">
//           <label className="text-lg font-semibold text-gray-700">Sleep Time</label>
//           <input
//             type="time"
//             value={sleepTime}
//             onChange={handleSleepTimeChange}
//             className="text-xl text-blue-500 font-semibold bg-transparent border-none outline-none w-full text-center"
//           />
//         </div>
//         <div className="mb-4 flex flex-col items-center gap-2">
//           <label className="text-lg font-semibold text-gray-700">Wake Time</label>
//           <input
//             type="time"
//             value={wakeTime}
//             onChange={handleWakeTimeChange}
//             className="text-xl text-blue-500 font-semibold bg-transparent border-none outline-none w-full text-center"
//           />
//         </div>
//         <div className="text-3xl text-blue-500 font-semibold mb-4">
//           {calculateSleepDuration()}
//         </div>
//         <div className="h-[100px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={sleepData.length ? sleepData : [
//                 { value: 4 },
//                 { value: 6 },
//                 { value: 5 },
//                 { value: 8 },
//                 { value: 7 },
//                 { value: 9 },
//                 { value: 8 },
//               ]}
//               margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
//             >
//               <defs>
//                 <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.1} />
//                 </linearGradient>
//               </defs>
//               <Area
//                 type="natural"
//                 dataKey="value"
//                 stroke="#60A5FA"
//                 strokeWidth={2}
//                 fill="url(#sleepGradient)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sleep;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Sleep = () => {
//   const [hoursOfSleep, setHoursOfSleep] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const bedTime = localStorage.getItem('bedTime');
//     const alarmTime = localStorage.getItem('alarmTime');
//     if (bedTime && alarmTime) {
//       calculateHoursOfSleep(bedTime, alarmTime);
//     }
//   }, []);

//   const calculateHoursOfSleep = (bedTime, alarmTime) => {
//     const [bedHour, bedMin] = bedTime.split(':').map(Number);
//     const [alarmHour, alarmMin] = alarmTime.split(':').map(Number);

//     let totalMinutes = (alarmHour * 60 + alarmMin) - (bedHour * 60 + bedMin);
//     if (totalMinutes < 0) totalMinutes += 1440;

//     setHoursOfSleep(`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`);
//   };

//   return (
//     <div  onClick={() => navigate('/sleeptracker')} className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
//       <div className="glass p-6 rounded-lg shadow-lg w-full max-w-md text-center">
//         <div className="text-3xl font-semibold text-blue-600">
//           {hoursOfSleep}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sleep;








import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Sleep = () => {
  const [hoursOfSleep, setHoursOfSleep] = useState('');
  const [sleepData, setSleepData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bedTime = localStorage.getItem('bedTime');
    const alarmTime = localStorage.getItem('alarmTime');
    if (bedTime && alarmTime) {
      calculateHoursOfSleep(bedTime, alarmTime);
    }
  }, []);

  const calculateHoursOfSleep = (bedTime, alarmTime) => {
    const [bedHour, bedMin] = bedTime.split(':').map(Number);
    const [alarmHour, alarmMin] = alarmTime.split(':').map(Number);

    let totalMinutes = (alarmHour * 60 + alarmMin) - (bedHour * 60 + bedMin);
    if (totalMinutes < 0) totalMinutes += 1440;

    const sleepDuration = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
    setHoursOfSleep(sleepDuration);
    setSleepData([...sleepData, { name: 'Today', hours: totalMinutes / 60 }]);
  };

  return (
    <div onClick={() => navigate('/sleeptracker')} className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-indigo-900 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sleep Tracker</h2>
        <div className="text-5xl font-semibold text-indigo-600 mb-6">
          {hoursOfSleep || "--:--"}
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sleepData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" stroke="#4F46E5" />
              <YAxis stroke="#4F46E5" domain={[0, 12]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hours" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Sleep;