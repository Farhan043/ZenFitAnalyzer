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


export default function Nutrition8() {
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

      <div className="max-w-8xl mt-5 mx-auto bg-white p-6 rounded-xl ">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-4">
          🌱 Plant-Based Nutrition: How to Get Enough Protein on a Vegan Diet
        </h1>
        <p className="text-gray-700 text-lg text-center mb-6">
          ➡ The best plant-based protein sources for muscle maintenance and overall health.
        </p>
        <img
        src="/public/Nutrition/nutrition8.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />
        <div className="bg-green-200 p-4 rounded-lg text-center">
          <p className="text-lg text-gray-800">
            Maintaining a high-protein diet on a vegan or plant-based lifestyle is easier than ever.
            Whether you're building muscle, recovering from workouts, or just staying healthy,
            you don’t need animal products to meet your protein needs.
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-green-700 mt-6">
          📝 What You'll Learn:
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 text-lg">
          <li>How much protein you need on a plant-based diet</li>
          <li>The best plant-based protein sources</li>
          <li>How to build balanced meals for optimal health and performance</li>
        </ul>
        <div className="mt-6 bg-green-50 p-4 border-l-4 border-green-500 rounded-lg">
          <p className="text-gray-800 text-lg">
            <span className="font-semibold">🌟 Tip:</span> Combining different plant-based proteins, such as legumes and whole grains,
            ensures you get all essential amino acids for muscle growth and overall wellness!
          </p>
        </div>


      <div className="w-full p-6 text-center shadow-lg mt-6 bg-green-50">
        <h2 className="text-xl font-bold text-blue-600 mb-2">📌 How Much Protein Do You Really Need?</h2>
        <p className="text-gray-700 text-sm">
          Your daily protein intake depends on your age, activity level, and fitness goals.
        </p>
        
        <div className="mt-4 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <FaDumbbell className="text-blue-500 text-xl" />
            <span className="font-medium text-slate-800">For Muscle Growth & Strength:</span> <span className="text-gray-600">1.6–2.2g per kg</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRunning className="text-green-500 text-xl" />
            <span className="font-medium text-slate-800">For Active Individuals:</span> <span className="text-gray-600">1.2–1.6g per kg</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCouch className="text-gray-500 text-xl" />
            <span className="font-medium text-slate-800">For General Health:</span> <span className="text-gray-600">0.8g per kg</span>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm font-semibold text-gray-800">📌 Example:</p>
          <p className="text-sm text-gray-700">If you weigh <strong>70 kg (154 lbs)</strong> and want to build muscle, aim for <strong>112–154g</strong> of protein per day.</p>
        </div>

        <div className="mt-6 flex items-center justify-center text-green-600 font-medium">
          <GiPlantRoots className="text-2xl mr-2" /> ✅ Good News: You can hit these goals with a well-planned plant-based diet! 🌱
        </div>
      </div>

    
      <div className="w-full p-6 text-center mt-6 shadow-lg bg-white/80 backdrop-blur-md">
        <h2 className="text-xl font-bold text-green-600 mb-2">🥦 Best Plant-Based Protein Sources</h2>
        
        <div className="mt-4 space-y-6 text-left">
          {/* Legumes & Beans */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">1️⃣ Legumes & Beans (High in Fiber & Protein!)</h3>
            <p className="text-gray-700 text-sm">Legumes are nutrient-dense, protein-rich, and full of fiber for digestion and gut health.</p>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>✅ Lentils – 18g of protein per cup</li>
              <li>✅ Chickpeas – 15g per cup</li>
              <li>✅ Black Beans – 15g per cup</li>
              <li>✅ Edamame (Soybeans) – 19g per cup</li>
            </ul>
            <p className="text-blue-600 text-xs mt-2">📌 Tip: Pair beans with whole grains (like rice or quinoa) for a complete protein profile!</p>
          </div>
          
          {/* Tofu, Tempeh & Seitan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">2️⃣ Tofu, Tempeh & Seitan: High-Protein Meat Alternatives</h3>
            <p className="text-gray-700 text-sm">These versatile plant-based proteins are rich in essential amino acids.</p>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>✅ Tofu (from soybeans) – 10g of protein per ½ cup</li>
              <li>✅ Tempeh (fermented soybeans) – 21g per ½ cup</li>
              <li>✅ Seitan (wheat gluten) – 25g per ½ cup</li>
            </ul>
            <p className="text-blue-600 text-xs mt-2">📌 Fact: Seitan has a similar protein content to chicken breast (25g per serving)!</p>
          </div>
          
          {/* Whole Grains */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">3️⃣ Whole Grains: Protein + Complex Carbs for Energy</h3>
            <p className="text-gray-700 text-sm">Whole grains provide plant protein, fiber, and essential nutrients.</p>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>✅ Quinoa – 8g of protein per cup (a complete protein!)</li>
              <li>✅ Oats – 6g per ½ cup</li>
              <li>✅ Brown Rice – 5g per cup</li>
              <li>✅ Buckwheat – 6g per cup</li>
            </ul>
            <p className="text-blue-600 text-xs mt-2">📌 Pro Tip: Quinoa is a complete protein, meaning it has all 9 essential amino acids!</p>
          </div>
          
          {/* Nuts & Seeds */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">4️⃣ Nuts & Seeds: Healthy Fats + Protein</h3>
            <p className="text-gray-700 text-sm">Nuts and seeds are great for snacking, smoothies, and meal toppings.</p>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>✅ Almonds – 6g of protein per ounce</li>
              <li>✅ Chia Seeds – 5g per 2 tbsp</li>
              <li>✅ Hemp Seeds – 10g per 3 tbsp</li>
              <li>✅ Pumpkin Seeds – 7g per ounce</li>
            </ul>
            <p className="text-blue-600 text-xs mt-2">📌 Fact: Hemp seeds contain more protein than eggs (per serving)!</p>
          </div>
          
          {/* Plant-Based Protein Powders */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">5️⃣ Plant-Based Protein Powders: Easy & Effective</h3>
            <p className="text-gray-700 text-sm">If you're struggling to meet your protein needs, vegan protein powders are a great option.</p>
            <ul className="mt-2 text-gray-600 text-sm space-y-1">
              <li>✅ Pea Protein – 20g per scoop</li>
              <li>✅ Brown Rice Protein – 22g per scoop</li>
              <li>✅ Hemp Protein – 15g per scoop</li>
              <li>✅ Soy Protein – 20g per scoop</li>
            </ul>
            <p className="text-blue-600 text-xs mt-2">📌 Best Choice: Mixing pea & rice protein creates a complete amino acid profile (similar to whey protein).</p>
          </div>
        </div>
      </div>

      <div className="w-full p-6 text-center shadow-lg bg-white/80 backdrop-blur-md">
        <h2 className="text-xl font-bold text-green-600 mb-2">🥗 How to Build High-Protein Vegan Meals</h2>
        
        {/* Breakfast */}
        <div className="mt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800">🍳 Breakfast:</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ <strong>Protein Oatmeal</strong> – Oats + chia seeds + almond butter + berries (20g protein)</li>
            <li>✅ <strong>Tofu Scramble</strong> – Tofu + spinach + nutritional yeast + whole-grain toast (25g protein)</li>
          </ul>
        </div>
        
        {/* Lunch */}
        <div className="mt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800">🥗 Lunch:</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ <strong>Quinoa Salad</strong> – Quinoa + chickpeas + kale + avocado + tahini dressing (30g protein)</li>
            <li>✅ <strong>Vegan Buddha Bowl</strong> – Brown rice + black beans + grilled tofu + sweet potatoes (35g protein)</li>
          </ul>
        </div>
        
        {/* Dinner */}
        <div className="mt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800">🍛 Dinner:</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ <strong>Tempeh Stir-Fry</strong> – Tempeh + broccoli + bell peppers + sesame sauce + brown rice (40g protein)</li>
            <li>✅ <strong>Lentil Soup</strong> – Lentils + tomatoes + carrots + whole-grain bread (30g protein)</li>
          </ul>
        </div>
        
        {/* Snacks */}
        <div className="mt-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800">🥤 Snacks:</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ <strong>Hummus & Veggies</strong> – Carrots, cucumbers, and bell peppers (10g protein)</li>
            <li>✅ <strong>Chia Pudding</strong> – Chia seeds + almond milk + banana (12g protein)</li>
          </ul>
          <p className="text-blue-600 text-xs mt-2">📌 Tip: Add a vegan protein shake if you need extra protein!</p>
        </div>
        
        {/* Myths Debunked */}
        <div className="mt-6 text-left border-t pt-4">
          <h3 className="text-lg font-semibold text-red-600">🚫 Common Vegan Protein Myths (Debunked!)</h3>
          <ul className="text-gray-600 text-sm space-y-2 mt-2">
            <li className="flex items-start"><FaTimes className="text-red-500 mr-2" /> <strong>"You can’t get enough protein on a vegan diet."</strong> <br/><FaCheck className="text-green-500 mr-2" /> False! Plant-based eaters can easily meet protein needs with proper planning.</li>
            <li className="flex items-start"><FaTimes className="text-red-500 mr-2" /> <strong>"Plant proteins are incomplete."</strong> <br/><FaCheck className="text-green-500 mr-2" /> False! Eating a variety of legumes, grains, nuts, and seeds provides all essential amino acids.</li>
            <li className="flex items-start"><FaTimes className="text-red-500 mr-2" /> <strong>"You need dairy for strong muscles."</strong> <br/><FaCheck className="text-green-500 mr-2" /> False! Studies show plant-based diets can support muscle growth just as well as animal-based diets.</li>
          </ul>
          <p className="text-blue-600 text-xs mt-2 flex items-center"><FaLightbulb className="mr-2 text-yellow-500" />📌 Fact: A 2021 study in the Journal of Nutrition found that plant-based athletes can build just as much muscle as those who eat animal protein!</p>
        </div>
      </div>
      </div>
      

     

      {/* //Final Thoughts */}
      <h1 className="text-3xl font-semibold mt-8 text-center text-blue-500">
      🔥 Final Thoughts: Build Strength with Plant Protein!
      </h1>
      <p className="mt-4 text-center text-gray-300">
      You don’t need meat or dairy to meet your protein goals. With the right food choices, a plant-based diet can support muscle maintenance, recovery, and overall health.
      </p>
      <div className="p-4 bg-gray-800 mt-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">🏆 Key Takeaways:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Eat a variety of plant-based protein sources (beans, grains, nuts, seeds)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Include high-protein meat alternatives (tofu, tempeh, seitan)

          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Add protein-rich snacks & shakes for extra protein
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Pair foods strategically (like beans + rice) to get complete proteins
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Stay consistent! Your body will adapt to using plant proteins efficiently
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <div className="text-red-500" /> 🌱 Challenge:
        </h3>
        <p className="mt-2 text-gray-300">
        Try a high-protein vegan meal plan for 7 days and see how you feel!
        </p>
      </div>
      <p className="text-center mt-6 text-lg text-gray-300">
      💬 What’s your favorite plant-based protein source? 
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
