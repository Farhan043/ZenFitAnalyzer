
import React from "react";
import { Link } from "react-router-dom";

const Start3 = () => {
  return (
    <>
      {/* Background Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-red-600 text-white p-6 ">
        
        {/* AI-Generated Image */}
        <div className="w-[300px] h-[300px] mb-6">
          <img 
            src="/public/burn.png" 
            alt="Fitness AI Illustration" 
            className="w-full h-full bg-cover bg-center" 
          />
        </div>
        
        {/* Main Content */}
        <div className="text-center mt-4">
          <h1 className="text-5xl font-bold mb-4">Get Burn</h1>
          <p className="text-lg max-w-md mx-auto">
            Let’s keep burning to achieve your goals. It hurts only temporarily; if you give up now, you will be in pain forever.
          </p>
          
          {/* Goal Progress Section */}
          <div className="mt-6 w-full  bg-black bg-opacity-50  p-4 rounded-lg backdrop-blur-md">
            <p className="text-lg font-semibold text-center">GET BURN</p>
            <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
              <div className="h-2 bg-yellow-500 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="absolute bottom-10 right-10 ">
          <Link to='/start4'>
            <div className="w-14 h-14 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-lg text-2xl">
              →
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start3;
