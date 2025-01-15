import React from "react";
import { Link } from "react-router-dom";

const Start5 = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-[url(https://th.bing.com/th/id/OIP.NH14NnMbA7liC7q0HXrboQHaHa?rs=1&pid=ImgDetMain)] h-[450px] flex flex-col justify-between items-center px-6 py-8">
      </div>

      <div className=" w-full flex flex-col items-start justify-start mt-16">
        <h1 className="text-4xl ml-5 font-bold mb-4">Improve Sleep  Quality
        </h1>
        <p className="text-lg text-start px-6">
          Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning
        </p>
      </div>

      <div className="flex justify-end items-end w-full px-10 py-4 mt-32">
        <Link to='/register'><i className="bg-blue-500 text-white text-2xl py-4 px-4 rounded-full shadow-md hover:bg-blue-100 ri-arrow-right-wide-line"></i>
        </Link>
      </div>
    </>

  );
};

export default Start5;



