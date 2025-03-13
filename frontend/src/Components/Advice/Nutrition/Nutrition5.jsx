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
import { FaDumbbell, FaClock,FaTint,FaFish, FaSeedling, FaLightbulb, FaAppleAlt, FaDrumstickBite } from "react-icons/fa";
import { GiMeal, GiMuscleUp } from "react-icons/gi";

export default function Nutrition5() {
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
        Eating for Muscle Growth: Best Foods to Support Strength Gains
      </h1>
      <p className="text-gray-100 text-center mb-8">
        Building lean muscle isn’t just about lifting weights—it’s about fueling
        your body with the right nutrients. Without proper nutrition, your
        muscles won’t recover, repair, or grow effectively.
      </p>

      <img
        src="/public/Nutrition/nutrition5.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />

      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-yellow-400">
          In this article, we’ll cover:
        </h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✅ Essential nutrients for muscle growth</li>
          <li>✅ Best muscle-building foods</li>
          <li>✅ How to structure meals for strength gains</li>
          <li>✅ Example meal plans for muscle growth</li>
        </ul>
      </div>

      <h1 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
        <FaDumbbell className="text-blue-500" /> The Science of Muscle Growth & Nutrition
      </h1>
      <p className="text-gray-200 mt-2">
        Muscle growth (hypertrophy) occurs when muscle fibers break down during exercise and rebuild stronger—but this process requires adequate nutrition.
      </p>

      <div className="mt-4 space-y-4">
        <div className="flex items-center bg-blue-50 p-3 rounded-lg">
          <FaDrumstickBite className="text-blue-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>Protein</strong> – Provides amino acids to repair & build muscle.
          </p>
        </div>
        
        <div className="flex items-center bg-yellow-50 p-3 rounded-lg">
          <FaAppleAlt className="text-yellow-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>Carbohydrates</strong> – Replenish glycogen for energy & prevent muscle breakdown.
          </p>
        </div>

        <div className="flex items-center bg-green-50 p-3 rounded-lg">
          <FaDumbbell className="text-green-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>Healthy Fats</strong> – Support hormone production (testosterone, growth hormone).
          </p>
        </div>

        <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
          <FaTint className="text-indigo-500 text-xl" />
          <p className="ml-3 text-gray-700">
            <strong>Hydration</strong> – Helps transport nutrients & prevent muscle fatigue.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
        <p className="text-gray-700">
          📌 <strong>Fact:</strong> Muscle is made up of 75% water, so proper hydration is just as important as protein intake!
        </p>
      </div>

      <h1 className="text-3xl font-bold text-blue-400 text-center mt-7 mb-6">
        <div className="text-blue-50" /> Top Muscle-Building Foods & Nutrients
      </h1>
      
      {/* Protein Section */}
      <div className="p-4 bg-slate-900 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-100">1️⃣ Protein: The Building Block of Muscle</h2>
        <p className="text-gray-100">Your body needs 20+ different amino acids to build muscle—9 of which must come from food. Aim for <strong>1.6-2.2g per kg</strong> of body weight daily.</p>
        <ul className="list-disc list-inside text-gray-100 mt-2">
          <li><FaFish className="inline text-blue-500" /> Lean Meats: Chicken, turkey, lean beef</li>
          <li><FaFish className="inline text-blue-500" /> Fish: Salmon, tuna, cod (high in omega-3s)</li>
          <li><FaFish className="inline text-blue-500" /> Eggs: Rich in leucine (key for muscle protein synthesis)</li>
          <li><FaFish className="inline text-blue-500" /> Dairy: Greek yogurt, cottage cheese</li>
          <li><FaSeedling className="inline text-green-500" /> Plant-Based: Lentils, chickpeas, quinoa, tofu</li>
        </ul>
      </div>
      
      {/* Carbohydrates Section */}
      <div className="p-4 bg-slate-900 mt-7 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-700">2️⃣ Carbohydrates: Fuel for Muscle Energy</h2>
        <p className="text-gray-100">Carbs help replenish glycogen stores so your muscles don’t break down for energy. Aim for <strong>3-6g per kg</strong> of body weight daily.</p>
        <ul className="list-disc list-inside text-gray-100 mt-2">
          <li><FaAppleAlt className="inline text-yellow-500" /> Whole Grains: Brown rice, quinoa, whole wheat bread</li>
          <li><FaAppleAlt className="inline text-yellow-500" /> Starchy Veggies: Sweet potatoes, squash, beets</li>
          <li><FaAppleAlt className="inline text-yellow-500" /> Fruits: Bananas, berries, apples</li>
          <li><FaAppleAlt className="inline text-yellow-500" /> Legumes: Lentils, black beans, chickpeas</li>
        </ul>
      </div>
      
      {/* Healthy Fats Section */}
      <div className="p-4 bg-slate-900 mt-6 rounded-lg">
        <h2 className="text-xl font-semibold text-green-700">3️⃣ Healthy Fats: Essential for Hormone Production</h2>
        <p className="text-gray-100">Healthy fats support muscle growth by boosting testosterone & reducing inflammation.</p>
        <ul className="list-disc list-inside text-gray-100 mt-2">
          <li><FaSeedling className="inline text-green-500" /> Avocados – Packed with monounsaturated fats & potassium</li>
          <li><FaSeedling className="inline text-green-500" /> Nuts & Seeds – Almonds, walnuts, flaxseeds</li>
          <li><FaSeedling className="inline text-green-500" /> Olive & Coconut Oil – Helps absorb fat-soluble vitamins</li>
          <li><FaFish className="inline text-green-500" /> Fatty Fish – Salmon, sardines (reduces muscle inflammation)</li>
        </ul>
      </div>
      
      {/* Pro Tip */}
      <div className="p-4 bg-slate-900 mt-6 rounded-lg flex items-center gap-3">
        <FaLightbulb className="text-yellow-500 text-2xl" />
        <p className="text-gray-100"><strong>Pro Tip:</strong> Omega-3 fatty acids in fish enhance muscle recovery & reduce soreness.</p>
      </div>


      <h1 className="text-3xl font-bold text-center mt-6 text-blue-600 mb-6">🥗 Structuring Your Meals for Strength Gains</h1>
      
      <div className="space-y-6">
        {/* Pre-Workout Meal */}
        <div className="p-4 bg-slate-900 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2"><FaClock /> Pre-Workout Meal (1-2 Hours Before Training)</h2>
          <p className="text-gray-100 mt-2">🔹 Carbs for energy + moderate protein</p>
          <p className="mt-2 font-semibold">✅ Example: Oatmeal + Banana + Whey Protein Shake</p>
        </div>
        
        {/* Post-Workout Meal */}
        <div className="p-4 bg-slate-900 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2"><GiMuscleUp /> Post-Workout Meal (30-60 Min After Training)</h2>
          <p className="text-gray-100 mt-2">🔹 Fast-digesting protein + carbs to replenish glycogen</p>
          <p className="mt-2 font-semibold">✅ Example: Grilled Chicken + White Rice + Steamed Broccoli</p>
        </div>
        
        {/* Daily Muscle-Building Meal Plan */}
        <div className="p-4 bg-slate-900 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2"><GiMeal /> Daily Muscle-Building Meal Plan</h2>
          <ul className="list-disc list-inside text-gray-100 mt-2">
            <li>🥣 <b>Breakfast:</b> Scrambled eggs + avocado toast + Greek yogurt</li>
            <li>🥪 <b>Snack:</b> Protein shake + handful of almonds</li>
            <li>🍗 <b>Lunch:</b> Grilled salmon + quinoa + roasted veggies</li>
            <li>🥑 <b>Snack:</b> Cottage cheese + walnuts + honey</li>
            <li>🥘 <b>Dinner:</b> Lean beef + brown rice + sautéed spinach</li>
            <li>🍫 <b>Night Snack:</b> Casein protein shake or dark chocolate + peanut butter</li>
          </ul>
          <p className="text-gray-200 mt-2">📌 <b>Fact:</b> Eating protein before bed (casein from dairy) helps prevent overnight muscle breakdown.</p>
        </div>
        
        {/* Supplements Section */}
        <div className="p-4 bg-slate-900 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2"><FaDumbbell /> Supplements for Muscle Growth</h2>
          <p className="text-gray-200 mt-2">While whole foods should be your priority, supplements can help fill nutritional gaps:</p>
          <ul className="list-disc list-inside text-gray-100 mt-2">
            <li>💊 <b>Whey Protein</b> – Fast absorption for post-workout recovery</li>
            <li>💊 <b>Creatine Monohydrate</b> – Increases strength & muscle mass</li>
            <li>💊 <b>BCAAs</b> – Helps prevent muscle breakdown</li>
            <li>💊 <b>Omega-3s</b> – Reduces inflammation & improves recovery</li>
            <li>💊 <b>Vitamin D & Magnesium</b> – Supports muscle function & bone health</li>
          </ul>
          <p className="text-gray-200 mt-2">📌 <b>Tip:</b> Creatine + carbs post-workout enhances muscle uptake & growth.</p>
        </div>
      </div>

{/* //Final Thoughts */}
      <div className="p-4 bg-gray-800 mt-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">🏆  Key Takeaways:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Prioritize protein (1.6-2.2g/kg) for muscle repair
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />  Eat carbs pre & post-workout for energy & recovery
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Include healthy fats to support hormones & inflammation control
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />  Plan muscle-building meals with a mix of whole foods & supplements
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <div className="text-red-500" /> 💡 Next Step:
        </h3>
        <p className="mt-2 text-gray-300">
        Start tracking your protein, carbs, & fats and adjust your diet based on progress!
        </p>
      </div>
      <p className="text-center mt-6 text-lg text-gray-300">
      💬 What’s your go-to muscle-building meal?
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
