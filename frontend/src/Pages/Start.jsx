
import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Page 1 */}
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500 text-white">
        <h1 className="text-4xl font-bold ">Started Journey</h1>
        <h1 className="text-4xl font-bold ">With</h1>
        <h1 className="text-4xl font-bold ">FitAnalyzer</h1>
        <p className="text-lg mt-4 mb-5">Everybody Can Train</p>
        <Link to='/start2' className="bg-white text-blue-500 py-2 px-6 rounded-full shadow-md hover:bg-blue-100">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Start;




