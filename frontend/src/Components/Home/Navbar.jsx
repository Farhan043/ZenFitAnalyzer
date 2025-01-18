
import React, { useState } from "react";
import { UserDataContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Bmi from "./Bmi";
import WaterIntake from "./WaterIntake";
import Sleep from "./Sleep";
// import ActivityStatus from "./ActivityStatus";
import Calories from "./Calories";
import WorkoutProgress from "./WorkoutProgress";
import FullBodyWorkout from "./FullBodyWorkout";
import LowerBodyWorkout from "./LowerBodyWorkout";
import AbsWorkout from "./AbsWorkout";

const Navbar = ({ children }) => {
  const { user } = React.useContext(UserDataContext);
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
      }
      )
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500 text-sm">Welcome Back, </p>
          <h1 className="text-2xl font-semibold">{user?.name || 'Guest'}</h1>
        </div>

        <div className="flex gap-4">
          <Link to='/notification' className="p-2 bg-white rounded-full shadow-md">
            <i className="ri-notification-3-line text-xl text-gray-500"></i>
          </Link>

          <button onClick={handleLogout} className="p-2 bg-white rounded-full shadow-md">
            <i className="ri-logout-box-line text-xl text-gray-500"></i>
          </button>
        </div>
      </div>
      <Bmi />
      {/* <ActivityStatus /> */}
      <WaterIntake />
      <Sleep />
      <Calories />
      <WorkoutProgress />
      <FullBodyWorkout />
      <LowerBodyWorkout />
      <AbsWorkout />
      {children}
    </div>
  );
};

export default Navbar;




