import React from "react";
// import { div, div } from "@/components/ui/div";
import {
  FaLeaf,
  FaAppleAlt,
  FaFish,
  FaLemon,
  FaSeedling,
  FaHeartbeat,
} from "react-icons/fa";
import { MdLocalDrink, MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  CheckCircle,
  Droplet,
  Flame,
  Dumbbell,
  Utensils,
  Brain,
} from "lucide-react";
import { FaTint, FaGlassWhiskey, FaRunning } from "react-icons/fa";

export default function Nutrition4() {
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);

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
            <Link to="/profile" className="hover:text-blue-400 transition">
              Profile
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
            <Link to="/home" className="py-2 px-4 hover:bg-gray-700 rounded-md">
              Home
            </Link>
            <Link to="/meal" className="py-2 px-4 hover:bg-gray-700 rounded-md">
              Meal
            </Link>
            <Link
              to="/workout"
              className="py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Workout
            </Link>
            <Link
              to="/profile"
              className="py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Profile
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

      <h1 className="text-3xl font-bold text-center mt-5 mb-6 text-gray-400">
        Hydration Hacks: How Much Water Do You Really Need?
      </h1>
      <p className="text-gray-100 text-center mb-8">
        Water is the foundation of life and plays a critical role in digestion,
        metabolism, and overall fitness performance. Yet, many people are
        chronically dehydrated without realizing it.
      </p>

      <img
        src="/public/Nutrition/nutrition4.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />

      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-yellow-400">
          In this article, we’ll cover:
        </h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✅ How water impacts digestion, metabolism, and performance</li>
          <li>✅ How much water you really need daily</li>
          <li>✅ Signs of dehydration & how to prevent it</li>
          <li>✅ Hydration hacks to meet your daily water intake goals</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
        <Droplet /> Why Hydration Matters: The Role of Water in the Body
      </h2>
      <p className="mt-2 text-gray-300">
        Water makes up about{" "}
        <span className="font-semibold text-white">60% of your body</span> and
        is involved in every essential function.
      </p>
      <div className="space-y-4 mt-4">
        <div className="bg-gray-800">
          <div className="p-4 flex items-center gap-3">
            <CheckCircle className="text-blue-400" />
            <span>
              {" "}
              <span className="font-semibold text-white">
                Boosts Circulation
              </span>{" "}
              – Helps transport oxygen & nutrients throughout the body.
            </span>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="p-4 flex items-center gap-3">
            <Flame className="text-yellow-400" />
            <span>
              {" "}
              <span className="font-semibold text-white">
                Speeds Up Metabolism
              </span>{" "}
              – Even mild dehydration can slow metabolism by 2-3% (Journal of
              Clinical Endocrinology & Metabolism).
            </span>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="p-4 flex items-center gap-3">
            <Dumbbell className="text-red-400" />
            <span>
              {" "}
              <span className="font-semibold text-white">
                Enhances Workout Performance
              </span>{" "}
              – Prevents muscle fatigue, maintains endurance, and supports joint
              lubrication.
            </span>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="p-4 flex items-center gap-3">
            <Utensils className="text-green-400" />
            <span>
              {" "}
              <span className="font-semibold text-white">Aids Digestion</span> –
              Helps break down food and move nutrients through the digestive
              tract.
            </span>
          </div>
        </div>
        <div className="bg-gray-800">
          <div className="p-4 flex items-center gap-3">
            <Brain className="text-purple-400" />
            <span>
              {" "}
              <span className="font-semibold text-white">
                Improves Focus & Mood
              </span>{" "}
              – Dehydration leads to brain fog, fatigue, and irritability.
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-300 font-semibold bg-gray-800 p-3 rounded-lg border-l-4 border-blue-400">
        📌 <span className="text-blue-400">Fact:</span> Losing just 1-2% of body
        water can significantly impact your physical and cognitive performance
        (National Academy of Sciences).
      </p>

      <h1 className="text-2xl font-bold text-center mt-5 mb-4 text-blue-400">
        📊 How Much Water Do You Really Need?
      </h1>

      <div className="bg-gray-800 p-4 mb-4">
        <divContent>
          <h2 className="text-lg font-semibold text-blue-300">
            General Guidelines
          </h2>
          <ul className="mt-2 space-y-2 text-gray-300">
            <li>
              ✔ Men: <span className="font-bold">~3.7 liters (125 oz)</span> per
              day
            </li>
            <li>
              ✔ Women: <span className="font-bold">~2.7 liters (91 oz)</span>{" "}
              per day
            </li>
            <li>
              ✔ Athletes & active individuals:{" "}
              <span className="font-bold">+500-1000 ml</span>
            </li>
            <li>
              ✔ Hot climates or high altitudes:{" "}
              <span className="font-bold">
                Increase intake by 500 ml – 1 liter
              </span>
            </li>
          </ul>
        </divContent>
      </div>

      <div className="bg-gray-800 p-4 mb-4">
        <divContent>
          <h2 className="text-lg font-semibold text-blue-300">
            🚰 Hydration Formula (Based on Weight)
          </h2>
          <p className="text-gray-300 mt-2">
            Drink <span className="font-bold">½ to 1 ounce</span> of water per
            pound of body weight.
          </p>
          <div className="mt-4">
            <p className="text-gray-300 mb-2">
              👉 A <span className="font-bold">150 lb (68 kg)</span> person
              needs:
            </p>
            <div value={50} className="bg-blue-600 h-4 rounded-md" />
            <p className="mt-2 text-gray-300">75-150 oz (2.2-4.4 L) daily</p>
          </div>
        </divContent>

        <div className="flex justify-around text-gray-300 text-lg mt-6">
          <div className="flex items-center">
            <FaTint className="text-blue-400 mr-2" /> <span>Stay Hydrated</span>
          </div>
          <div className="flex items-center">
            <FaGlassWhiskey className="text-yellow-400 mr-2" />{" "}
            <span>Track Intake</span>
          </div>
          <div className="flex items-center">
            <FaRunning className="text-green-400 mr-2" />{" "}
            <span>Adjust for Activity</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-8 text-blue-600 dark:text-blue-400  gap-2">
          🚨 Signs of Dehydration & How to Prevent It
        </h2>

        <div className="mt-4 bg-black bg-opacity-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-500">
            🚩 Common Signs of Dehydration:
          </h3>
          <ul className="list-disc list-inside  text-gray-400 dark:text-gray-300 mt-2">
            <li>❌ Dark yellow urine</li>
            <li>❌ Dry skin & lips</li>
            <li>❌ Headaches & dizziness</li>
            <li>❌ Muscle cramps</li>
            <li>❌ Fatigue & brain fog</li>
          </ul>
        </div>

        <div className="mt-6 bg-black bg-opacity-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-500">
            💦 Quick Fixes to Stay Hydrated:
          </h3>
          <ul className="list-disc list-inside text-gray-400 dark:text-gray-300 mt-2">
            <li>✅ Start your day with a glass of water</li>
            <li>✅ Carry a refillable water bottle</li>
            <li>✅ Eat water-rich foods (cucumbers, watermelon, oranges)</li>
            <li>✅ Set hydration reminders on your phone</li>
            <li>✅ Drink before you feel thirsty</li>
          </ul>
        </div>

        <p className="mt-4 text-gray-300 font-semibold bg-slate-900 p-3 rounded-lg border-l-4 border-blue-400">
          📌 <span className="text-blue-400">Fact:</span> Losing just 1-2% of
          body water can significantly impact your physical and cognitive
          performance (National Academy of Sciences).
        </p>
      </div>

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        🛠️ Hydration Hacks: How to Drink More Water Daily
      </h2>

      <ul className="space-y-3 text-gray-300">
        <li>
          💙 <strong>Flavor It Naturally</strong> – Add lemon, mint, berries, or
          cucumber for a refreshing taste.
        </li>
        <li>
          💙 <strong>Use the “8x8 Rule”</strong> – Drink 8 oz of water, 8 times
          a day for a simple hydration plan.
        </li>
        <li>
          💙 <strong>Follow the “1:1 Rule”</strong> – Drink 1 glass of water for
          every cup of coffee or alcohol.
        </li>
        <li>
          💙 <strong>Eat Hydrating Foods</strong> – 20% of daily water intake
          comes from fruits & vegetables.
        </li>
        <li>
          💙 <strong>Invest in a Smart Bottle</strong> – Some bottles track
          daily intake & remind you to drink.
        </li>
        <li>
          💙 <strong>Pre-Hydrate for Workouts</strong> – Drink 500 ml (17 oz)
          1-2 hours before exercise.
        </li>
        <li>
          💙 <strong>Drink Herbal Teas</strong> – Green tea, chamomile, and
          hibiscus count toward hydration.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-700 mt-6">
        💪 Hydration & Fitness Performance
      </h3>
      <p className="text-gray-100 mt-2">
        Dehydration can hurt your athletic performance by reducing endurance,
        strength, and recovery.
      </p>

      <ul className="mt-4 space-y-2 text-gray-300">
        <li>
          🏋️ <strong>Before Exercise:</strong> Drink 16-20 oz (500 ml) 1-2 hours
          before.
        </li>
        <li>
          🏃 <strong>During Exercise:</strong> Sip 4-8 oz every 15-20 minutes
          (more if sweating heavily).
        </li>
        <li>
          🛑 <strong>After Exercise:</strong> Rehydrate with water &
          electrolytes to restore balance.
        </li>
      </ul>

      <p className="text-gray-700 mt-6 p-4 bg-blue-200 rounded-lg">
        📌 <strong>Tip:</strong> If you sweat a lot, try coconut water,
        electrolyte drinks, or a pinch of sea salt in your water.
      </p>

      <div className="p-4 bg-gray-800 mt-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🎯 Key Takeaways:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />Drink ½ to 1 ounce of water per pound of body weight
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" /> Hydrate before you feel thirsty to prevent dehydration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />Use hydration hacks to make drinking water effortless
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" />  Support hydration with water-rich foods & electrolyte balance
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
              <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                <div className="text-red-500" /> Challenge:
              </h3>
              <p className="mt-2 text-gray-300">
              Track your water intake for <span className="text-yellow-400 font-semibold">one week & </span> notice the difference in energy & performance!
              </p>
            </div>
            <p className="text-center mt-6 text-lg text-gray-300">
            !

💬 How do you stay hydrated?
            </p>
      

      <div className="mt-6">
        <Link
          to="/home"
          className="text-blue-500 font-semibold hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
