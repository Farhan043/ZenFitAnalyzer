import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Selfcare = () => {
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
    <>
      <div className="p-3 bg-black min-h-screen">
        {/* Navbar */}
        <div className="bg-black text-white p-5 shadow-blue-500 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl flex items-center gap-2 font-bold">
              <img src="/public/logo.gif" alt="" />
              <span className="text-blue-400">ZenFit</span> AnalyZer
            </div>

            <div className="hidden md:flex space-x-6 text-lg">
              <Link to="/home" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link to="/meal" className="hover:text-blue-400 transition">
                Meal
              </Link>
              <Link to="/workout" className="hover:text-blue-400 transition">
                Workout
              </Link>
              <Link to="/social" className="hover:text-blue-400 transition">
                community
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setAdviceOpen(true)}
                onMouseLeave={() => setAdviceOpen(false)}
              >
                <div className=" hover:text-blue-400 transition">
                  <button className="hover:text-blue-400 transition">
                    Advice
                  </button>
                  {adviceOpen && (
                    <div className="absolute left-0  w-40 bg-gray-900 text-white shadow-lg rounded-lg">
                      <Link
                        to="/fitness"
                        className="block px-4 py-2 hover:bg-gray-700"
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
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Wellness
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Link to="/notification">
                <i className="ri-notification-3-line text-2xl text-blue-400"></i>
              </Link>
              <div className="hidden md:block">
                <button
                  onClick={handleLogout}
                  className="p-2 bg-black bg-opacity-50 rounded-full"
                >
                  <i className="ri-logout-box-line text-2xl text-blue-400"></i>
                </button>
              </div>
            </div>

            <div className="md:hidden mt-2">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="bg-slate-900 md:hidden flex flex-col border border-blue-400 text-white mt-7 p-4 absolute top-16 left-0 w-96 mx-4 my-4 shadow-md rounded-md">
              <Link
                to="/home"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/meal"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
                Meal
              </Link>
              <Link
                to="/workout"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
                Workout
              </Link>
              <Link
                to="/social"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
                community
              </Link>
              <div className="flex flex-col">
                <button className="py-2 px-4 hover:bg-gray-700  rounded-md">
                  Advice
                </button>
                <div className="ml-4 space-y-2">
                  <Link
                    to="/fitness"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Fitness
                  </Link>
                  <Link
                    to="/nutrition"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Nutrition
                  </Link>
                  <Link
                    to="/selfcare"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Self-Care
                  </Link>
                  <Link
                    to="/wellness"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Wellness
                  </Link>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 mt-4 bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 text-lg w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hero section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-100 text-center mb-5 mt-4">
            SelfCare
          </h2>

          <div className="flex flex-col flex-wrap md:flex-row items-center  shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare1.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Morning Rituals for a Positive Start
              </h3>
              <p className="text-gray-600 mt-2">
                Simple habits to set the tone for a productive and stress-free
                day.
              </p>
              <Link
                to="/selfcare1"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare2.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Power of Restful Sleep – How Quality Sleep Impacts Fitness
                and Mental Well-being
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll explore how deep, restful sleep can
                transform your fitness goals and mental health, and share
                science-backed tips to help you improve your sleep quality.
              </p>
              <Link
                to="/selfcare2"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare3.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Mindfulness & Meditation for Stress Relief
              </h3>
              <p className="text-gray-600 mt-2">
                Stress is an unavoidable part of life, but practicing
                mindfulness and meditation can significantly improve focus,
                relaxation, and overall well-being.
              </p>
              <Link
                to="/selfcare3"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare4.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Self-Care Sundays: A Weekly Reset for Mind and Body
              </h3>
              <p className="text-gray-600 mt-2">
                Taking time for self-care on Sundays can help you recharge and
                maintain a healthy lifestyle.
              </p>
              <Link
                to="/selfcare4"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare5.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Balancing Fitness and Mental Health: The Connection Between
                Physical Activity and Emotional Resilience
              </h3>
              <p className="text-gray-600 mt-2">
                Let’s explore how exercise impacts mental well-being and why it
                should be a key part of any self-care routine.
              </p>
              <Link
                to="/selfcare5"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/detox.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Digital Detox: Reclaiming Your Time for Mental Clarity and
                Relaxation
              </h3>
              <p className="text-gray-600 mt-2">
                In today's hyperconnected world, constant digital engagement can
                lead to stress, anxiety, and even cognitive impairments.
              </p>
              <Link
                to="/selfcare6"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Selfcare/selfcare7.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Hydration & Skincare: The Glow-Up Combo
              </h3>
              <p className="text-gray-600 mt-2">
                Hydration is one of the simplest yet most effective ways to
                improve your skin and overall health. Drinking enough water
                daily not only keeps your skin glowing but also supports
                essential bodily functions. Here’s how proper hydration benefits
                your skin and wellness.
              </p>
              <Link
                to="/selfcare7"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selfcare;
