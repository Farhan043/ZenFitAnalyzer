import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Bmi from "./Bmi";
import WaterIntake from "./WaterIntake";
import TodayTarget from "./TodayTarget";
import Music from "../../Components/Home/Music";
// import Sleep from "../SleepComponent/Sleep";
import MarketPlace from "../../Pages/MarketPlace";
import BodyProgress from "../../Pages/BodyProgress";
import TodaySchedule from "../SleepComponent/TodaySchedule";
import HabitTracker from "../../Pages/HabitTracker";
import Layout from "../../Pages/Layout";
import Footer from "../../Components/Footer"
import FloatingButton from "../../Pages/FloatingButton";
import WorkoutTutorial from "../../Pages/WorkoutTutorial";

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
    <div className="bg-slate-900 min-h-screen w-full scrollable scrollbar-thin scrollbar-rounded">
      <div className="bg-black text-white p-5 shadow-blue-500 shadow-md sticky top-0 z-50 w-full">
        <div className="w-full max-w-[2000px] mx-auto flex justify-between items-center pr-2">
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
              <div className="hover:text-blue-400 transition">
              <button className="hover:text-blue-400 transition">Advice</button>
              {adviceOpen && (
                <div className="absolute left-0 w-40 bg-gray-900 text-white shadow-lg rounded-lg">
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
          <div className="bg-slate-900 md:hidden flex flex-col border border-blue-400 text-white mt-7 p-4 absolute top-16 left-0 right-0 mx-4 shadow-md rounded-md z-50">
            <Link to='/home' className="py-2 px-4 hover:bg-gray-700 rounded-md">Home</Link>
            <Link to='/meal' className="py-2 px-4 hover:bg-gray-700 rounded-md">Meal</Link>
            <Link to='/workout' className="py-2 px-4 hover:bg-gray-700 rounded-md">Workout</Link>
            <Link to='/social' className="py-2 px-4 hover:bg-gray-700 rounded-md">community</Link>
            <div className="flex flex-col">
              <button className="py-2 px-4 hover:bg-gray-700 rounded-md">Advice</button>
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

      <div className="pb-20 overflow-y-auto scrollable w-full px-2 md:px-4 max-w-[2000px] mx-auto scrollbar-thin scrollbar-rounded">
        <Bmi />
        <HabitTracker />

        <div className='flex flex-col md:flex-row mt-5 text-white gap-5'>
          <div className='w-full md:w-1/2 flex md:flex-row'>
            <WaterIntake />
          </div>
          <div className='w-full md:w-1/2 flex md:flex-row'>
            <Music />
          </div>
        </div>
        <TodayTarget />
       
        <BodyProgress/>
        <MarketPlace />
        <TodaySchedule />
        <Layout/>
        <WorkoutTutorial/>
        <Footer/>
        <FloatingButton/>
      </div>
    </div>
  );
};

export default Navbar;