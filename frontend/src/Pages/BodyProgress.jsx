

import React from "react";
import { useNavigate } from "react-router-dom";

const BodyProgress = () => {
  const navigate = useNavigate();

  return (
    <div className="mockup-phone w-full border-primary flex flex-col md:flex-row items-center gap-6 bg-gray-900 text-white p-6 shadow-lg">
      {/* Left Side - GIF and Title */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-4">
        <h2 className="text-3xl font-bold mb-4">
          Track Your <span className="text-blue-500">Body Progress</span>
        </h2>
        <img src="/public/running.gif" alt="Progress Animation" className="w-80 md:w-96 h-auto mx-auto md:mx-0" />
      </div>
      
      {/* Right Side - Content and Button */}
      <div className="w-full md:w-1/2 text-center md:text-left p-4">
        <p className="text-lg md:text-xl mb-6 leading-relaxed">
          Track your fitness journey with real-time progress updates. Monitor changes in weight, muscle growth, and overall health improvements.
          Stay motivated and achieve your goals with detailed statistics and insights.
        </p>
        <button onClick={() => navigate("/progress")} className="bg-blue-500 px-6 py-3 rounded-md text-white w-full md:w-auto">
          View Progress
        </button>
      </div>
    </div>
  );
};

export default BodyProgress;
