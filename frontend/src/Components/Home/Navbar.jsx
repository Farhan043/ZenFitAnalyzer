import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Bmi from "./Bmi";
import WaterIntake from "./WaterIntake";
import TodayTarget from "./TodayTarget";
import Music from "../../Components/Home/Music";
// import Sleep from "../SleepComponent/Sleep";
import MarketPlace from "../../Pages/MarketPlace";
import BodyProgress from "../../Pages/BodyProgress";
import TodaySchedule from "../SleepComponent/TodaySchedule";
import HabitTracker from "../../Pages/HabitTracker";
import Layout from "../../Pages/Layout";
import Footer from "../../Components/Footer";
import FloatingButton from "../../Pages/FloatingButton";
import WorkoutTutorial from "../../Pages/WorkoutTutorial";
import HealthTips from "./HealthTips";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="bg-slate-900 min-h-screen w-full scrollable scrollbar-thin scrollbar-rounded">
      <div className="bg-black text-white p-3 sm:p-5 shadow-blue-500 shadow-md sticky top-0 z-50 w-full">
        <div className="w-full max-w-[2000px] mx-auto flex justify-between items-center px-2 sm:px-4">
          <div className="text-xl sm:text-2xl flex items-center gap-2 font-bold">
            <img
              src="/public/logo.gif"
              alt="ZenFit Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-blue-400">ZenFit</span> AnalyZer
          </div>

          <div className="hidden md:flex space-x-4 lg:space-x-6 text-base lg:text-lg">
            <Link
              to="/home"
              className="hover:text-blue-400 transition px-2 py-1 rounded-md hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/meal"
              className="hover:text-blue-400 transition px-2 py-1 rounded-md hover:bg-gray-800"
            >
              Meal
            </Link>
            <Link
              to="/workout"
              className="hover:text-blue-400 transition px-2 py-1 rounded-md hover:bg-gray-800"
            >
              Workout
            </Link>
            <Link
              to="/social"
              className="hover:text-blue-400 transition px-2 py-1 rounded-md hover:bg-gray-800"
            >
              Community
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setAdviceOpen(true)}
              onMouseLeave={() => setAdviceOpen(false)}
            >
              <button className="hover:text-blue-400 transition px-2 py-1 rounded-md hover:bg-gray-800">
                Advice
              </button>
              {adviceOpen && (
                <div className="absolute left-0 w-40 bg-gray-900 text-white shadow-lg rounded-lg mt-1">
                  <Link
                    to="/fitness"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg"
                  >
                    Fitness
                  </Link>
                  <Link
                    to="/nutrition"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Nutrition
                  </Link>
                  <Link
                    to="/selfcare"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Self-Care
                  </Link>
                  <Link
                    to="/wellness"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-b-lg"
                  >
                    Wellness
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 items-center">
            <Link
              to="/notification"
              className="p-1 sm:p-2 hover:bg-gray-800 rounded-full"
            >
              <i className="ri-notification-3-line text-xl sm:text-2xl text-blue-400"></i>
            </Link>
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800 rounded-full transition"
              >
                <i className="ri-logout-box-line text-xl sm:text-2xl text-blue-400"></i>
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-800 rounded-full transition"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-slate-900 border border-blue-400 text-white mt-2 p-4 absolute top-full left-0 right-0 mx-4 shadow-md rounded-md z-50">
            <div className="flex flex-col space-y-2">
              <Link
                to="/home"
                className="py-2 px-4 hover:bg-gray-700 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/meal"
                className="py-2 px-4 hover:bg-gray-700 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Meal
              </Link>
              <Link
                to="/workout"
                className="py-2 px-4 hover:bg-gray-700 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Workout
              </Link>
              <Link
                to="/social"
                className="py-2 px-4 hover:bg-gray-700 rounded-md transition"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>

              <div className="flex flex-col">
                <button
                  className="py-2 px-4 hover:bg-gray-700 rounded-md transition text-left"
                  onClick={() => setAdviceOpen(!adviceOpen)}
                >
                  Advice
                </button>
                {adviceOpen && (
                  <div className="ml-4 space-y-1 mt-1">
                    <Link
                      to="/fitness"
                      className="block py-2 px-4 hover:bg-gray-600 rounded-md transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Fitness
                    </Link>
                    <Link
                      to="/nutrition"
                      className="block py-2 px-4 hover:bg-gray-600 rounded-md transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Nutrition
                    </Link>
                    <Link
                      to="/selfcare"
                      className="block py-2 px-4 hover:bg-gray-600 rounded-md transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Self-Care
                    </Link>
                    <Link
                      to="/wellness"
                      className="block py-2 px-4 hover:bg-gray-600 rounded-md transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Wellness
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="p-2 mt-2 bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 text-base w-full transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div className=" overflow-y-auto scrollable w-full px-2 sm:px-4 md:px-6 max-w-[2000px] mx-auto scrollbar-thin scrollbar-rounded">
        <Bmi />
        <HabitTracker />
        <div className="flex flex-col md:flex-row mt-5 text-white gap-5 justify-center items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <WaterIntake />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Music />
          </div>
        </div>

        <TodayTarget />
        <HealthTips />
        <BodyProgress />
        <MarketPlace />
        <WorkoutTutorial />
        <TodaySchedule />

        <Layout />
        <Footer />
        <FloatingButton />
      </div>
    </div>
  );
};

export default Navbar;
