import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes,  FaDumbbell, FaRunning, FaCouch,   FaUtensils, FaSeedling, FaFire, FaLeaf,  FaCheck, FaLightbulb  } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import {
  CheckCircle,
  Clock ,
  Droplet,
  Flame,
  Dumbbell,
  Utensils,
  Brain,
} from "lucide-react";


export default function Nutrition10() {
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

  
 const fastingMethods = [
  { method: "16:8 Method", fasting: "16 hours", eating: "8 hours", bestFor: "Weight loss, metabolism" },
  { method: "5:2 Diet", fasting: "2 days (500-600 kcal)", eating: "5 days normal eating", bestFor: "Fat loss, flexibility" },
  { method: "Eat-Stop-Eat", fasting: "24-hour fast (1–2× per week)", eating: "Normal on other days", bestFor: "Fat burning, autophagy" },
  { method: "Alternate-Day Fasting", fasting: "Every other day fasting", eating: "Normal eating on non-fasting days", bestFor: "Weight loss, longevity" },
  { method: "OMAD (One Meal a Day)", fasting: "23 hours", eating: "1 hour", bestFor: "Extreme fasting, fat loss" }
];

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


      {/* <div className="flex flex-col items-center p-6 max-w-9xl mx-auto"> */}
      <div className="w-full p-6 text-center shadow-lg bg-slate-900 mt-5">
      <h1 className="text-3xl font-bold text-center mb-4">
          🕒 The Science Behind Intermittent Fasting: Does It Really Work?
        </h1>
        <p className="text-lg text-gray-300 text-center mb-6">
          ➡ Benefits, meal timing strategies, and who should (or shouldn’t) try it.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Intermittent fasting (IF) has become one of the most popular health trends in recent years, with claims that it
          helps with weight loss, metabolism, brain function, and even longevity. But what does the science say?
        </p>
        <img
        src="/public/Nutrition/nutrition10.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />
        <p className="text-gray-300 leading-relaxed">
          Let’s break down the real benefits, different fasting methods, and who should or shouldn’t try intermittent fasting.
        </p>
        <h1 className="text-3xl font-bold mt-6 text-center mb-4 text-blue-700">
          🧬 What Is Intermittent Fasting?
        </h1>
        <p className="text-lg text-gray-100 mb-4">
          Intermittent fasting is not a diet—it’s an eating pattern that cycles between periods of eating and fasting. Unlike calorie-restrictive diets, IF focuses on <span className="font-semibold">when</span> you eat, rather than <span className="font-semibold">what</span> you eat.
        </p>
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">How Does It Work?</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul className="list-disc space-y-3 text-gray-700 pl-5">
            <li>
              <span className="font-bold">0–4 hours after eating:</span> Your body burns glucose for energy.
            </li>
            <li>
              <span className="font-bold">After 12 hours:</span> Insulin levels drop, prompting the body to use stored fat.
            </li>
            <li>
              <span className="font-bold">After 16–24 hours:</span> The body enters ketosis, burning more fat for fuel.
            </li>
            <li>
              <span className="font-bold">After 24+ hours:</span> Autophagy begins, where cells remove damaged components, improving cellular health.
            </li>
          </ul>
        <p className="text-lg text-blue-400 mt-4 text-center">
          By extending the time between meals, IF can help with <span className="font-semibold">fat burning</span>, <span className="font-semibold">insulin sensitivity</span>, and <span className="font-semibold">longevity</span>.
        </p>
        </div>


        <h1 className="text-3xl font-bold mt-6 text-center mb-6">
          🔬 Science-Backed Benefits of Intermittent Fasting
        </h1>
        <div className="space-y-8">
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">1️⃣ Weight Loss & Fat Burning</h2>
            <p className="mt-2">📌 <strong>Why It Works:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Reduces insulin levels → Enhances fat-burning.</li>
              <li>Increases metabolism → Boosts calorie burn by 3–14% (American Journal of Clinical Nutrition).</li>
              <li>Reduces calorie intake → Naturally leads to fewer meals/snacks.</li>
            </ul>
            <p className="mt-3 text-green-400">✅ Evidence: A 2020 study (New England Journal of Medicine) found that IF can reduce body weight by 3–8% over 3–24 weeks.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">2️⃣ Improves Insulin Sensitivity & Blood Sugar Control</h2>
            <p className="mt-2">📌 <strong>Why It Works:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Reduces insulin resistance → Helps prevent Type 2 diabetes.</li>
              <li>Lowers fasting blood sugar by 3–6% in people with prediabetes (Translational Research, 2014).</li>
            </ul>
            <p className="mt-3 text-green-400">✅ Best for: People with insulin resistance or metabolic syndrome.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">3️⃣ Supports Brain Health & Longevity</h2>
            <p className="mt-2">📌 <strong>Why It Works:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Increases BDNF, a protein that supports cognitive function.</li>
              <li>Reduces inflammation and may protect against Alzheimer’s and Parkinson’s.</li>
              <li>Activates autophagy, removing damaged cells and promoting longevity.</li>
            </ul>
            <p className="mt-3 text-green-400">✅ Evidence: A study in Nature Communications (2019) found fasting increases lifespan by reducing oxidative stress.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">4️⃣ Reduces Inflammation & Boosts Heart Health</h2>
            <p className="mt-2">📌 <strong>Why It Works:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Lowers cholesterol & blood pressure.</li>
              <li>Reduces inflammatory markers linked to heart disease.</li>
            </ul>
            <p className="mt-3 text-green-400">✅ Evidence: A study (Cell Metabolism, 2016) showed IF can lower LDL cholesterol by 10–20%, reducing heart disease risk.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">5️⃣ Boosts Growth Hormone (HGH) for Muscle Preservation</h2>
            <p className="mt-2">📌 <strong>Why It Works:</strong></p>
            <ul className="list-disc pl-5 mt-1">
              <li>Fasting increases HGH by up to 5X, aiding fat loss and muscle retention.</li>
              <li>Supports muscle recovery and repair during workouts.</li>
            </ul>
            <p className="mt-3 text-green-400">✅ Best for: Those looking to lose fat while maintaining muscle.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold  gap-2 mb-4">
        <div className="text-red-500 flex items-center mt-5" /> Popular Intermittent Fasting Methods
      </h2>
      <p className="text-gray-300 mb-4">
        There are different ways to practice IF, depending on your lifestyle and goals.
      </p>
      <div className="p-4 bg-gray-800 rounded-xl overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="p-3 text-sm md:text-base">Method</th>
          <th className="p-3 text-sm md:text-base">Fasting Window</th>
          <th className="p-3 text-sm md:text-base">Eating Window</th>
          <th className="p-3 text-sm md:text-base">Best For</th>
        </tr>
      </thead>
      <tbody>
        {fastingMethods.map((item, index) => (
          <tr key={index} className="border-b border-gray-700">
            <td className="p-3 font-semibold text-red-400 text-sm md:text-base">{item.method}</td>
            <td className="p-3 text-sm md:text-base">{item.fasting}</td>
            <td className="p-3 text-sm md:text-base">{item.eating}</td>
            <td className="p-3 text-sm md:text-base">{item.bestFor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<div className="mt-4 flex flex-wrap items-center text-green-400 font-semibold text-sm md:text-base leading-tight">
  <CheckCircle className="mr-2 flex-shrink-0 w-5 h-5" />
  <span>Most Beginner-Friendly:</span>
  <span className="text-white"> 16:8 Method </span>
  <span className="text-gray-300">(skipping breakfast & eating from 12 PM–8 PM).</span>
</div>
     
      <h2 className="text-2xl font-bold text-center mt-6 mb-4">🤔 Who Should (or Shouldn’t) Try Intermittent Fasting?</h2>
        
        {/* Who should try IF */}
        <div className="bg-gray-700 p-4 rounded-xl mb-4">
          <h3 className="text-green-400 font-semibold text-lg">✔️ IF is a Good Fit For:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>✅ People looking for weight loss without calorie counting.</li>
            <li>✅ Those who struggle with late-night snacking.</li>
            <li>✅ Individuals with insulin resistance or prediabetes.</li>
            <li>✅ People looking for mental clarity and energy stability.</li>
          </ul>
        </div>

        {/* Who should avoid IF */}
        <div className="bg-gray-700 p-4 rounded-xl">
          <h3 className="text-red-400 font-semibold text-lg">❌ Who Should Avoid Intermittent Fasting?</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>⚠ Pregnant or breastfeeding women – Need consistent energy for maternal health.</li>
            <li>⚠ People with a history of eating disorders – IF can trigger unhealthy eating patterns.</li>
            <li>⚠ Diabetics on medication – Can cause hypoglycemia (low blood sugar).</li>
            <li>⚠ Athletes with high-intensity training – May require more frequent fuel.</li>
          </ul>
        </div>

        <h2 className="text-2xl mt-9 font-bold text-blue-400 flex items-center mb-4">
          🍽️ How to Start Intermittent Fasting (Without Feeling Starved)
        </h2>
        <ul className="space-y-4 text-lg">
          <li className="flex items-center gap-3">
            🔹 <span><strong>Ease into it:</strong> Start with 12-hour fasting (8 PM–8 AM) and gradually increase.</span>
          </li>
          <li className="flex items-center gap-3">
            💧 <span><strong>Stay hydrated:</strong> Drink plenty of water, herbal teas, and black coffee.</span>
          </li>
          <li className="flex items-center gap-3">
            🥗 <span><strong>Eat nutrient-dense meals:</strong> Focus on protein, fiber, and healthy fats.</span>
          </li>
          <li className="flex items-center gap-3">
            🚫 <span><strong>Avoid overeating post-fast:</strong> Stick to whole foods, not junk food binges.</span>
          </li>
          <li className="flex items-center gap-3">
            👂 <span><strong>Listen to your body:</strong> If you feel dizzy or overly fatigued, adjust your eating window.</span>
          </li>
        </ul>

        
      <div className="bg-white bg-opacity-10 mt-5 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-8xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">🚀 Final Thoughts: Does Intermittent Fasting Work?</h2>
        <p className="text-lg text-gray-300 mb-4">
        🔬 Science shows that IF is effective for weight loss, fat burning, insulin sensitivity, brain health, and longevity. However, it’s not a magic bullet—what you eat still matters!
        </p>
        <p className="text-lg text-gray-300 mb-4">👨‍⚕️ Before starting IF, consult with a healthcare professional, especially if you have underlying conditions.</p>
        <div className="mt-6 border-t border-gray-500 pt-4">
          <p className="text-lg font-semibold text-gray-200">💬 Have you tried intermittent fasting?</p>
          <input 
            type="text" 
            placeholder="Share your thoughts..." 
            className="w-full p-3 mt-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/home"
          className="text-blue-500 font-semibold hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
    </div>

  );
}
