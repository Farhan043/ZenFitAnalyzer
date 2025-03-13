

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function ActivityTracker() {
//   const [showModal, setShowModal] = useState(false);
// const [inputWaterIntake, setInputWaterIntake] = useState("");
//   const [inputFootSteps, setInputFootSteps] = useState("");
// const [waterIntake, setWaterIntake] = useState(() => {
//   const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//   const today = new Date().toDateString();
//   return savedData && savedData.date === today ? savedData.waterIntake : "";
// });
// const [footSteps, setFootSteps] = useState(() => {
//   const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//   const today = new Date().toDateString();
//   return savedData && savedData.date === today ? savedData.footSteps : "";
// });
//   const navigate = useNavigate();

// useEffect(() => {
//   const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//   const today = new Date().toDateString();
//   if (!savedData || savedData.date !== today) {
//     localStorage.removeItem("todayTarget");
//   }
// }, []);

// const handleWaterChange = (e) => {
//   let value = Number(e.target.value);
//   if (value < 1) value = ""; // Prevent negative or zero values
//   if (value > 4) value = 4; // Limit water intake to 4L
//   setInputWaterIntake(value);
// };

// const handleFootStepsChange = (e) => {
//   let value = Number(e.target.value);
//   if (value < 1) value = ""; // Prevent negative or zero values
//   if(value > 10000) value = 10000; //Limit foot steps to 10000
//   setInputFootSteps(value);
// };

//   const handleSubmit = () => {
//     if (!inputWaterIntake || !inputFootSteps) {
//     toast.error("Please set both water intake and footstep targets before saving.", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//     });
//     return;
//   };
//     const today = new Date().toDateString();
//     const targetData = {
//       date: today,
//       waterIntake: inputWaterIntake,
//       footSteps: inputFootSteps,
//     };
//     localStorage.setItem("todayTarget", JSON.stringify(targetData));
//     setWaterIntake(inputWaterIntake);
//     setFootSteps(inputFootSteps);
//     setInputWaterIntake("");
//     setInputFootSteps("");
//     setShowModal(false);
  
//      toast.success("Targets successfully set!", {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "dark",
//             });
//   };

//   const handleFootSubmit = () => {
//     setInputFootSteps("");
//     setInputWaterIntake("");
//     setShowModal(false);
//   };


//   return (
//     <>
//     <div className=' rounded flex items-center py-4 px-3 '>
//          <i className="ri-arrow-left-s-line text-4xl"
//          onClick={()=> navigate('/home')}></i>
//          <h1 className='text-2xl ml-24'>Activity Tracker</h1>
//       </div>
//       <div className="flex justify-center mt-5 items-center">
//         <div className="p-6 glass w-[370px] rounded-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl text-blue-400 font-semibold">Today Target</h2>
//         <button
//           className="text-4xl font-bold text-blue-500"
//           onClick={() => setShowModal(true)}
//         >
//           +
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-8 mt-4">
//         <div className="flex items-center space-x-2">
//           <span><i className="ri-goblet-2-line text-blue-400 text-4xl"></i></span>
//           <p className="text-2xl  font-semibold text-blue-400">
//                 {waterIntake || "" }  <br />
//             <span className="text-lg text-blue-400">Water (L)</span>
//           </p>
//         </div>
//         <div className="flex items-center  space-x-2">
//           <span><i className="ri-footprint-line text-4xl font-semibold text-blue-400"></i></span>
//           <p className={`text-2xl font-semibold text-blue-400 ${footSteps && footSteps.length > 3 ? 'w-[6rem]' : ''}`}>
//             {footSteps || "" }  <br />
//             <span className="text-lg text-blue-400">Foot Steps</span>
//           </p>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className=" flex justify-center w-[300px] h-[340px] items-center">
//           <div className=" p-6 rounded-lg ">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-4">Set Your Targets</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="font-medium text-blue-400">Water Intake (L):</label>
//                 <input
//                   type="number"
//                   value={inputWaterIntake}
//                   onChange={handleWaterChange}
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Enter up to 4L"
//                 />
//               </div>
//               <div>
//                 <label className="text-blue-400 font-medium">Foot Steps:</label>
//                 <input
//                   type="number"
//                   value={inputFootSteps}
//                   onChange={handleFootStepsChange}
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Enter step target"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-center mt-4 space-x-7">
//               <button
//                 onClick={handleFootSubmit}
//                 className="px-4 py-2 border-2 border-red-400 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-6 py-2 border-2 border-blue-400 text-white rounded-lg"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//         </div>
//       </div>
//       <ToastContainer />
//     </>
      
//   );
// }


import React, { useEffect, useState } from 'react'
import SetTarget from '../Components/ActivityTracker/SetTarget'
import Progress from '../Components/ActivityTracker/Progress'
import Latest from '../Components/ActivityTracker/Latest';

const ActivityTracker = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <>
    <div className='flex flex-col gap-4 mockup-phone border-primary'>
    <div className="mockup-phone-camera"></div>
    <div className="mockup-phone-display">

      <SetTarget />
      <Progress/>
      <Latest/>
      </div>
    </div>

    </>
  )
}
export default ActivityTracker



