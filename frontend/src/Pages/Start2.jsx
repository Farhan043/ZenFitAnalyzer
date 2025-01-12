import React from "react";
import { FaRunning, FaCalendarAlt, FaRecordVinyl } from "react-icons/fa";
import { Link } from "react-router-dom";

const Start2 = () => {
  return (

    <div className="bg-cover bg-center bg-[url(https://img.freepik.com/premium-photo/strong-young-sports-woman-standing-with-ball_171337-31948.jpg)] h-screen flex flex-col justify-between items-center px-6 py-8">
      {/* Logo Section */}
      <div className="mt-6">
        <h1 className="text-white text-5xl font-bold">FitAnalyzer</h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center">
        <h2 className="text-white text-2xl font-bold text-center  mb-6">
          Started Journey With <span className="text-4xl ">FitAnalyzer</span>
        </h2>
        <div className="flex flex-col gap-6">
          {/* Feature 1 */}
          <div className="flex items-center gap-4">
            <FaRunning className="text-white text-2xl" />
            <div>
              <h3 className="text-white font-bold text-lg">
                Daily Workouts Class
              </h3>
              <p className="text-white text-sm">
                Each workout is taught by the world's top trainers.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-white text-2xl" />
            <div>
              <h3 className="text-white font-bold text-lg">
                Manage Your Diet Routine
              </h3>
              <p className="text-white text-sm">
                Each workout is taught by the world's top trainers.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <FaRecordVinyl className="text-white text-2xl" />
            <div>
              <h3 className="text-white font-bold text-lg">
                Keep's Recording Activity
              </h3>
              <p className="text-white text-sm">
                Outdoor running & precise running records to make your running.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <Link to='/login' className="bg-white text-purple-700 font-bold py-3 px-10 rounded-full shadow-lg text-lg flex items-center gap-2">
        Get Started
        <span>&#x2794;</span>
      </Link>
    </div>
  );
};

export default Start2;
