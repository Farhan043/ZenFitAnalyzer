import React from "react";
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
import {
  FaDumbbell,
  FaClock,
  FaTint,
  FaFish,
  FaSeedling,
  FaLightbulb,
  FaAppleAlt,
  FaDrumstickBite,
} from "react-icons/fa";
import { GiMeal, GiMuscleUp } from "react-icons/gi";

export default function Nutrition6() {
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
        The Truth About Sugar: How to Reduce Cravings & Improve Your Diet
      </h1>
      <p className="text-gray-100 text-center mb-8">
        Sugar is everywhere. From morning coffee to packaged snacks, it sneaks
        into our diets more than we realize. While natural sugars from fruits
        and whole foods are beneficial, excess added sugar can lead to weight
        gain, energy crashes, and long-term health risks.
      </p>

      <img
        src="/public/Nutrition/nutrition6.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />

      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-yellow-400">
          In this guide, we’ll explore:
        </h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✅ How sugar affects your body</li>
          <li>✅ Why sugar cravings happen & how to manage them</li>
          <li>✅ Healthier sugar alternatives</li>
          <li>
            ✅ Simple strategies to cut back on sugar without sacrificing taste
          </li>
        </ul>
      </div>

      <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
        <div className="text-blue-500" /> 🧬 The Effects of Sugar on Your Body
      </h1>
      <p className="text-gray-200 mt-2">
        Too much sugar can negatively impact your metabolism, brain function,
        and overall health. Here’s what happens when you consume excessive
        sugar:
      </p>

      <div className="mt-4 space-y-4">
        <div className="flex items-center bg-blue-50 p-3 rounded-lg">
          <div className="text-blue-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>🔥 Blood Sugar Spikes & Crashes</strong> – Leads to energy
            crashes, cravings, and hunger.
          </p>
        </div>

        <div className="flex items-center bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>🧠 Increased Sugar Addiction</strong> – Sugar stimulates
            dopamine release, making it addictive (American Journal of Clinical
            Nutrition).
          </p>
        </div>

        <div className="flex items-center bg-green-50 p-3 rounded-lg">
          <divl className="text-green-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>⚖️ Weight Gain & Fat Storage </strong> – Excess sugar is
            stored as fat, increasing obesity risk.
          </p>
        </div>

        <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
          <div className="text-indigo-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>🩸 Higher Risk of Type 2 Diabetes</strong> – Frequent sugar
            intake leads to insulin resistance.
          </p>
        </div>

        <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
          <div className="text-indigo-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>🦷 Tooth Decay</strong> – Sugar feeds bacteria in your
            mouth, causing cavities.
          </p>
        </div>

        <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
          <div className="text-indigo-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>💤 Disrupts Sleep </strong> – High sugar intake affects
            melatonin production, making it harder to sleep.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
        <p className="text-gray-700">
          📌 <strong>Fact:</strong> The American Heart Association (AHA)
          recommends limiting added sugar to:
          <ul className="list-disc list-inside ">
            <li>Men: 36g (9 teaspoons) per day</li>{" "}
            <li>Women: 25g (6 teaspoons) per day</li>
          </ul>
        </p>

        <p className="mt-2 text-gray-700">
          However, the average American consumes 77g (19 teaspoons) of added
          sugar daily—3x the recommended amount!
        </p>
      </div>



      <h1 className="text-3xl font-bold mt-6 text-center mb-6">🍩 Why Do We Crave Sugar?</h1>
      <p className="text-lg">Sugar cravings happen due to hormonal imbalances, stress, and poor diet choices.</p>
      
      <div className="mt-4 space-y-3">
        <p><strong>🔹 Blood Sugar Imbalances –</strong>  When blood sugar drops, your brain signals a craving for quick energy (sugar).</p>
        <p><strong>🔹 Lack of Protein & Fiber –</strong>  Low-protein, high-carb diets lead to sugar cravings.</p>
        <p><strong>🔹 Stress & Emotional Eating –</strong> Cortisol (stress hormone) increases cravings for sweets.</p>
        <p><strong>🔹 Dopamine Release –</strong> Sugar triggers a pleasure response, leading to addiction-like cravings.</p>
        <p><strong>🔹 Dehydration –</strong> Thirst is often mistaken for hunger, increasing sugar cravings.</p>
      </div>
      
      <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500">
        <p className="font-semibold">📌 Tip:</p>
        <p>Balancing protein, healthy fats, and fiber can help reduce sugar cravings naturally.</p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8">🚫 How to Reduce Sugar Cravings Naturally</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li><strong>✅ Eat More Protein & Healthy Fats –</strong>Keeps you full longer & stabilizes blood sugar.</li>
        <li><strong>✅ Stay Hydrated –</strong>Dehydration can increase cravings for sugar & junk food.</li>
        <li> <strong>✅ Choose Complex Carbs –</strong>Whole grains, fruits, & vegetables prevent energy crashes.</li>
        <li><strong>✅ Manage Stress –</strong>Practice meditation, deep breathing, or exercise to reduce stress-related sugar cravings.</li>
        <li><strong>✅ Get Enough Sleep –</strong> Lack of sleep increases ghrelin (hunger hormone), making you crave sugar.</li>
        <li><strong>✅ Eat More Sugar –</strong> Slows down sugar absorption & keeps hunger in check.</li>
        <li><strong>Avoid Processed Foods</strong>Many processed foods contain hidden sugars, even in savory products.</li>
      </ul>
      
      <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500">
        <p className="font-semibold">📌 Fact:</p>
        <p>Eating 20-30g of protein at breakfast reduces sugar cravings throughout the day (Journal of Nutrition).</p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8">🍯 Healthier Sugar Alternatives</h2>
      <p className="mt-2">If you want to satisfy your sweet tooth without harming your health, try natural sugar substitutes:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li><strong>✅ Stevia -</strong> Zero-calorie, plant-based sweetener (great for diabetes).</li>
        <li><strong>✅ Monk Fruit -</strong> No calories & doesn’t spike blood sugar.</li>
        <li><strong>✅ Raw Honey -</strong> Rich in antioxidants, but should be consumed in moderation.</li>
        <li><strong>✅ Maple Syrup –</strong>Natural, unprocessed sugar alternative.</li>
        <li><strong>✅ Coconut Sugar – </strong>Lower glycemic index than white sugar.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8">🚫 What to Avoid?</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2 text-red-600">
        <li>🚫 Artificial sweeteners like aspartame & sucralose can disrupt gut health & increase cravings.</li>
        <li>🚫 High-fructose corn syrup (HFCS) found in sodas & processed foods contributes to weight gain & metabolic disorders.</li>
      </ul>

      <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500">
        <p className="font-semibold">📌 Tip:</p>
        <p>Choose whole foods for natural sweetness—fruits, cinnamon, and vanilla can enhance flavor without extra sugar!</p>
      </div>
      
      <h2 className="text-2xl font-semibold mt-8">🥗 How to Cut Back on Sugar (Without Feeling Deprived!)</h2>
      <p className="mt-2">Reducing sugar doesn’t mean giving up delicious food. Here’s how you can lower sugar intake without sacrificing taste:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li><strong>🥣 Swap sugary breakfasts for protein-packed options – </strong> Instead of sugary cereal, try Greek yogurt with nuts & berries.</li>
        <li><strong>🥤 Replace sugary drinks with infused water  – </strong>Add lemon, mint, or cucumber for natural flavor.</li>
        <li><strong>🍫 Choose dark chocolate (70%+ cocoa) –</strong> Less sugar & packed with antioxidants.</li>
        <li><strong>🍎 Eat whole fruits instead of processed snacks –</strong> Apples, oranges, or bananas satisfy sweet cravings.</li>
        <li><strong>🥞 Use cinnamon instead of sugar  –</strong> Naturally sweetens coffee, oatmeal, and desserts.</li>
        <li><strong>🛒 Read food labels carefully –</strong> Look out for hidden sugars in condiments, sauces, and "healthy" snacks.</li>
      </ul>
      
      <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
        <p className="font-semibold">📌 Pro Tip:</p>
        <p>Reduce sugar gradually instead of quitting cold turkey. Your taste buds will adjust over time!</p>
      </div>

      {/* //Final Thoughts */}
      <h1 className="text-3xl font-semibold mt-8 text-center text-blue-500">🔥 Final Thoughts: Take Control of Your Sugar Intake</h1>
      <p className="mt-4 text-center text-gray-300">Sugar is highly addictive, but with the right habits, you can reduce cravings, improve energy, and feel healthier overall.</p>
      <div className="p-4 bg-gray-800 mt-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">🏆 Key Takeaways:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Too much sugar leads to weight gain, cravings, and metabolic issues.
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />  Protein, fiber, and healthy fats help reduce sugar cravings naturally
            
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Choose natural sweeteners like stevia, monk fruit, or raw honey instead of processed sugar.
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />Simple swaps, like drinking infused water & eating whole foods, make cutting sugar easier.
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <div className="text-red-500" /> 🚀 Challenge:
        </h3>
        <p className="mt-2 text-gray-300">
        Try reducing your added sugar intake for 7 days and see how you feel!
        </p>
      </div>
      <p className="text-center mt-6 text-lg text-gray-300">
      💬 What’s your go-to sugar-free snack? 
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
