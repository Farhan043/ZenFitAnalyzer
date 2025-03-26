import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { motion } from "framer-motion";

export default function SetTarget() {
  const [showModal, setShowModal] = useState(false);
  const [inputWaterIntake, setInputWaterIntake] = useState("");
  const [inputFootSteps, setInputFootSteps] = useState("");
  const [waterIntake, setWaterIntake] = useState("0");
  const [footSteps, setFootSteps] = useState("0");
  const navigate = useNavigate();

  const fetchTargetData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to continue");
        navigate('/login');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/getTarget`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Backend returns { date, waterIntake, footSteps }
      if (response.data) {
        setWaterIntake(response.data.waterIntake?.toString() || "0");
        setFootSteps(response.data.footSteps?.toString() || "0");
      }
    } catch (error) {
      console.error("Error fetching target data:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchTargetData();
  }, [navigate]);

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
      toast.error("Please set both water intake and footstep targets before saving.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to continue");
        navigate('/login');
        return;
      }

      const loadingToast = toast.loading("Saving targets...");

      const targetData = {
        waterIntake: inputWaterIntake,
        footSteps: inputFootSteps,
        date: new Date().toDateString() // Match backend date format
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/setTarget`,
        targetData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.dismiss(loadingToast);

      if (response.data.target) {
        setWaterIntake(response.data.target.waterIntake.toString());
        setFootSteps(response.data.target.footSteps.toString());
        setInputWaterIntake("");
        setInputFootSteps("");
        setShowModal(false);
        toast.success("Targets successfully set!");
        
        // Refresh target data
        fetchTargetData();
      }
    } catch (error) {
      console.error("Error setting targets:", error);
      toast.error("Failed to set targets. Please try again.");
    }
  };

  const handleFootSubmit = () => {
    setInputFootSteps("");
    setInputWaterIntake("");
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-blue-500/20 rounded-full transition-colors"
        >
          <i className="ri-arrow-left-s-line text-3xl text-blue-400"></i>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">Activity Tracker</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400">Today's Target</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="w-10 h-10 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors flex items-center justify-center text-blue-400 text-2xl"
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <i className="ri-goblet-2-line text-4xl text-blue-400"></i>
              <div>
                <p className="text-3xl font-bold text-blue-400">{waterIntake || "0"}</p>
                <p className="text-sm text-blue-300">Water (L)</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <i className="ri-footprint-line text-4xl text-blue-400"></i>
              <div>
                <p className="text-3xl font-bold text-blue-400">{footSteps || "0"}</p>
                <p className="text-sm text-blue-300">Footsteps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900/90 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-blue-400 mb-6">Set Your Target</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-blue-300 block mb-2">Water Intake (L)</label>
                  <input
                    type="number"
                    value={inputWaterIntake}
                    onChange={handleWaterChange}
                    className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-xl text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter up to 4L"
                  />
                </div>
                <div>
                  <label className="text-blue-300 block mb-2">Footsteps</label>
                  <input
                    type="number"
                    value={inputFootSteps}
                    onChange={handleFootStepsChange}
                    className="w-full p-3 bg-gray-800/50 border border-blue-500/30 rounded-xl text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter step target"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleFootSubmit}
                  className="px-6 py-2 rounded-xl border border-red-400 text-red-400 hover:bg-red-400/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}