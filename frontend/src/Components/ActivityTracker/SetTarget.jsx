
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next'; 
// import LanguageModal from '../../Pages/Translater/LanguageModal';
// import { translateText } from '../../Pages/Translater/118n';

// export default function SetTarget() {
//   const [showModal, setShowModal] = useState(false);
//   const [inputWaterIntake, setInputWaterIntake] = useState("");
//   const [inputFootSteps, setInputFootSteps] = useState("");
//   const [waterIntake, setWaterIntake] = useState("");
//   const [footSteps, setFootSteps] = useState("");
//   const navigate = useNavigate();
//    const { t, i18n } = useTranslation();
//   const [translatedTitles, setTranslatedTitles] = useState({});
  

//     useEffect(() => {
//       const updateTranslations = async () => {
//         const translations = {
//           activityTracker: await translateText('Activity Tracker', i18n.language),
//           todayTarget: await translateText('Today Target', i18n.language),
//           water: await translateText('Water', i18n.language),
//           footSteps: await translateText('Foot Steps', i18n.language),
//           save: await translateText('Save', i18n.language),
//           cancel: await translateText('Cancel', i18n.language),
//           waterIntake: await translateText('Water Intake', i18n.language),
//           setYourTarget: await translateText('Set Your Targets', i18n.language),
//         };
//         setTranslatedTitles(translations);
//       };
  
//       updateTranslations();
//     }, [i18n.language]);

//   useEffect(() => {
//     const fetchTargetData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:4000/users/getTarget`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const targetData = response.data;
//         setWaterIntake(targetData.waterIntake);
//         setFootSteps(targetData.footSteps);
//       } catch (error) {
//         console.error("Error fetching target data:", error);
//       }
//     };

//     // Clear the footSteps state when the component mounts
//     // setFootSteps("");
//     fetchTargetData();
//   }, []);

//   const handleWaterChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     if (value > 4) value = 4; // Limit water intake to 4L
//     setInputWaterIntake(value);
//   };

//   const handleFootStepsChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     if(value > 10000) value = 10000; //Limit foot steps to 10000
//     setInputFootSteps(value);
//   };

//   const handleSubmit = async () => {
//     if (!inputWaterIntake || !inputFootSteps) {
//       toast.error("Please set both water intake and footstep targets before saving.", {
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

