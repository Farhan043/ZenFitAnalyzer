// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Bmi from "./Bmi";
// import WaterIntake from "./WaterIntake";
// import Sleep from "../SleepComponent/Sleep";
// // import ActivityStatus from "./ActivityStatus";
// import WorkoutProgress from "./WorkoutProgress";
// import FullBodyWorkout from "./FullBodyWorkout";
// import LowerBodyWorkout from "./LowerBodyWorkout";
// import AbsWorkout from "./AbsWorkout";
// import TodayTarget from "./TodayTarget";
// // import Settings from "../../Pages/Theme/Settings";
// import Music from "./Music";

// const Navbar = () => {
//   const navigate = useNavigate();



//   const handleLogout = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       })
//       .catch((error) => {
//         console.error('Logout failed:', error);
//       });
//   };

//   return (
//     <div className="p-3 bg-black bg-opacity-0 min-h-screen">
//       <div className="flex justify-between items-center p-3 h-14 ">

//         {/* <Settings/> */}

//         <div className="flex gap-4">
//           <Link to='/notification' className="p-2 bg-black bg-opacity-50 rounded-full ">
//             <i className="ri-notification-3-line text-2xl text-blue-400"></i>
//           </Link>

//           <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full ">
//             <i className="ri-logout-box-line text-2xl text-blue-400"></i>
//           </button>
//         </div>
//       </div>
//       <Bmi />
//       <br />
//       <TodayTarget/>
//       <br />
//       <WaterIntake />
//       <br />
//       <Music/>
//       <Sleep />
//       <WorkoutProgress />
//       <FullBodyWorkout />
//       <LowerBodyWorkout />
//       <AbsWorkout />
//       {/* <ActivityStatus /> */}
//     </div>
//   );
// };

// export default Navbar;


















import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Bmi from "./Bmi";
import WaterIntake from "./WaterIntake";
import TodayTarget from "./TodayTarget";
import Music from "../../Components/Home/Music" ;
import Sleep from "../SleepComponent/Sleep";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

     const handleLogout = () => {
     const token = localStorage.getItem('token');
     axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((response) => {
         if (response.status === 200) {
           localStorage.removeItem('token');
           navigate('/login');
         }
       })
       .catch((error) => {
         console.error('Logout failed:', error);
       });
   };
  return (
    <>
    <div className="p-3 bg-black  min-h-screen">
    <div className="bg-black text-white p-5 shadow-blue-500 shadow-md  ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl flex items-center gap-2  font-bold">
          <img src="/public/logo.gif" alt="" />
          <span className="text-blue-400">ZenFit</span> AnalyZer
        </div>

        {/* Desktop Menu */}

        <div className="hidden md:flex space-x-6 text-lg">
          <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
          <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
          <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
          <Link to='/profile' className="hover:text-blue-400 transition">Profile</Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
        <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full ">
             <i className="ri-logout-box-line text-2xl text-blue-400"></i>
           </button>
        </div>

        
          

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className=" bg-slate-900 md:hidden flex flex-col space-y-4 border border-blue-400 text-white mt-3 p-4 absolute top-15 left-50 right-10 shadow-md">
            <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
          <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
          <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
          <Link to='/profile' className="hover:text-blue-400 transition">Profile</Link>
          <button onClick={handleLogout} className="p-2 bg-black bg-opacity-0 rounded-full text-blue-400 text-xl ">
          <i className="ri-logout-box-line text-2xl text-blue-400"></i>
           </button>
        </div>
      )}
    </div>

          <Bmi />

       
        <div className='flex flex-col md:flex-row mt-5   min-h-screen  text-white px-4 gap-5'>
        {/* <div className="mockup-phone border-primary mt-5 flex gap-5 "> */}
      {/* Water Intake Section */}
      <div className='w-full md:w-1/2 flex md:flex-row  '>
        <WaterIntake />
      </div>
      
      {/* Music Section */}
      <div className='w-full md:w-1/2 flex md:flex-row '>
        <Music />
      </div>
    </div>
    <TodayTarget/>
    </div>

        <Sleep/> 

    </>
  );
};

export default Navbar;
