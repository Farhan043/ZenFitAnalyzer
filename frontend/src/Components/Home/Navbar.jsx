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


















// import { useState} from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Bmi from "./Bmi";
// import WaterIntake from "./WaterIntake";
// import TodayTarget from "./TodayTarget";
// import Music from "../../Components/Home/Music" ;
// import Sleep from "../SleepComponent/Sleep";



// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();


 

//      const handleLogout = () => {
//      const token = localStorage.getItem('token');
//      axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
//        headers: {
//          Authorization: `Bearer ${token}`,
//        },
//      })
//        .then((response) => {
//          if (response.status === 200) {
//            localStorage.removeItem('token');
//            navigate('/login');
//          }
//        })
//        .catch((error) => {
//          console.error('Logout failed:', error);
//        });
//    };
//   return (
//     <>
//     <div className="p-3 bg-black  min-h-screen">
//     <div className="bg-black text-white p-5 shadow-blue-500 shadow-md  ">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl flex items-center gap-2  font-bold">
//           <img src="/public/logo.gif" alt="" />
//           <span className="text-blue-400">ZenFit</span> AnalyZer
//         </div>

//         {/* Desktop Menu */}

//         <div className="hidden md:flex space-x-6 text-lg">
//           <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
//           <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
//           <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
//           <Link to='/profile' className="hover:text-blue-400 transition">Profile</Link>
//           <Link to='/profile' className="hover:text-blue-400 transition">Advice</Link>
//         </div>

//         <div className="flex gap-4 items-center ">
//                    <Link to='/notification' className="   ">
//              <i className="ri-notification-3-line text-2xl text-blue-400"></i>
//            </Link>

//         {/* Login Button */}
//         <div className="hidden md:block">
//         <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full ">
//              <i className="ri-logout-box-line text-2xl text-blue-400"></i>
//            </button>
//         </div>

//         </div>
          

//         {/* Mobile Menu Button */}
//         <div className="md:hidden mt-2">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className=" bg-slate-900 md:hidden flex flex-col space-y-4 border border-blue-400 text-white mt-3 p-4 absolute top-15 left-50 right-10 shadow-md">
//             <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
//           <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
//           <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
//           <Link to='/profile' className="hover:text-blue-400 transition">Profile</Link>
//           <button onClick={handleLogout} className="p-2 bg-black bg-opacity-0 rounded-full text-blue-400 text-xl ">
//           <i className="ri-logout-box-line text-2xl text-blue-400"></i>
//            </button>
//         </div>
//       )}
//     </div>

//           <Bmi />

       
//         <div className='flex flex-col md:flex-row mt-5   min-h-screen  text-white px-4 gap-5'>
//         {/* <div className="mockup-phone border-primary mt-5 flex gap-5 "> */}
//       {/* Water Intake Section */}
//       <div className='w-full md:w-1/2 flex md:flex-row  '>
//         <WaterIntake />
//       </div>
      
//       {/* Music Section */}
//       <div className='w-full md:w-1/2 flex md:flex-row '>
//         <Music />
//       </div>
//     </div>
//     <TodayTarget/>
//     </div>

//         <Sleep/> 

//     </>
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
import Music from "../../Components/Home/Music";
// import Sleep from "../SleepComponent/Sleep";
import GPSTracker from "../../Pages/GpsTracker";
import BodyProgress from "../../Pages/BodyProgress";
import TodaySchedule from "../SleepComponent/TodaySchedule";
import HabitTracker from "../../Pages/HabitTracker";
import Layout from "../../Pages/Layout";
import Footer from "../../Components/Footer"
import FloatingButton from "../../Pages/FloatingButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
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
      <div className=" bg-slate-900 min-h-screen">
        <div className="bg-black text-white p-5 shadow-blue-500 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl flex items-center gap-2 font-bold">
              <img src="/public/logo.gif" alt="" />
              <span className="text-blue-400">ZenFit</span> AnalyZer
            </div>

            <div className="hidden md:flex space-x-6 text-lg">
              <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
              <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
              <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
              <Link to='/social' className="hover:text-blue-400 transition">Community</Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setAdviceOpen(true)}
                onMouseLeave={() => setAdviceOpen(false)}
              >
                <div className=" hover:text-blue-400 transition">
                <button className="hover:text-blue-400 transition">Advice</button>
                {adviceOpen && (
                  <div className="absolute left-0  w-40 bg-gray-900 text-white shadow-lg rounded-lg">
                    <Link to='/fitness' className="block px-4 py-2 hover:bg-gray-700">Fitness</Link>
                    <Link to='/nutrition' className="block px-4 py-2 hover:bg-gray-700">Nutrition</Link>
                    <Link to='/selfcare' className="block px-4 py-2 hover:bg-gray-700">Self-Care</Link>
                    <Link to='/wellness' className="block px-4 py-2 hover:bg-gray-700">Wellness</Link>
                  </div>
                )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Link to='/notification'>
                <i className="ri-notification-3-line text-2xl text-blue-400"></i>
              </Link>
              <div className="hidden md:block">
                <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full">
                  <i className="ri-logout-box-line text-2xl text-blue-400"></i>
                </button>
              </div>
            </div>

            <div className="md:hidden mt-2">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="bg-slate-900 md:hidden flex flex-col border border-blue-400 text-white mt-7 p-4 absolute top-16 left-0 w-96 mx-4 my-4 shadow-md rounded-md">
              <Link to='/home' className="py-2 px-4 hover:bg-gray-700 rounded-md">Home</Link>
              <Link to='/meal' className="py-2 px-4 hover:bg-gray-700 rounded-md">Meal</Link>
              <Link to='/workout' className="py-2 px-4 hover:bg-gray-700 rounded-md">Workout</Link>
              <Link to='/social' className="py-2 px-4 hover:bg-gray-700 rounded-md">community</Link>
              <div className="flex flex-col">
                <button className="py-2 px-4 hover:bg-gray-700  rounded-md">Advice</button>
                <div className="ml-4 space-y-2">
                  <Link to='/fitness' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Fitness</Link>
                  <Link to='/nutrition' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Nutrition</Link>
                  <Link to='/selfcare' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Self-Care</Link>
                  <Link to='/wellness' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Wellness</Link>
                </div>
              </div>
              <button onClick={handleLogout} className="p-2 mt-4 bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 text-lg w-full">
                Logout
              </button>
            </div>
          )}
        </div>

        <Bmi />
        <HabitTracker />

        <div className='flex flex-col md:flex-row mt-5 min-h-screen text-white px-4 gap-5'>
          <div className='w-full md:w-1/2 flex md:flex-row'>

            <WaterIntake />
          </div>
          <div className='w-full md:w-1/2 flex md:flex-row'>
            <Music />
          </div>
        </div>
        <TodayTarget />

       
        <BodyProgress/>
        <div className="flex flex-col md:flex-row items-start justify-around mt-12 gap-7">
          <GPSTracker />
          <TodaySchedule />
        </div>
        <Layout/>
        <Footer/>
          <FloatingButton/>
      </div>
    </>
  );
};

export default Navbar;