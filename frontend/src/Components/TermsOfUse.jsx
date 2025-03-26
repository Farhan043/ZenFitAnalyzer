import React from 'react';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUserShield, FaLock, FaClipboardList, FaBan, FaShieldAlt, FaExclamationTriangle, FaEdit, FaEnvelope } from 'react-icons/fa';
import Footer from './Footer';

const TermsOfUse = () => {
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
          <Link to='/social' className="hover:text-blue-400 transition">community</Link>
          
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

    <div className="min-h-screen  text-white p-6 flex justify-center items-center">
      <div className="max-w-8xl -8 ">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Terms of Use</h1>
        {/* <p className="text-center text-gray-300 mb-4">Effective Date: [Insert Date]</p> */}
        
        <div className="space-y-6">
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaCheckCircle className="mr-2" /> Acceptance of Terms
            </h2>
            <p className="text-gray-300">By accessing ZenFitAnalyzer, you acknowledge that you have read, understood, and agree to these Terms of Use. If you do not agree, please do not use the website.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaUserShield className="mr-2" /> User Eligibility
            </h2>
            <p className="text-gray-300">You must be at least 13 years old to use ZenFitAnalyzer. Users under 18 require parental or guardian consent.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaLock className="mr-2" /> Account Registration & Security
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Users must register an account to access specific features.</li>
              <li>Maintaining account security is the user's responsibility.</li>
              <li>Suspicious or fraudulent activities may result in account suspension.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaClipboardList className="mr-2" /> Features & Usage
            </h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Meal Planning</li>
              <li>Workout Tracking</li>
              <li>Calorie & Nutrition Monitoring</li>
              <li>Sleep Tracking</li>
              <li>Body Progress Analysis</li>
              <li>GPS-based Activity Tracking</li>
              <li>Water Intake Reminders</li>
              <li>AI-powered workout feedback</li>
            </ul>
            <p className="text-gray-300">ZenFitAnalyzer provides guidance and tracking tools but is not a substitute for professional medical or nutritional advice.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaBan className="mr-2" /> User Conduct
            </h2>
            <p className="text-gray-300">Users agree not to:</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Share false or misleading information.</li>
              <li>Use the platform for unlawful activities.</li>
              <li>Disrupt or hack the website’s security.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaShieldAlt className="mr-2" /> Data Privacy & Security
            </h2>
            <p className="text-gray-300">Your personal data is processed per our Privacy Policy. While we implement robust security measures, we cannot guarantee absolute protection against cyber threats.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaExclamationTriangle className="mr-2" /> Disclaimer of Warranties
            </h2>
            <p className="text-gray-300">ZenFitAnalyzer is provided "as is" without warranties of any kind. We do not guarantee uninterrupted, error-free service.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaEdit className="mr-2" /> Modifications to Terms
            </h2>
            <p className="text-gray-300">We reserve the right to update these Terms of Use at any time. Continued use after modifications implies acceptance.</p>
          </div>
          
          <div>
            <h2 className="flex items-center text-xl font-semibold text-blue-300 mb-2">
              <FaEnvelope className="mr-2" /> Contact Information
            </h2>
            <p className="text-gray-300">For any queries regarding these Terms of Use, please contact us at <strong>[support@zenfitanalyzer.in]</strong>.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    </>
  );
};

export default TermsOfUse;
