
import React from "react";
import { Link } from "react-router-dom";

const Start2 = () => {
  return (
    <>
      {/* Background Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-500 to-purple-600 text-white p-6">
      
        {/* AI-Generated Image */}
        <div className="w-[300px] h-[300px] mb-6">
          <img 
            src="/public/track.png" 
            alt="Fitness AI Illustration" 
            className="w-full h-full bg-cover bg-center" 
          />
        </div>
        
        {/* Circular Progress Indicator */}
        <div className="absolute top-10 right-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-xl font-bold">
            63%
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-4">
          <h1 className="text-5xl font-bold mb-4">Track Your Goal</h1>
          <p className="text-lg max-w-md mx-auto">
            Don't worry if you have trouble determining your goals, we can help you identify and track them effectively.
          </p>
        </div>

        {/* Goal Progress Section */}
        <div className="mt-10 w-full max-w-md bg-black bg-opacity-50 p-4 rounded-lg backdrop-blur-md">
          <p className="text-lg font-semibold text-center">TRACK YOUR GOAL</p>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
            <div className="h-2 bg-blue-500 rounded-full w-3/5"></div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="absolute bottom-10 right-10">
          <Link to='/start3'>
            <div className="w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg text-2xl">
              →
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start2;












