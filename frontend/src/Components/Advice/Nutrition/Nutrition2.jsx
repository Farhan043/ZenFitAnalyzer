import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import { Card, CardContent } from "../../Ui/Card";
import { CheckCircle, Info } from "lucide-react";

const Nutrition2 = () => {
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

  const meals = [
    {
      icon: "🍳",
      title: "Breakfast: Scrambled Eggs & Whole-Grain Toast",
      macros: [
        { label: "Protein", value: "Eggs (12g)" },
        { label: "Carbs", value: "Whole-grain toast (20g)" },
        { label: "Fats", value: "Avocado (10g)" },
      ],
    },
    {
      icon: "🥗",
      title: "Lunch: Grilled Chicken Salad with Quinoa",
      macros: [
        { label: "Protein", value: "Chicken (35g)" },
        { label: "Carbs", value: "Quinoa (45g)" },
        { label: "Fats", value: "Olive oil dressing (12g)" },
      ],
    },
    {
      icon: "🍛",
      title: "Dinner: Salmon, Sweet Potato & Steamed Veggies",
      macros: [
        { label: "Protein", value: "Salmon (30g)" },
        { label: "Carbs", value: "Sweet potato (40g)" },
        { label: "Fats", value: "Salmon & olive oil (20g)" },
      ],
    },
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

      <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg mt-5">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-blue-400 text-center">
        How to Balance Protein, Carbs, and Fats for {" "}
          <span className="text-yellow-400">Optimal Health</span>
        </h1>
        {/* </div> */}

        <img
          src="/public/Nutrition/nutrition2.png"
          alt="Workout"
          className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
        A balanced diet is the key to maintaining energy, muscle growth, fat loss, and overall health. But with so much conflicting advice, how do you actually balance macronutrients—protein, carbohydrates, and fats—correctly?
        </p>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-yellow-400">
            This guide breaks down:
          </h3>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>✔ The role of each macronutrient in your body</li>
            <li>✔ How to determine the right ratio for your goals</li>
            <li>✔ Food sources for protein, carbs, and fats</li>
            <li>✔ Practical meal planning tips for balance</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-3">
        What Are Macronutrients & Why Do They Matter?
      </h2>
      <p className="text-gray-300 mb-4">
        Macronutrients (or <span className="font-semibold">"macros"</span>) are
        the three main nutrients that provide energy (calories) and support
        bodily functions:
      </p>
      
      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-gray-300">Macronutrient</th>
              <th className="p-3 text-gray-300">Calories per gram</th>
              <th className="p-3 text-gray-300">Primary Function</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-700">
              <td className="p-3 font-semibold text-blue-400">Protein</td>
              <td className="p-3">4 kcal</td>
              <td className="p-3">Builds and repairs muscle, supports metabolism</td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="p-3 font-semibold text-yellow-400">Carbohydrates</td>
              <td className="p-3">4 kcal</td>
              <td className="p-3">Provides quick and long-lasting energy</td>
            </tr>
            <tr className="border-t border-gray-700">
              <td className="p-3 font-semibold text-green-400">Fats</td>
              <td className="p-3">9 kcal</td>
              <td className="p-3">
                Supports hormone production, brain function, and energy storage
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-300 mt-4">
        Each macronutrient{" "}
        <span className="font-semibold text-white">
          plays a different but essential role
        </span>{" "}
        in a balanced diet. Let’s break them down one by one.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Macronutrients: Fueling Your Body Right
      </h2>

      {/* Protein Section */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-400">
          Protein: The Building Block of Your Body
        </h3>
        <ul className="list-disc pl-5 mt-2 text-gray-300">
          <li>Helps build and repair muscle</li>
          <li>Keeps you full longer</li>
          <li>Boosts metabolism</li>
          <li>Supports immune function</li>
        </ul>
        <p className="mt-3 font-semibold mb-2">🔹Best Protein Sources:</p>
        <p className="text-green-400">✅ Animal-Based: Chicken, turkey, fish, eggs, Greek yogurt, lean beef</p>
        <p className="text-yellow-400">✅ Plant-Based: Lentils, chickpeas, tofu, tempeh, quinoa, edamame</p>

        <p className="mt-3 font-semibold mb-2">🔹How Much Protein Do You Need?</p>
        <p className=" font-semibold text-red-500">📌 The Recommended Dietary Allowance (RDA) for protein is 0.8 grams per kilogram (0.36g per pound) of body weight.</p>
        <p className="text-green-400">✅ For Muscle Growth & Strength: 1.2 - 2.2g per kg (0.6 - 1g per pound)</p>
        <p className="text-yellow-400">✅ For Weight Loss & Fat Burning: 1.6 - 2.4g per kg (0.7 - 1.1g per pound)</p>

        <p className="mt-3 font-semibold mb-2">🔹 Example Calculation:</p>
        <p className="text-green-400">If you weigh 150 lbs (68 kg) and want to build muscle, you should eat:
        👉 68–150g of protein per day</p>
        <p className=" font-semibold text-red-500">📌 Tip: Spread protein throughout the day (e.g., eggs for breakfast, chicken for lunch, salmon for dinner).</p>
      </div>

      {/* Carbohydrates Section */}
      <div className=" bg-slate-800  text-white p-6 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Carbohydrates: Your Body’s Main Energy Source
          </h2>
          
          {/* Why They're Important */}
          <div className="mb-6 w-full bg-black bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Why They’re Important:</h3>
            <ul className=" text-gray-300">
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> Provide fast and sustained energy</li>
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> Improve brain function and focus</li>
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> Aid in digestion (fiber-rich carbs)</li>
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> Fuel workouts and recovery</li>
            </ul>
          </div>
          
          {/* Best Carbohydrate Sources */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Best Carbohydrate Sources:</h3>
            <div className="flex items-center justify-evenly">
              <div>
                <h4 className="text-green-400 font-medium">✅ Complex Carbs (Best Choice)</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  <li>Brown rice</li>
                  <li>Quinoa</li>
                  <li>Whole wheat bread</li>
                  <li>Oats</li>
                  <li>Sweet potatoes</li>
                  <li>Beans</li>
                  <li>Vegetables</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-medium">✅  Simple Carbs (Limit These)</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  <li>White bread</li>
                  <li>Pasta</li>
                  <li>Sugary cereals</li>
                  <li>Soda</li>
                  <li>Candy</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* How Many Carbs Do You Need? */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">How Many Carbs Do You Need?</h3>
            <p className="text-gray-300 mb-3">Carbs should make up <span className="text-blue-400 font-bold">40-60%</span> of your daily calories, depending on your activity level.</p>
            <h4 className="text-green-400 font-medium">📌 General Carb Guidelines:</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> For General Health: 3-5g per kg of body weight</li>
              <li className="flex items-center"><CheckCircle className="text-green-400 mr-2" /> For Athletes/Intense Workouts: 5-7g per kg of body weight</li>
            </ul>
          </div>
          
          {/* Example Calculation */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Example Calculation:</h3>
            <p className="text-gray-300">A <span className="text-blue-400 font-bold">150-lb (68 kg)</span> active person may need <span className="text-blue-400 font-bold">200–400g of carbs per day</span>.</p>
          </div>
          
          {/* Tip */}
          <div className="bg-gray-800 p-4 rounded-lg flex items-center">
            <Info className="text-yellow-400 mr-3" />
            <p className="text-gray-300">📌 Tip: Focus on fiber-rich carbs (whole grains, veggies) to stay full longer.</p>
          </div>
      </div>

      {/* Fats Section */}
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Fats: Essential for Hormones & Brain Function</h2>
      
      <p className="text-gray-300 mb-4">Fats play a crucial role in our body by supporting hormones, brain function, and energy storage.</p>
      
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">🔹 Why They’re Important:</h3>
      <ul className="mb-4">
        {["Support hormone production (testosterone, estrogen)", "Help absorb vitamins (A, D, E, and K)", "Protect the brain and heart", "Provide long-lasting energy"].map((point, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="text-green-400" size={16} /> {point}
          </li>
        ))}
      </ul>
      
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">🔹 Best Fat Sources:</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-green-400 font-medium">✅ Healthy Fats:</h4>
          <p className="text-gray-300">Avocados, olive oil, nuts, seeds, fatty fish (salmon, tuna)</p>
        </div>
        <div>
          <h4 className="text-red-400 font-medium">✅ Limit These:</h4>
          <p className="text-gray-300">Processed vegetable oils, fried foods, trans fats</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">🔹 How Much Fat Do You Need?</h3>
      <p className="text-gray-300 mb-2">✔ 20-35% of total daily calories should come from fat.</p>
      <p className="text-gray-300 mb-4">✔ Minimum intake: <strong>0.8g per kg of body weight</strong></p>
      
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">🔹 Example Calculation:</h3>
      <p className="text-gray-300 mb-4">A 150-lb (68 kg) person should aim for <strong>55–75g</strong> of healthy fats per day.</p>
      
      <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
        <p className="text-yellow-400 font-medium">📌 Tip:</p>
        <p>Prioritize unsaturated fats from nuts, olive oil, and fish for heart health.</p>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        How to Create a Balanced Macro Diet
      </h2>
      <p className="text-gray-300 mb-4">
        Now that we understand protein, carbs, and fats, <span className="font-semibold">how do you balance them correctly?</span>
      </p>
      
      <div className="flex items-center text-blue-400 font-semibold text-lg mb-3">
        <span className="bg-blue-500 text-white px-2 py-1 rounded mr-2">1</span>
        Choose the Right Macro Ratio for Your Goal
      </div>

      <div className="bg-gray-800 border  border-gray-700 rounded-lg">
        <div className="p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-3 text-gray-300">Goal</th>
                <th className="py-2 px-3 text-gray-300">Protein (%)</th>
                <th className="py-2 px-3 text-gray-300">Carbs (%)</th>
                <th className="py-2 px-3 text-gray-300">Fats (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="py-2 px-3 font-semibold">Weight Loss</td>
                <td className="py-2 px-3">30-40%</td>
                <td className="py-2 px-3">30-40%</td>
                <td className="py-2 px-3">20-30%</td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="py-2 px-3 font-semibold">Muscle Gain</td>
                <td className="py-2 px-3">25-35%</td>
                <td className="py-2 px-3">45-55%</td>
                <td className="py-2 px-3">15-25%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">General Health</td>
                <td className="py-2 px-3">20-30%</td>
                <td className="py-2 px-3">45-55%</td>
                <td className="py-2 px-3">20-30%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start mt-4 text-gray-300">
        <Info className="text-red-400 w-5 h-5 mt-1 mr-2" />
        <p>
          <span className="font-semibold text-white">Tip:</span> Adjust based on activity level—
          <span className="font-semibold text-blue-400"> more carbs for intense training</span>, fewer for sedentary days.
        </p>
      </div>


      <h2 className="text-2xl font-bold mt-5 mb-4">2️⃣ Sample Balanced Meal Plan</h2>
      <p className="text-gray-300 mb-6">Here’s how to balance macros in a typical day’s meals:</p>
      {meals.map((meal, index) => (
        <div key={index} className="bg-gray-800 text-white mb-4">
          <div className="p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <span className="text-xl">{meal.icon}</span> {meal.title}
            </h3>
            <ul className="space-y-1">
              {meal.macros.map((macro, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="text-blue-400 w-4 h-4" />
                  <span className="font-medium">{macro.label}:</span> {macro.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3 mt-4">
        <Info className="text-yellow-400 w-6 h-6" />
        <p className="text-gray-200 font-medium">
          📌 Tip: Use a macro calculator app (like MyFitnessPal) to track your intake.
        </p>
      </div>
       

        <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
          <p className="text-blue-300 font-semibold">🔥 Final Thoughts:  Master Your Macros for Optimal Health</p>
          <p className="text-gray-300">
          Balancing protein, carbs, and fats is the key to sustained energy, muscle maintenance, and overall health.
          </p>

          {/* Key Takeaways */}
          <h3 className="text-xl font-semibold text-green-400 mt-6">
            🎯 Key Takeaways
          </h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center">
            ✔ Protein supports muscle & recovery (aim for 0.6-1g per lb of body weight)
            </li>
            <li className="flex items-center">
            ✔ Carbs provide energy (focus on whole grains, fiber-rich sources)
            </li>
            <li className="flex items-center">
            ✔ Fats support hormones & brain health (choose healthy fats)
            </li>
            <li className="flex items-center">
            ✔ Adjust macros based on goals—weight loss, muscle gain, or maintenance
            </li>
          </ul>

          {/* Call to Action */}
          <p className="mt-6 text-center text-lg font-semibold text-purple-400">
          🔥 Challenge: Try tracking your macros for one week and see how it affects your energy & performance!<br />
          <span className="text-red-400">💬 What’s your go-to balanced meal?  </span>
          </p>
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
};

export default Nutrition2;