// import React, { useState, useEffect } from "react";

// export default function TodayTarget() {
//   const [showModal, setShowModal] = useState(false);
//   const [inputWaterIntake, setInputWaterIntake] = useState("");
//   const [inputFootSteps, setInputFootSteps] = useState("");
//   const [waterIntake, setWaterIntake] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//     const today = new Date().toDateString();
//     return savedData && savedData.date === today ? savedData.waterIntake : "";
//   });
//   const [footSteps, setFootSteps] = useState(() => {
//     const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//     const today = new Date().toDateString();
//     return savedData && savedData.date === today ? savedData.footSteps : "";
//   });

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("todayTarget"));
//     const today = new Date().toDateString();
//     if (!savedData || savedData.date !== today) {
//       localStorage.removeItem("todayTarget");
//     }
//   }, []);

//   const handleWaterChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     if (value > 4) value = 4; // Limit water intake to 4L
//     setInputWaterIntake(value);
//   };

//   const handleFootStepsChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = "";
//     setInputFootSteps(value);
//   };

//   const handleSubmit = () => {
//     const today = new Date().toDateString();
//     const targetData = {
//       date: today,
//       waterIntake: inputWaterIntake,
//       footSteps: inputFootSteps,
//     };
//     localStorage.setItem("todayTarget", JSON.stringify(targetData));
//     setWaterIntake(inputWaterIntake);
//     setFootSteps(inputFootSteps);
//     setInputWaterIntake("");
//     setInputFootSteps("");
//     setShowModal(false);
//     alert(`Targets set: ${inputWaterIntake}L water, ${inputFootSteps} steps`);
//   };

//   return (
//     <div className="p-4 bg-blue-100 rounded-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Today Target</h2>
//         <button
//           className="text-xl font-bold text-blue-500"
//           onClick={() => setShowModal(true)}
//         >
//           +
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <div className="flex items-center space-x-2">
//           <span>🚰</span>
//           <p>
//             {waterIntake || ""}L <br />
//             <span className="text-sm text-gray-500">Water Intake</span>
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span>👟</span>
//           <p>
//             {footSteps || ""} <br />
//             <span className="text-sm text-gray-500">Foot Steps</span>
//           </p>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Set Your Targets</h3>
//             <div className="space-y-4">
//               <div>
//                 <label className="block font-medium">Water Intake (L):</label>
//                 <input
//                   type="number"
//                   value={inputWaterIntake}
//                   onChange={handleWaterChange}
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Enter up to 4L"
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium">Foot Steps:</label>
//                 <input
//                   type="number"
//                   value={inputFootSteps}
//                   onChange={handleFootStepsChange}
//                   className="w-full p-2 border rounded-lg"
//                   placeholder="Enter step target"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end mt-4 space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
