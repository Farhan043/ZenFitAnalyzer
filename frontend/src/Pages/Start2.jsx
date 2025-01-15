import React from "react";
import { Link } from "react-router-dom";

const Start2 = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-[url(https://th.bing.com/th/id/OIP.a2wOj0-4L79Wl-G4gMy3QwHaIi?rs=1&pid=ImgDetMain)] h-[450px] flex flex-col justify-between items-center px-6 py-8">
      </div>

      <div className=" w-full flex flex-col items-start justify-start mt-16">
        <h1 className="text-4xl ml-5 font-bold mb-4">Track Your Goal</h1>
        <p className="text-lg text-start px-6">
          Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals
        </p>
      </div>

      <div className="flex justify-end items-end w-full px-10 py-4 mt-32">
        <Link to='/start3'><i className="bg-blue-500 text-white text-2xl py-4 px-4 rounded-full shadow-md hover:bg-blue-100 ri-arrow-right-wide-line"></i>
        </Link>
      </div>
    </>

  );
};

export default Start2;



