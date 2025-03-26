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
            Nutrition
          </h2>

          <div className="flex flex-col flex-wrap md:flex-row items-center  shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition1.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Ultimate Guide to Meal Prepping for a Healthy Lifestyle
              </h3>
              <p className="text-gray-600 mt-2">
                In this guide, you'll learn: <br /> ✅ The benefits of meal
                prepping <br /> ✅ How to plan your meals efficiently <br /> ✅
                Meal prepping methods that work best for you <br /> ✅ Best
                foods for meal prep <br /> ✅ How to store meals properly to
                keep them fresh
              </p>
              <Link
                to="/nut-article"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition2.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                How to Balance Protein, Carbs, and Fats for Optimal Health
              </h3>
              <p className="text-gray-600 mt-2">
                This guide breaks down: <br />
                ✔ The role of each macronutrient in your body <br />
                ✔ How to determine the right ratio for your goals <br />
                ✔ Food sources for protein, carbs, and fats <br />
                ✔ Practical meal planning tips for balance <br />
              </p>
              <Link
                to="/nut-article2"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition3.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Best Superfoods to Boost Energy and Immunity
              </h3>
              <p className="text-gray-600 mt-2">
                This guide will cover: <br />
                ✔ The best superfoods for energy & immunity <br />
                ✔ How they work in the body <br />✔ Easy ways to include them in
                your diet
              </p>
              <Link
                to="/nut-article3"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition4.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Hydration Hacks: How Much Water Do You Really Need?
              </h3>
              <p className="text-gray-600 mt-2">
                In this article, we’ll cover: <br />✅ How water impacts
                digestion, metabolism, and performance <br />
                ✅ How much water you really need daily <br />
                ✅ Signs of dehydration & how to prevent it <br />✅ Hydration
                hacks to meet your daily water intake goals
              </p>
              <Link
                to="/nut-article4"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition5.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Eating for Muscle Growth: Best Foods to Support Strength Gains
              </h3>
              <p className="text-gray-600 mt-2">
                In this guide, we’ll cover: <br />
                ✅ Essential nutrients for muscle growth <br />
                ✅ Best muscle-building foods <br />
                ✅ How to structure meals for strength gains <br />✅ Example
                meal plans for muscle growth
              </p>
              <Link
                to="/nut-article5"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition6.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Truth About Sugar: How to Reduce Cravings & Improve Your
                Diet
              </h3>
              <p className="text-gray-600 mt-2">
                In this guide, we’ll explore: <br />
                ✅ How sugar affects your body <br />
                ✅ Why sugar cravings happen & how to manage them <br />
                ✅ Healthier sugar alternatives <br />✅ Simple strategies to
                cut back on sugar without sacrificing taste
              </p>
              <Link
                to="/nut-article6"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition7.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                The Best Anti-Inflammatory Foods for Recovery & Wellness
              </h3>
              <p className="text-gray-600 mt-2">
                In This Guide: <br />
                ✅ What is inflammation & why does it matter? <br />
                ✅ Top anti-inflammatory foods to include in your diet <br />
                ✅ Best meal ideas for recovery & long-term health <br />✅
                Foods that cause inflammation (what to avoid!)
              </p>
              <Link
                to="/nut-article7"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition8.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
                Plant-Based Nutrition: How to Get Enough Protein on a Vegan Diet
              </h3>
              <p className="text-gray-600 mt-2">
                This guide will help you understand how much protein you need,
                the best plant-based protein sources, and how to build balanced
                meals for optimal health and performance.
              </p>
              <Link
                to="/nut-article8"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

              {/* Image Section */}
              <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition9.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
              Healthy Snacks for Weight Loss & Sustained Energy
              </h3>
              <p className="text-gray-600 mt-2">
              Here’s a science-backed guide to healthy snacks that support weight loss, curb cravings, and provide lasting energy!
              </p>
              <Link
                to="/nut-article9"
                className="text-blue-500 font-semibold mt-4 inline-block"
              >
                READ MORE
              </Link>
            </div>

              {/* Image Section */}
              <div className="w-full md:w-1/2">
              <img
                src="/public/Nutrition/nutrition10.png"
                alt="Elderly woman doing plank exercise"
                className="w-96 h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-xl font-semibold">
              The Science Behind Intermittent Fasting: Does It Really Work?
              </h3>
              <p className="text-gray-600 mt-2">
              Let’s break down the real benefits, different fasting methods, and who should or shouldn’t try intermittent fasting
              </p>
              <Link
                to="/nut-article10"
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
