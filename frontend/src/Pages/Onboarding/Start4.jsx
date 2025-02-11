import React from "react";
import { Link } from "react-router-dom";

const Start4 = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-[url(https://www.manatsu-orion.com/wp-content/uploads/2022/07/images-14.jpeg)] h-[450px] flex flex-col justify-between items-center px-6 py-8">
      </div>

      <div className=" w-full h-[450px] flex glass flex-col items-start justify-center">
        <h1 className="text-4xl ml-5 font-bold mb-4">Eat Well</h1>
        <p className="text-lg text-start px-6">
          Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun
        </p>

      <div className="flex justify-end items-end w-full px-10 py-4 mt-20">
        <Link to='/start5'><i className="glass text-white text-2xl py-4 px-4 rounded-full  ri-arrow-right-wide-line"></i>
        </Link>
      </div>
      </div>
    </>

  );
};

export default Start4;



