import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 h-32 py-7  w-full bg-white rounded-lg shadow-lg">
      <div className="flex justify-around items-center ">
        {/* Home Icon */}
        <Link to='/home' className="flex flex-col items-center text-pink-500">
          <i className="ri-home-fill text-4xl"></i>
        </Link>

        {/* Stats Icon */}
        <button className="flex flex-col items-center text-gray-500"
          onClick={() => { navigate('/meal'); }}
        >
          <i className="ri-cake-2-line text-4xl"></i>
        </button>

        {/* Search Button */}
        <button className="flex justify-center items-center h-20 w-20 bg-blue-200 rounded-full text-blue-600 shadow-md">
          <i className="ri-search-line text-4xl"></i>
        </button>

        {/* Camera Icon */}
        <button className="flex flex-col items-center text-gray-500"
          onClick={() => {
            navigate('/camera');
          }}
        >
          <i className="ri-camera-ai-fill text-4xl"></i>
        </button>

        {/* Profile Icon */}
        <button to='/profile' className="flex flex-col items-center text-gray-500"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <i className="ri-user-line text-4xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Footer;
