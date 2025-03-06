
import React from "react";
import { Link } from "react-router-dom";

const Start5 = () => {
  return (
    <>
      {/* Background Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-zinc-700 text-white p-6 ">
        
        {/* AI-Generated Image */}
        <div className="w-[300px] h-[300px] mb-6">
          <img 
            src="/public/sleep.png" 
            alt="Fitness AI Illustration" 
            className="w-full h-full bg-cover bg-center" 
          />
        </div>
        
        {/* Main Content */}
        <div className="text-center mt-4">
          <h1 className="text-5xl font-bold mb-4">Improve Sleep  Quality</h1>
          <p className="text-lg max-w-md mx-auto">
          Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning
          </p>
        </div>

        {/* Navigation Button */}
        <div className="absolute bottom-10 right-10 ">
          <Link to='/login'>
            <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg text-2xl">
              →
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start5;



