import React from "react";
import { Link } from "react-router-dom";

const Start3 = () => {
  return (
    <>
      <div className="bg-cover bg-center bg-[url(https://th.bing.com/th/id/OIP.7DtKOfInqB5IY5I3wXJhWgHaE7?w=229&h=180&c=7&r=0&o=5&pid=1.7)] h-[450px] flex flex-col justify-between items-center px-6 py-8">
      </div>

      <div className=" w-full flex flex-col items-start justify-start mt-16">
        <h1 className="text-4xl ml-5 font-bold mb-4">Get Burn</h1>
        <p className="text-lg text-start px-6">
          Let’s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever
        </p>
      </div>

      <div className="flex justify-end items-end w-full px-10 py-4 mt-32">
        <Link to='/start4'><i className="bg-blue-500 text-white text-2xl py-4 px-4 rounded-full shadow-md hover:bg-blue-100 ri-arrow-right-wide-line"></i>
        </Link>
      </div>
    </>

  );
};

export default Start3;



