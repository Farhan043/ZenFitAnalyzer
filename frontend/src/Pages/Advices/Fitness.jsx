import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
                    to="/advice/fitness"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Fitness
                  </Link>
                  <Link
                    to="/advice/nutrition"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Nutrition
                  </Link>
                  <Link
                    to="/advice/selfcare"
                    className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                  >
                    Self-Care
                  </Link>
                  <Link
                    to="/advice/wellness"
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
            Fitness
          </h2>

          <div className="flex flex-col flex-wrap md:flex-row items-center  shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness1.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                8 Daily Habits to Prevent Muscle Loss & Build Strength
              </h3>
              <p className="text-gray-600 mt-2">
                It’s never too late to start prioritizing your muscle health!
              </p>
              <Link
                to="/article"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness2.png"
                alt="Morning routine"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Best Morning Routine for an Active & Energized Day
              </h3>
              <p className="text-gray-600 mt-2">
                Starting your day the right way can make a huge difference in
                your energy levels, focus, and overall well-being. A structured
                morning routine helps you stay active, productive, and ready to
                take on the day!
              </p>

              <Link
                to="/article2"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness3.png"
                alt=" Improve Posture"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                How to Improve Your Posture with Simple Daily Exercises
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll cover why posture matters and the best
                daily exercises to improve your posture effortlessly.
              </p>

              <Link
                to="/article3"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness4.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Top 5 Recovery Methods to Reduce Muscle Soreness
              </h3>
              <p className="text-gray-600 mt-2">
                The good news? You can speed up recovery and reduce soreness
                with the right recovery methods. Here are the top 5
                scientifically backed recovery techniques to help your muscles
                heal faster.
              </p>

              <Link
                to="/article4"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness5.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Strength Training vs. Cardio: What’s Best for Fat Loss?
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll break down the science behind strength
                training vs. cardio for fat loss, their benefits, and the best
                approach to maximize results. .
              </p>

              <Link
                to="/article5"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness6.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                How to Stay Consistent with Your Fitness Routine
              </h3>
              <p className="text-gray-600 mt-2">
                If you’ve ever found yourself skipping workouts, struggling to
                stay on track, or losing motivation, don’t worry—you’re not
                alone. Here’s how to build a fitness routine that sticks and
                keeps you on track for the long haul.
              </p>

              <Link
                to="/article6"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness7.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Importance of Rest Days & How to Use Them Effectively
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll explore why rest days are essential, how
                they improve performance, and the best ways to maximize recovery
                without losing progress.
              </p>

              <Link
                to="/article7"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness8.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                10 Essential Stretches to Boost Flexibility & Mobility
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll cover 10 must-do stretches to increase
                flexibility and mobility—perfect for beginners, athletes, and
                everyone in between.
              </p>

              <Link
                to="/article8"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness9.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Best Foods to Eat Before & After a Workout for Maximum
                Performance & Recovery
              </h3>
              <p className="text-gray-600 mt-2">
                In this guide, we’ll break down: ✅ What to eat before a workout
                (to fuel your body) ✅ What to eat after a workout (to optimize
                recovery) ✅ Best meal & snack ideas for pre- and post-workout
                nutrition
              </p>

              <Link
                to="/article9"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>


             {/* Image Section */}
             <div className="w-full md:w-1/2">
              <img
                src="/public/Fitness/fitness10.png"
                alt=" Improve Posture"
                className="w-96 mt-5 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
              5-Minute Workouts for Busy Schedules: Stay Fit Anytime
              </h3>
              <p className="text-gray-600 mt-2">
              Struggling to find time for fitness? You’re not alone. The #1 excuse for skipping workouts is lack of time. But here’s the good news: you don’t need an hour at the gym to stay fit.
              </p>

              <Link
                to="/article10"
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

export default Navbar;
