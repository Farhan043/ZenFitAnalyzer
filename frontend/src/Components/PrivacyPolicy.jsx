import React from 'react';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaUserLock, FaDatabase, FaUsers, FaSync, FaEnvelope, FaClipboardList, FaLock, FaRunning, FaCogs, FaGlobe, FaMobileAlt } from 'react-icons/fa';
import Footer from './Footer';

const PrivacyPolicy = () => {

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
          <Link to='/profile' className="hover:text-blue-400 transition">Profile</Link>
          
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
          <Link to='/profile' className="py-2 px-4 hover:bg-gray-700 rounded-md">Profile</Link>
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

    <div className="min-h-screen  text-white p-6 flex justify-center items-center">
      <div className="max-w-8xl  p-8 ">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Privacy Policy</h1>
        {/* <p className="text-center text-gray-300 mb-4">Effective Date: [Insert Date]</p> */}
        
        <div className="space-y-6">
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaShieldAlt className="mr-2" /> Introduction
            </h2>
            <p className="text-gray-300">Welcome to ZenFitAnalyzer. Your privacy is important to us, and we are committed to protecting your personal data. By using ZenFitAnalyzer, you agree to this Privacy Policy.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaUserLock className="mr-2" /> Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li><strong>Personal Information:</strong> Name, Email address, Password, Age, Weight, Height, Gender</li>
              <li><strong>Usage Data:</strong> Meal planner preferences, Workout details, Calories burned, Sleep tracker data, Body progress, BMI history, Water intake logs, GPS activity tracking</li>
              <li><strong>Technical Information:</strong> IP address, Device details, Browser type, Operating system, Mobile device data</li>
            </ul>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaDatabase className="mr-2" /> How We Use Your Information
            </h2>
            <p className="text-gray-300">We use your data to provide personalized meal and workout recommendations, track fitness progress, optimize sleep schedules, analyze body metrics, and enhance user experience.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaClipboardList className="mr-2" /> Features Utilizing Your Data
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Meal Planning</li>
              <li>Workout Tracking</li>
              <li>Sleep Tracker</li>
              <li>Body Progress Analysis</li>
              <li>BMI Calculation</li>
              <li>Music Integration for Workouts</li>
              <li>Water Intake Monitoring</li>
              <li>GPS Activity Tracking (Running, Cycling, Walking)</li>
              <li>Live AI-Powered Workout Feedback</li>
            </ul>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaLock className="mr-2" /> Data Security
            </h2>
            <p className="text-gray-300">We implement strong encryption and security measures to protect your personal data from unauthorized access, ensuring confidentiality and integrity.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaUsers className="mr-2" /> Data Sharing
            </h2>
            <p className="text-gray-300">We do not share your personal data with third parties unless required by law. Your information is strictly used to enhance your experience within ZenFitAnalyzer.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaCogs className="mr-2" /> Third-Party Services
            </h2>
            <p className="text-gray-300">ZenFitAnalyzer may integrate with third-party services like Spotify for music and Google Maps for GPS tracking. These services have their own privacy policies, and we encourage you to review them.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaSync className="mr-2" /> Future Updates
            </h2>
            <p className="text-gray-300">We may update this Privacy Policy periodically to align with new features and security standards. Significant changes will be communicated via email or in-app notifications.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaEnvelope className="mr-2" /> Contact Us
            </h2>
            <p className="text-gray-300">If you have any questions regarding this Privacy Policy, feel free to contact us at <strong>[support@zenfitanalyzer.in]</strong>.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    </>
  );
};

export default PrivacyPolicy;
