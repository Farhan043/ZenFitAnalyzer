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

export default function Nutrition7() {
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

      <h1 className="text-3xl mt-5 font-bold text-center text-blue-600">
        🥗 The Best Anti-Inflammatory Foods for Recovery & Wellness
      </h1>

      <p className="text-lg text-center text-gray-100">
        Chronic inflammation can slow recovery, cause fatigue, and increase the
        risk of injuries, joint pain, and diseases. While it's a natural
        response to exercise and injury, too much inflammation can be harmful.{" "}
        <br /> The good news? Your diet plays a major role in controlling
        inflammation! Choosing the right foods can reduce muscle soreness, speed
        up recovery, and improve overall wellness.
      </p>

      <img
        src="/public/Nutrition/nutrition7.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />

      <div className="grid md:grid-cols-2 mt-5 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-600">
            ✅ What is Inflammation & Why Does It Matter?
          </h2>
          <p className="text-gray-700">
            Inflammation is the body's defense mechanism, but chronic
            inflammation can lead to health issues. Managing it through diet is
            key.
          </p>
          <ul><li>⚠ Slow down muscle recovery and increase soreness</li>
          <li>⚠ Contribute to joint pain & stiffness</li>
          <li>⚠ Raise the risk of heart disease, diabetes, and autoimmune conditions</li>
          <li>⚠ Weaken the immune system</li>
          </ul>

          <p className="text-gray-700">📌 Fact: Studies show that chronic inflammation is linked to 90% of modern diseases (Harvard Medical School)</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-600">
            ✅ Top Anti-Inflammatory Foods
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Fatty Fish (Salmon, Mackerel, Tuna)</li>
            <li>Leafy Greens (Spinach, Kale, Swiss Chard)</li>
            <li>Berries (Blueberries, Strawberries, Blackberries)</li>
            <li>Nuts & Seeds (Almonds, Walnuts, Chia Seeds, Flaxseeds)</li>
            <li>Olive Oil & Avocados</li>
            <li>Turmeric & Ginger</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-green-600">
            ✅ Best Meal Ideas for Recovery
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Salmon with Quinoa & Roasted Vegetables</li>
            <li>Spinach & Berry Smoothie with Chia Seeds</li>
            <li>Turmeric Ginger Tea with Almonds</li>
            <li>Avocado Toast with Poached Egg & Olive Oil</li>
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600">
            🚫 Foods That Cause Inflammation
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Processed & Fried Foods</li>
            <li>Refined Carbs (White Bread, Pastries)</li>
            <li>Excess Sugar & Artificial Sweeteners</li>
            <li>Processed Meats (Sausages, Bacon)</li>
            <li>Excess Alcohol & Sugary Beverages</li>
          </ul>
        </div>
      </div>


      <h1 className="text-3xl font-bold mt-6  text-center text-blue-400">
        🍽️ The Best Anti-Inflammatory Foods for Recovery & Wellness
      </h1>
      <p className="text-lg text-center mb-6">
        Eating whole, nutrient-rich foods can help your body reduce inflammation,
        heal faster, and perform better.
      </p>

      {/* Omega-3 Section */}
      <section className="bg-slate-900 p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-600">1️⃣ Omega-3 Fatty Acids: The Ultimate Inflammation Fighters</h2>
        <p>Omega-3s lower inflammation markers and improve muscle recovery.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>✅ Fatty Fish – Salmon, sardines, mackerel, tuna</li>
          <li>✅ Chia & Flaxseeds – Rich in alpha-linolenic acid (ALA)</li>
          <li>✅ Walnuts – Great plant-based source of omega-3s</li>
          <li>✅ Algal Oil – Best vegan-friendly omega-3 supplement</li>
        </ul>
        <p className="text-sm text-gray-100 mt-2">📌 Fact: Omega-3s reduce post-exercise muscle soreness by 30%!</p>
      </section>

      {/* Fruits & Vegetables Section */}
      <section className="bg-slate-900 mt-5 p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-600">2️⃣ Colorful Fruits & Vegetables: Packed with Antioxidants</h2>
        <p>Antioxidants help fight free radicals that cause inflammation.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>✅ Berries – Blueberries, strawberries, blackberries</li>
          <li>✅ Leafy Greens – Spinach, kale, Swiss chard (rich in vitamin C & E)</li>
          <li>✅ Tomatoes – High in lycopene, which reduces inflammation</li>
          <li>✅ Bell Peppers – Great source of quercetin, a powerful anti-inflammatory</li>
        </ul>
        <p className="text-sm text-gray-100 mt-2">📌 Fact: Eating 5+ servings of fruits & veggies daily lowers inflammation markers by 46%!</p>
      </section>

      {/* Turmeric & Ginger Section */}
      <section className="bg-slate-900 mt-5 p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-yellow-600">3️⃣ Turmeric & Ginger: Natural Anti-Inflammatory Powerhouses</h2>
        <p>Both turmeric & ginger block inflammation pathways in the body.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>✅ Turmeric – Add to smoothies, soups, or golden milk(works best with black pepper!)</li>
          <li>✅ Ginger – Drink ginger tea or add fresh ginger to meals</li>
        </ul>
        <p className="text-sm text-gray-100 mt-2">📌 Fact: Curcumin in turmeric is as effective as ibuprofen for reducing joint pain!</p>
      </section>

      {/* Healthy Fats Section */}
      <section className="bg-slate-900 mt-5 p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-orange-600">4️⃣ Healthy Fats: Combat Inflammation & Boost Recovery</h2>
        <p>Monounsaturated and polyunsaturated fats support cell repair and reduce inflammation.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>✅ Avocados – Packed with anti-inflammatory compounds  & potassium</li>
          <li>✅ Olive Oil – Contains oleocanthal, a natural pain reliever</li>
          <li>✅ Nuts & Seeds – Almonds, flaxseeds, chia seeds</li>
        </ul>
        <p className="text-sm text-gray-100 mt-2">📌 Tip: Use extra virgin olive oil instead of vegetable oils to reduce inflammation!</p>
      </section>

      {/* Probiotic & Fiber-Rich Foods Section */}
      <section className="bg-slate-900 mt-5 p-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-purple-600">5️⃣ Probiotic & Fiber-Rich Foods: Gut Health = Less Inflammation</h2>
        <p>A healthy gut reduces overall inflammation and improves recovery.</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>✅ Greek Yogurt & Kefir – Full of probiotics for gut health</li>
          <li>✅ Fermented Foods – Sauerkraut, kimchi, miso</li>
          <li>✅ High-Fiber Foods – Oats, quinoa, lentils</li>
        </ul>
        <p className="text-sm text-gray-100 mt-2">📌 Fact: Gut inflammation is linked to chronic diseases like arthritis & obesity.</p>
      </section>

      <h1 className="text-3xl font-bold text-center mt-5 mb-5 text-blue-600">🥤 What to Drink? Best Anti-Inflammatory Beverages</h1>
      
      <div className="space-y-4">
        <p className="text-lg">✅ <strong>Green Tea</strong> – Packed with EGCG, a powerful anti-inflammatory antioxidant</p>
        <p className="text-lg">✅ <strong>Tart Cherry Juice</strong> – Proven to reduce muscle soreness & joint pain</p>
        <p className="text-lg">✅ <strong>Lemon Water</strong> – Alkalizes the body and reduces inflammation</p>
      </div>

      <div className="bg-slate-900 p-4 rounded-lg">
        <p className="text-md font-semibold">📌 Fact:</p>
        <p>Studies show that drinking green tea daily can reduce inflammation by 30% and lower the risk of arthritis (Journal of Nutrition).</p>
      </div>

      <h2 className="text-2xl font-bold text-center mt-5 mb-2 text-red-600">🚫 What Foods Cause Inflammation? (Avoid These!)</h2>
      <p className="text-center text-lg mb-5">To reduce inflammation, cut back on processed foods that trigger inflammatory responses.</p>
      <div className="space-y-4">
        <p className="text-lg">❌ <strong>Processed Sugars</strong> – Found in sodas, sweets, pastries</p>
        <p className="text-lg">❌ <strong>Refined Carbs</strong> – White bread, pasta, and processed grains</p>
        <p className="text-lg">❌ <strong>Fried & Fast Foods</strong> – High in trans fats, which increase inflammation</p>
        <p className="text-lg">❌ <strong>Processed Meats</strong> – Bacon, sausage, hot dogs (contain nitrates & preservatives)</p>
        <p className="text-lg">❌ <strong>Vegetable & Seed Oils</strong> – Canola, soybean, sunflower oils (high in omega-6s)</p>
      </div>
      
      <div className="bg-slate-900 p-4 rounded-lg">
        <p className="text-md font-semibold">📌 Tip:</p>
        <p>Swap processed foods for whole, natural ingredients to reduce inflammation naturally!</p>
      </div>
      
      <h2 className="text-2xl font-bold text-center mt-5 mb-2 text-green-600">🥗 Sample Anti-Inflammatory Meal Plan for Recovery</h2>
      <div className="space-y-4">
        <p className="text-lg">🍳 <strong>Breakfast:</strong> Scrambled eggs + avocado toast + fresh berries</p>
        <p className="text-lg">🥗 <strong>Lunch:</strong> Grilled salmon + quinoa + roasted sweet potatoes + sautéed spinach</p>
        <p className="text-lg">🍽️ <strong>Dinner:</strong> Turmeric-spiced chicken + steamed broccoli + brown rice</p>
        <p className="text-lg">🥤 <strong>Snacks:</strong></p>
        <ul className="list-disc list-inside ml-4">
          <li>Handful of walnuts & dark chocolate (80% cocoa)</li>
          <li>Greek yogurt with honey & flaxseeds</li>
        </ul>
      </div>

      <div className="bg-slate-900 mt-5 p-4 rounded-lg">
        <p className="text-md font-semibold">📌 Pro Tip:</p>
        <p>Add ginger tea & green tea throughout the day for extra anti-inflammatory benefits!</p>
      </div>

      {/* //Final Thoughts */}
      <h1 className="text-3xl font-semibold mt-8 text-center text-blue-500">
      🔥 Final Thoughts: Use Food as Medicine
      </h1>
      <p className="mt-4 text-center text-gray-300">
      Reducing inflammation isn’t just about avoiding pain—it’s about improving recovery, boosting energy, and feeling your best.
      </p>
      <div className="p-4 bg-gray-800 mt-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">🏆 Key Takeaways:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Eat omega-3-rich foods (salmon, walnuts, flaxseeds)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Protein, fiber, and
            Add colorful fruits & veggies for antioxidants

          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Use turmeric & ginger for natural inflammation relief
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Avoid processed foods, sugars, and trans fats
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" />
            Drink green tea & tart cherry juice for extra benefits
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <div className="text-red-500" /> 🌱 Challenge:
        </h3>
        <p className="mt-2 text-gray-300">
        Try an anti-inflammatory diet for 7 days and see how your body feels!
        </p>
      </div>
      <p className="text-center mt-6 text-lg text-gray-300">
      💬 What’s your favorite anti-inflammatory food?
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
