import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes,  FaDumbbell, FaRunning, FaCouch,   FaUtensils, FaSeedling, FaFire, FaLeaf,  FaCheck, FaLightbulb  } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import {
  CheckCircle,
  Droplet,
  Flame,
  Dumbbell,
  Utensils,
  Brain,
} from "lucide-react";


export default function Nutrition9() {
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
  
  const snacks = [
    {
      title: "Greek Yogurt with Berries & Chia Seeds",
      protein: "15g",
      fiber: "6g",
      calories: "~180",
      description: "High-protein Greek yogurt keeps you full, while chia seeds and berries add fiber and antioxidants.",
      tip: "Choose unsweetened yogurt to avoid added sugars."
    },
    {
      title: "Hard-Boiled Eggs & Avocado Slices",
      protein: "12g",
      fats: "10g",
      calories: "~220",
      description: "Eggs provide high-quality protein and healthy fats, while avocado boosts satiety and heart health.",
      tip: "Sprinkle sea salt and chili flakes for extra flavor!"
    },
    {
      title: "Apple Slices with Almond Butter",
      protein: "5g",
      fiber: "6g",
      calories: "~200",
      description: "Apples provide slow-digesting carbs and fiber, while almond butter adds healthy fats and protein.",
      tip: "Stick to 1 tbsp of almond butter to keep calories in check."
    },
    {
      title: "Cottage Cheese with Walnuts & Cinnamon",
      protein: "15g",
      fats: "8g",
      calories: "~180",
      description: "Cottage cheese is high in casein protein, which digests slowly and keeps you full. Walnuts add omega-3s, while cinnamon helps regulate blood sugar.",
      tip: "Use low-fat cottage cheese for a lower-calorie option."
    },
    {
      title: "Hummus & Veggie Sticks",
      protein: "6g",
      fiber: "8g",
      calories: "~150",
      description: "Hummus provides plant-based protein and healthy fats, while veggies add fiber and micronutrients.",
      tip: "Use carrots, cucumber, and bell peppers for variety."
    },
    {
      title: "Tuna Salad Lettuce Wraps",
      protein: "20g",
      fats: "5g",
      calories: "~200",
      description: "Tuna is protein-packed and low in calories, while lettuce wraps keep it light and fresh.",
      tip: "Use Greek yogurt instead of mayo for a healthier, creamy texture."
    },
    {
      title: "Dark Chocolate & Almonds",
      protein: "6g",
      fats: "10g",
      calories: "~200",
      description: "Dark chocolate (70% cocoa or higher) satisfies sweet cravings, while almonds provide protein and healthy fats.",
      tip: "Stick to 1 oz of dark chocolate and 10–12 almonds for portion control."
    },
    {
      title: "Protein Smoothie with Banana & Peanut Butter",
      protein: "20g",
      fiber: "5g",
      calories: "~250",
      description: "Protein powder, peanut butter, and banana create a balanced snack with muscle-repairing protein, fiber, and slow-digesting carbs.",
      tip: "Blend with unsweetened almond milk for fewer calories."
    },
    {
      title: "Roasted Chickpeas with Spices",
      protein: "8g",
      fiber: "6g",
      calories: "~180",
      description: "Chickpeas are high in plant-based protein and fiber, keeping you full longer.",
      tip: "Roast with olive oil, paprika, and sea salt for a crunchy snack."
    },
    {
      title: "Air-Popped Popcorn with Nutritional Yeast",
      protein: "4g",
      fiber: "6g",
      calories: "~130",
      description: "Popcorn is a low-calorie, high-fiber whole grain, and nutritional yeast adds a cheesy flavor + B vitamins.",
      tip: "Skip butter & artificial flavorings—stick to olive oil and natural seasonings."
    }
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


      {/* <div className="flex flex-col items-center p-6 max-w-9xl mx-auto"> */}
      <div className="w-full p-6 text-center shadow-lg bg-slate-900 mt-5">
        <h2 className="text-xl font-bold text-green-600 mb-2">🍏 Healthy Snacks for Weight Loss & Sustained Energy</h2>
        
        <p className="text-gray-100 text-sm mt-4">
          ➡ Quick and nutritious snack ideas to keep cravings under control.
        </p>

        <div className="mt-4 text-left">
          <p className="text-gray-100 text-sm">
            When hunger strikes between meals, choosing the right snack can make a big difference in your energy levels, metabolism, and weight loss progress. The best snacks for weight loss are nutrient-dense, high in protein and fiber, and low in added sugars—helping you stay full for longer and avoid overeating.
          </p>
        </div>
        <img
        src="/public/Nutrition/nutrition9.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />
        <div className="mt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-100">🥗 Science-Backed Guide to Healthy Snacking</h3>
          <p className="text-gray-100 text-sm mt-2">
            Here’s a science-backed guide to healthy snacks that support weight loss, curb cravings, and provide lasting energy!
          </p>
        </div>

        <div className="w-full p-6 text-center shadow-lg">

        <div className="mt-6 text-left border-t pt-4">
          <h3 className="text-lg font-semibold text-blue-600">🔬 What Makes a Snack Healthy?</h3>
          <ul className="text-gray-100 text-sm space-y-2 mt-2">
            <li>✔ <strong>Balance macronutrients</strong> – Combine protein, healthy fats, and fiber to keep you full.</li>
            <li>✔ <strong>Be nutrient-dense</strong> – Provide vitamins, minerals, and antioxidants for overall health.</li>
            <li>✔ <strong>Avoid processed sugars</strong> – Reduce blood sugar spikes that cause cravings and energy crashes.</li>
            <li>✔ <strong>Be portion-controlled</strong> – Prevent over-snacking, which can lead to extra calorie intake.</li>
          </ul>
        </div>

        <div className="mt-6 text-left border-t pt-4">
          <h3 className="text-lg font-semibold text-purple-600">📌 Ideal Snack Composition:</h3>
          <ul className="text-gray-100 text-sm space-y-2 mt-2">
            <li>🧬 <strong>Protein (10–15g)</strong> – Helps reduce hunger hormones and maintains muscle mass.</li>
            <li>🥑 <strong>Healthy Fats (5–10g)</strong> – Keeps you full and supports brain function.</li>
            <li>🌾 <strong>Fiber (5–10g)</strong> – Slows digestion, stabilizing blood sugar and keeping hunger in check.</li>
          </ul>
        </div>
      </div>


      <h2 className="text-3xl font-bold mt-6 mb-4 text-green-800">🥗 10 Healthy Snack Ideas for Weight Loss & Energy</h2>
      <div className="space-y-4">
        {snacks.map((snack, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">{index + 1}️⃣ {snack.title}</h3>
            <p className="text-gray-600 text-sm">✔ <strong>Protein:</strong> {snack.protein} | <strong>Fiber:</strong> {snack.fiber || "-"} | <strong>Healthy Fats:</strong> {snack.fats || "-"} | <strong>Calories:</strong> {snack.calories}</p>
            <p className="text-gray-600 mt-2">✨ <strong>Why it Works:</strong> {snack.description}</p>
            <p className="text-gray-600 mt-2">📌 <strong>Tip:</strong> {snack.tip}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-5 font-bold text-red-600 flex items-center mb-4">
        🚫 Snacks to Avoid (They Sabotage Weight Loss!)
      </h2>
      <ul className="space-y-3 text-gray-800">
        <li className="bg-red-50 p-3 rounded-lg shadow">
          ❌ <span className="font-semibold">Granola Bars & Flavored Yogurts</span> – Often packed with hidden sugars and processed carbs.
        </li>
        <li className="bg-red-50 p-3 rounded-lg shadow">
          ❌ <span className="font-semibold">Chips & Crackers</span> – High in refined carbs and unhealthy fats (leads to overeating!).
        </li>
        <li className="bg-red-50 p-3 rounded-lg shadow">
          ❌ <span className="font-semibold">Sugary Coffee Drinks</span> – Can contain 300+ calories and 40g+ sugar (spikes cravings).
        </li>
        <li className="bg-red-50 p-3 rounded-lg shadow">
          ❌ <span className="font-semibold">Juices & Soda</span> – Liquid calories don’t keep you full and can increase hunger.
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-green-600 flex items-center mt-6 mb-4">
        🔥 Pro Tips for Smart Snacking
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg shadow">
          ✅ <span className="font-semibold">Plan Ahead</span> – Keep healthy snacks prepped to avoid unhealthy choices.
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          ✅ <span className="font-semibold">Stay Hydrated</span> – Dehydration often feels like hunger—drink water first!
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          ✅ <span className="font-semibold">Stick to Whole Foods</span> – Less processing = better nutrients and satiety.
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          ✅ <span className="font-semibold">Use Protein & Fiber</span> – The best combo for long-lasting energy and fullness.
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          ✅ <span className="font-semibold">Watch Portions</span> – Even healthy snacks can lead to overeating if you don’t control portions.
        </div>
      </div>

      <div className="bg-white bg-opacity-10 mt-5 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-8xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">🚀 Final Thoughts: Snack Smart & Stay Energized!</h2>
        <p className="text-lg text-gray-300 mb-4">
          A well-planned snack can help you stay full, control cravings, and support weight loss goals. 
          Choose high-protein, fiber-rich options that provide steady energy and essential nutrients.
        </p>
        <div className="mt-6 border-t border-gray-500 pt-4">
          <p className="text-lg font-semibold text-gray-200">💬 What’s your favorite healthy snack?</p>
          <input 
            type="text" 
            placeholder="Share your thoughts..." 
            className="w-full p-3 mt-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    {/* </div> */}
     

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
