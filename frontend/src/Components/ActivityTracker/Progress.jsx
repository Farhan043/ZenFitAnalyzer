// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
// import axios from "axios";
// import { div } from "motion/react-client";

// const Progress = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake-weekly`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
    
//         const weeklyData = response.data.map((entry) => ({
//           day: entry.day, // e.g., "Sun", "Mon", etc.
//           total: entry.total, // Total water intake for the day
//         }));
//         setData(weeklyData);
//       } catch (error) {
//         console.error("Error fetching weekly water intake data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);


//   return (
//     <div className="p-4 glass rounded-xl">
//       <h2 className="text-xl font-semibold mb-4">Weekly Water Intake</h2>
//              {loading ? (
//        <p>Loading...</p>
//       ) : (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="total" fill="#8884d8" barSize={30} radius={[10, 10, 0, 0]} />
//         </BarChart>
//             </ResponsiveContainer>
//       )}
//     </div>
//   );

// };

// export default Progress;







// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Progress = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake-weekly`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const weeklyData = response.data.map((entry) => ({
//           day: entry.day, // e.g., "Sun", "Mon", etc.
//           total: parseFloat(entry.total ),
//         }));
//         setData(weeklyData);
//       } catch (error) {
//         console.error("Error fetching weekly water intake data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl text-white shadow-lg max-w-lg mx-auto">
//       <h2 className="text-3xl font-semibold text-center mb-6">Weekly Water Intake</h2>

//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {data.map((entry, index) => (
//             <div key={index} className="flex  flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-medium">{entry.day}</span>
//                 <span className="text-sm">{entry.total}L / 4L</span>
//               </div>
//               <div className="relative w-full h-4 rounded-full glass">
//                 <div
//                   className="absolute top-0 left-0 h-full rounded-full"
//                   style={{
//                     width: `${Math.min((entry.total / 4) * 100, 100)}%`, // Ensure width does not exceed 100%
//                     background: "linear-gradient(to right, #4f46e5, #8b5cf6)",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Progress;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next'; 
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';

const Progress = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
  const [translatedTitles, setTranslatedTitles] = useState({});
  
   useEffect(() => {
      const updateTranslations = async () => {
        const translations = {
          activityProgress: await translateText('Activity Progress', i18n.language),
        };
        setTranslatedTitles(translations);
      };
  
      updateTranslations();
    }, [i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/water-intake-weekly`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const weeklyData = response.data.map((entry) => ({
          day: entry.day, // e.g., "Sun", "Mon", etc.
          total: parseFloat(entry.total ), 
        }));
        setData(weeklyData);
      } catch (error) {
        console.error("Error fetching weekly water intake data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 mt-8 mx-5 mockup-phone border-primary bg-black bg-opacity-50 rounded-lg ">
      <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">{translatedTitles.activityProgress}</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
          <div className="flex justify-center   items-end gap-4 w-full">           
            {data.map((entry, index) => (
              <div key={index} className="flex flex-col items-center">
              <span className="text-lg text-blue-400">{entry.total}L</span>
              <div               
                className="w-7 glass rounded-full relative flex items-end"
                style={{
                  height: "150px",
                }}
              >
                
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  style={{
                    height: `${Math.min((entry.total / 4) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-lg mt-2 text-blue-400">{entry.day}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;