//     const today = new Date().toDateString();
//     const targetData = {
//       date: today,
//       waterIntake: inputWaterIntake,
//       footSteps: inputFootSteps,
//     };

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(`http://localhost:4000/users/setTarget`, targetData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setWaterIntake(inputWaterIntake);
//       setFootSteps(inputFootSteps);
//       setInputWaterIntake("");
//       setInputFootSteps("");
//       setShowModal(false);

//       toast.success("Targets successfully set!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } catch (error) {
//       console.error("Error setting targets:", error);
//       toast.error("Failed to set targets. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   const handleFootSubmit = () => {
//     setInputFootSteps("");
//     setInputWaterIntake("");
//     setShowModal(false);
//   };

//   return (
//     <>
//       <div className='rounded flex items-center py-4 px-3'>
//         <i className="ri-arrow-left-s-line text-4xl" onClick={() => navigate('/home')}></i>
//         <div className="text-center w-full font-bold text-3xl">
//           <h1>{translatedTitles.activityTracker}</h1>
//           </div>
//       </div>
//       <div className="flex justify-center p-4 mt-5 min-w-96 items-center">
//         <div className="p-6 bg-black bg-opacity-50 w-full rounded-lg">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl text-blue-400 font-semibold">{translatedTitles.todayTarget}</h2>
//             <button className="text-4xl font-bold text-blue-500" onClick={() => setShowModal(true)}>+</button>
//           </div>
//           <div className="grid grid-cols-2 gap-8 mt-4">
//             <div className="flex items-center space-x-2">
//               <span><i className="ri-goblet-2-line text-blue-400 text-4xl"></i></span>
//               <p className="text-2xl font-semibold text-blue-400">
//                 {waterIntake || ""} <br />
//                 <span className="text-lg text-blue-400">{translatedTitles.water} (L)</span>
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span><i className="ri-footprint-line text-4xl font-semibold text-blue-400"></i></span>
//               <p className={`text-2xl font-semibold text-blue-400 ${footSteps && footSteps.length > 3 ? 'w-[6rem]' : ''}`}>
//                 {footSteps || ""} <br />
//                 <span className="text-lg text-blue-400">{translatedTitles.footSteps}</span>
//               </p>
//             </div>
//           </div>

//           {/* Modal */}
//           {showModal && (
//             <div className="flex justify-center  items-center">
//               <div className="p-6 rounded-lg ">
//                 <h3 className="text-2xl font-semibold text-blue-400 mb-4">{translatedTitles.setYourTarget}</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="font-medium text-blue-400">{translatedTitles.waterIntake} (L):</label>
//                     <input
//                       type="number"
//                       value={inputWaterIntake}
//                       onChange={handleWaterChange}
//                       className="w-full p-2 border rounded-lg"
//                       placeholder="Enter up to 4L"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-blue-400 font-medium">{translatedTitles.footSteps}:</label>
//                     <input
//                       type="number"
//                       value={inputFootSteps}
//                       onChange={handleFootStepsChange}
//                       className="w-full p-2 border rounded-lg"
//                       placeholder="Enter step target"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-center mt-4 space-x-7">
//                   <button onClick={handleFootSubmit} className="px-4 py-2 border-2 border-red-400 rounded-lg">{translatedTitles.cancel }</button>
//                   <button onClick={handleSubmit} className="px-6 py-2 border-2 border-blue-400 text-white rounded-lg">{translatedTitles.save}</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }





















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; 
import LanguageModal from '../../Pages/Translater/LanguageModal';
import { translateText } from '../../Pages/Translater/118n';

export default function SetTarget() {
  const [showModal, setShowModal] = useState(false);
  const [inputWaterIntake, setInputWaterIntake] = useState("");
  const [inputFootSteps, setInputFootSteps] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [footSteps, setFootSteps] = useState("");
  const navigate = useNavigate();

  

    

  useEffect(() => {
    const fetchTargetData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/users/getTarget`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const targetData = response.data;
        setWaterIntake(targetData.waterIntake);
        setFootSteps(targetData.footSteps);
      } catch (error) {
        console.error("Error fetching target data:", error);
      }
    };

    // Clear the footSteps state when the component mounts
    // setFootSteps("");
    fetchTargetData();
  }, []);

  const handleWaterChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = ""; // Prevent negative or zero values
    if (value > 4) value = 4; // Limit water intake to 4L
    setInputWaterIntake(value);
  };

  const handleFootStepsChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = ""; // Prevent negative or zero values
    if(value > 10000) value = 10000; //Limit foot steps to 10000
    setInputFootSteps(value);
  };

  const handleSubmit = async () => {
    if (!inputWaterIntake || !inputFootSteps) {
      toast.error("Please set both water intake and footstep targets before saving.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const today = new Date().toDateString();
    const targetData = {
      date: today,
      waterIntake: inputWaterIntake,
      footSteps: inputFootSteps,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:4000/users/setTarget`, targetData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWaterIntake(inputWaterIntake);
      setFootSteps(inputFootSteps);
      setInputWaterIntake("");
      setInputFootSteps("");
      setShowModal(false);

      toast.success("Targets successfully set!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error setting targets:", error);
      toast.error("Failed to set targets. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleFootSubmit = () => {
    setInputFootSteps("");
    setInputWaterIntake("");
    setShowModal(false);
  };

  return (
    <>
      <div className='rounded  flex items-center py-4 px-3'>
        <i className="ri-arrow-left-s-line text-4xl" onClick={() => navigate('/home')}></i>
        <div className="text-center w-full font-bold text-3xl">
          <h1>ActivityTracker</h1>
          </div>
      </div>
      <div className="flex mockup-phone border-primary justify-center p-4 mt-5 min-w-96 items-center">
      <div className="mockup-phone-camera"></div>
        <div className="p-6 bg-black bg-opacity-50  w-full rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-blue-400 font-semibold">Today Target</h2>
            <button className="text-4xl font-bold text-blue-500" onClick={() => setShowModal(true)}>+</button>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="flex items-center space-x-2">
              <span><i className="ri-goblet-2-line text-blue-400 text-4xl"></i></span>
              <p className="text-2xl font-semibold text-blue-400">
                {waterIntake || ""} <br />
                <span className="text-lg text-blue-400">Water (L)</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span><i className="ri-footprint-line text-4xl font-semibold text-blue-400"></i></span>
              <p className={`text-2xl font-semibold text-blue-400 ${footSteps && footSteps.length > 3 ? 'w-[6rem]' : ''}`}>
                {footSteps || ""} <br />
                <span className="text-lg text-blue-400">FootSteps</span>
              </p>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="flex items-center justify-center  ">
              <div className="p-6 rounded-lg ">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">SetYourTarget</h3>
                <div className="space-y-4 ">
                  <div>
                    <label className="font-medium text-blue-400">WaterIntake (L):</label>
                    <input
                      type="number"
                      value={inputWaterIntake}
                      onChange={handleWaterChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter up to 4L"
                    />
                  </div>
                  <div>
                    <label className="text-blue-400 font-medium">FootSteps:</label>
                    <input
                      type="number"
                      value={inputFootSteps}
                      onChange={handleFootStepsChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter step target"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-7">
                  <button onClick={handleFootSubmit} className="px-4 py-2 border-2 border-red-400 rounded-lg">cancel</button>
                  <button onClick={handleSubmit} className="px-6 py-2 border-2 border-blue-400 text-white rounded-lg">save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}