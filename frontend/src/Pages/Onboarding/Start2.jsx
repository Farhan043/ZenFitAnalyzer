import React from "react";
import { Link } from "react-router-dom";

const Start2 = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-[url(https://img.lovepik.com/png/20231005/Mens-Fitness-Exercise-Dumbbell-motion-physical-exercise-man_96025_wh300.png)] h-[450px] ">
      </div>

      <div className=" w-full h-[450px] flex glass flex-col items-start justify-center ">
        <h1 className="text-4xl ml-5 font-bold mb-4">Track Your Goal</h1>
        <p className="text-lg text-start px-6">
          Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals
        </p>

      <div className="flex justify-end items-end w-full px-10 py-4 mt-20">
        <Link to='/start3'><i className="glass text-white text-2xl py-4 px-4 rounded-full  ri-arrow-right-wide-line"></i>
        </Link>
      </div>
      </div>

    </>

  );
};

export default Start2;



