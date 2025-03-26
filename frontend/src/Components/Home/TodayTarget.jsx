import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodayTarget = () => {
 
  const [stats, setStats] = useState({ totalPageViews: 0, newUsers: 0, newRegisteredUsers: [] });
  
    


  const navigate = useNavigate();


  return (
    <>
    <div className="flex mockup-phone border-primary items-center justify-between bg-black mb-5 mt-10 p-4 rounded-full  ">
      <span className="text-blue-400 text-2xl font-medium">Todaytarget</span>
      <button className="bg-slate-900 bg-opacity-100 text-white font-bold px-6 py-2 rounded-full "
        onClick={() =>  navigate('/activity-tracker')}>
       check
      </button>
    </div>

    </>
  );
};

export default TodayTarget;
