import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div className="diff w-screen h-screen">
        <div className="diff-item-1">
          <div className="bg-primary text-primary-content grid place-content-center text-8xl font-black">
            AnalyZer
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-base-200 grid place-content-center text-9xl font-black">ZenFit</div>
        </div>
        <div className="diff-resizer"></div>
        <div className="absolute bottom-20 right-20">
  <Link 
    to='/start2' 
    className="btn glass btn-lg text-white"
  >
    <i className="ri-arrow-right-line text-2xl"></i>
  </Link>
</div>

      </div>
    </>
  );
};

export default Start;



