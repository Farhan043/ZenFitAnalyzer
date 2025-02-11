import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Bmi from "./Bmi";
import WaterIntake from "./WaterIntake";
import Sleep from "../SleepComponent/Sleep";
// import ActivityStatus from "./ActivityStatus";
import WorkoutProgress from "./WorkoutProgress";
import FullBodyWorkout from "./FullBodyWorkout";
import LowerBodyWorkout from "./LowerBodyWorkout";
import AbsWorkout from "./AbsWorkout";
import TodayTarget from "./TodayTarget";
import Settings from "../../Pages/Theme/Settings";

const Navbar = () => {
  const navigate = useNavigate();



  const handleLogout = () => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className="p-3 bg-black bg-opacity-0 min-h-screen">
      <div className="flex justify-between items-center p-3 h-14 ">

        <Settings/>

        <div className="flex gap-4">
          <Link to='/notification' className="p-2 bg-black bg-opacity-50 rounded-full ">
            <i className="ri-notification-3-line text-2xl text-blue-400"></i>
          </Link>

          <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full ">
            <i className="ri-logout-box-line text-2xl text-blue-400"></i>
          </button>
        </div>
      </div>
      <Bmi />
      <br />
      <TodayTarget/>
      <br />
      <WaterIntake />
      <br />
      <Sleep />
      <WorkoutProgress />
      <FullBodyWorkout />
      <LowerBodyWorkout />
      <AbsWorkout />
      {/* <ActivityStatus /> */}
    </div>
  );
};

export default Navbar;