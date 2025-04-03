import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaChartLine, FaCamera, FaArrowRight, FaWeight, FaRunning } from "react-icons/fa";

const BodyProgress = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const features = [
    { icon: <FaWeight size={24} />, title: "Weight Tracking", desc: "Monitor your weight changes over time" },
    { icon: <FaDumbbell size={24} />, title: "Body Measurements", desc: "Track your muscular development" },
    { icon: <FaCamera size={24} />, title: "Progress Photos", desc: "Visual evidence of your transformation" },
    { icon: <FaChartLine size={24} />, title: "Data Analytics", desc: "Insights into your fitness journey" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-purple-900 p-6 md:p-10 mb-12 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Body</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Track your fitness journey with precise measurements, photos and analytics. See your progress and stay motivated.
            </p>
            <button 
              onClick={() => navigate("/progress")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl text-white font-medium shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              <span>View Progress</span>
              <FaArrowRight />
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
            <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 rounded-2xl shadow-2xl backdrop-blur-sm animate-float">
              <img 
                src="/public/running.gif" 
                alt="Progress Animation" 
                className="w-72 md:w-80 h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Track Every Aspect of Your <span className="text-blue-400">Fitness Journey</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="text-blue-400 text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-center text-4xl text-blue-400 mb-6">
          <FaRunning size={48} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Tracking Your Progress Today</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Get detailed insights into your fitness journey with our advanced tracking tools.
          Don't miss out on seeing how far you've come!
        </p>
        <button 
          onClick={() => navigate("/progress")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl text-white font-medium shadow-lg transition-colors duration-300"
        >
          View My Progress Dashboard
        </button>
      </div>

      {/* Dashboard Preview Section */}
      <div className="mt-12 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl animate-fadeIn" style={{ animationDelay: "0.6s" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center"> Fitness Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weight Stats Card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 shadow-lg hover:shadow-blue-900/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaWeight className="text-blue-400" />
              <h3 className="font-bold text-xl">Weight Stats</h3>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Starting</p>
                <p className="text-2xl font-bold">180 lbs</p>
              </div>
              <div className="w-0.5 h-10 bg-gray-700"></div>
              <div>
                <p className="text-gray-400 text-sm">Current</p>
                <p className="text-2xl font-bold">165 lbs</p>
              </div>
              <div className="w-0.5 h-10 bg-gray-700"></div>
              <div>
                <p className="text-gray-400 text-sm">Goal</p>
                <p className="text-2xl font-bold">150 lbs</p>
              </div>
            </div>
          </div>
          
          {/* Measurements Card */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaDumbbell className="text-purple-400" />
              <h3 className="font-bold text-xl">Body Measurements</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Chest</p>
                <p className="text-xl font-bold">42"</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Waist</p>
                <p className="text-xl font-bold">34"</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Arms</p>
                <p className="text-xl font-bold">15"</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Thighs</p>
                <p className="text-xl font-bold">24"</p>
              </div>
            </div>
          </div>
          
          {/* Progress Photos Card */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 shadow-lg hover:shadow-green-900/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <FaCamera className="text-green-400" />
              <h3 className="font-bold text-xl">Progress Photos</h3>
            </div>
            <p className="text-gray-300 mb-2">Latest photos from your journey</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gray-700 rounded-lg"></div>
              <div className="aspect-square bg-gray-700 rounded-lg"></div>
              <div className="aspect-square bg-gray-700 rounded-lg"></div>
            </div>
            <button className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <FaCamera className="text-sm" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyProgress;
