import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Nutrition1 = () => {
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
      title: "High-Protein Chicken & Quinoa Bowl",
      ingredients: [
        "1 cup cooked quinoa",
        "5 oz grilled chicken breast",
        "1/2 cup steamed broccoli",
        "1/4 avocado (sliced)",
        "1 tbsp olive oil",
      ],
      tip: "Store in the fridge for up to 4 days.",
      icon: "🍗",
    },
    {
      title: "Avocado Egg Toast with Whole-Grain Bread",
      ingredients: [
        "2 slices whole-grain bread",
        "2 boiled eggs (sliced)",
        "1/2 avocado (mashed)",
        "1 tsp lemon juice",
        "Sprinkle of black pepper",
      ],
      tip: "Great for quick breakfasts on busy mornings!",
      icon: "🥑",
    },
    {
      title: "Overnight Oats for a Grab-and-Go Breakfast",
      ingredients: [
        "1/2 cup rolled oats",
        "1/2 cup almond milk",
        "1 tbsp chia seeds",
        "1/2 banana (sliced)",
        "1 tbsp honey",
      ],
      tip: "Prepare 3-4 jars for the week and store in the fridge.",
      icon: "🥗",
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
          The Ultimate Guide to Meal Prepping for a{" "}
          <span className="text-yellow-400">Healthy Lifestyle</span>
        </h1>
        {/* </div> */}

        <img
          src="/public/Nutrition/nutrition1.png"
          alt="Workout"
          className="w-96 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
          Meal prepping is one of the most effective ways to eat healthier, save
          time, and stay on track with your fitness goals. Whether you're
          looking to lose weight, build muscle, or maintain a balanced diet,
          proper meal planning can make a huge difference.
        </p>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-yellow-400">
            ✅ What You'll Learn:
          </h3>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>The benefits of meal prepping</li>
            <li>How to plan meals efficiently</li>
            <li>Meal prepping methods that work best for you</li>
            <li>Best foods for meal prep</li>
            <li>How to store meals properly</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-300">
            Why Meal Prepping is a Game-Changer
          </h3>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>
              ✔ Promotes healthier eating habits (no more last-minute junk food
              choices)
            </li>
            <li>✔ Saves money (buying in bulk is cheaper than takeout)</li>
            <li>✔ Reduces food waste (everything gets used efficiently)</li>
            <li>
              ✔ Helps with portion control (perfect for weight management)
            </li>
            <li>
              ✔ Eliminates daily cooking stress (you always have a meal ready!)
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-400">
          <p className="text-blue-300 font-semibold">🔹 Fact:</p>
          <p className="text-gray-300">
            A study from the International Journal of Behavioral Nutrition found
            that people who plan their meals in advance are more likely to have
            a balanced diet and consume fewer unhealthy foods.
          </p>
        </div>

        <h1 className="text-2xl font-bold text-blue-400 mt-5 mb-4">
          🥗 The Ultimate Guide to Meal Prepping for a Healthy Lifestyle
        </h1>
        <p className="text-gray-100 mb-4">
          Meal prepping helps you eat healthier, save time, and stay on track
          with your fitness goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-100">
              ✅ Why Meal Prepping is a Game-Changer
            </h2>
            <ul className="list-disc list-inside text-gray-100">
              <li>Promotes healthier eating habits</li>
              <li>Saves money by reducing food waste</li>
              <li>Helps with portion control</li>
              <li>Eliminates daily cooking stress</li>
            </ul>
          </div>
          
        </div>

        <h2 className="text-xl font-bold text-gray-100 mt-6">
          📌 Step 1: Plan Your Meals Like a Pro
        </h2>
        <p className="text-gray-100">
          Before cooking, create a weekly meal plan based on your goals.
        </p>

        <div className="bg-yellow-600 bg-opacity-50 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-semibold text-gray-50">Set Your Goals</h3>
          <ul className="list-disc list-inside text-gray-50">
            <li>Weight loss? Focus on portion sizes.</li>
            <li>Muscle gain? Increase protein intake.</li>
            <li>General health? Balance macronutrients.</li>
          </ul>
        </div>

        <h2 className="text-xl font-bold text-gray-100 mb-5 mt-6">
          🔥 Step 2: Choose Your Meal Prepping Method
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-100 p-4 rounded-lg">
            <h3 className="font-bold text-gray-700">
              Full Meal Prepping (Best for Busy Schedules)
            </h3>
            <p className="text-gray-600">
              ✔ Cook full meals in bulk and portion them into containers. <br />
              ✔ Great for grab-and-go convenience (perfect for work lunches!).{" "}
              <br />✅ Best for: People with limited time who want everything
              ready.
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-bold text-gray-700">
              Ingredient Prepping (Best for Variety)
            </h3>
            <p className="text-gray-600">
              ✔ Pre-cook ingredients separately (chicken, rice, veggies, etc.)
              and mix & match during the week. <br />
              ✔ Gives flexibility to create different meals without cooking
              daily. <br />✅ Best for: Those who prefer variety & fresh meals.
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-bold  text-gray-700">
              Freezer Meal Prepping (Long-Term Storage)
            </h3>
            <p className="text-gray-600">
              ✔ Prepare and freeze meals for weeks or months. <br />✔ Ideal for
              soups, stews, casseroles, and protein-packed meals. <br />✅ Best
              for: People who want long-lasting meal options.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-100 mt-6">
          🛒 Step 3: Grocery Shopping Smartly
        </h2>
        <ul className="list-disc list-inside ml-2 mt-2 text-blue-300">
          <li>Make a shopping list based on your meal plan.</li>
          <li>Buy in bulk to save money.</li>
          <li>Stick to whole foods, avoid processed items.</li>
          <li>Choose seasonal produce for freshness.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-100 mt-6">
          Step 4: Cooking & Storing Your Meals
        </h2>
        <p className="text-gray-100 mt-3">
          🔥 Meal Prepping Cooking Tips <br />
          ✔ Use a slow cooker, air fryer, or Instant Pot to cook large batches
          quickly. <br />
          ✔ Roast veggies in bulk—spread them on a baking sheet and bake. <br />
          ✔ Use a food scale for accurate portion sizes.
        </p>

        <h2 className="text-xl font-bold flex items-center mt-5 gap-2">
          📂 How to Store Your Meals Properly
        </h2>
        <p className="text-gray-300 mt-2">
          Proper storage = fresher meals & less food waste!
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full border border-gray-700 text-left rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Food Type</th>
                <th className="p-3 border border-gray-700">
                  Fridge (Max Days)
                </th>
                <th className="p-3 border border-gray-700">
                  Freezer (Max Months)
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  type: "Cooked Chicken",
                  fridge: "3-4 days",
                  freezer: "2-3 months",
                },
                {
                  type: "Cooked Rice/Quinoa",
                  fridge: "4-5 days",
                  freezer: "1 month",
                },
                {
                  type: "Cooked Vegetables",
                  fridge: "3-5 days",
                  freezer: "2-3 months",
                },
                {
                  type: "Soups & Stews",
                  fridge: "3-4 days",
                  freezer: "3-6 months",
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className="p-3 border border-gray-700">{item.type}</td>
                  <td className="p-3 border border-gray-700">{item.fridge}</td>
                  <td className="p-3 border border-gray-700">{item.freezer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-2 text-purple-400">
            ✔ <span>Use airtight containers to prevent spoilage.</span>
          </li>
          <li className="flex items-center gap-2 text-yellow-400">
            ✔ <span>Label meals with dates so you know when to eat them.</span>
          </li>
          <li className="flex items-center gap-2 text-red-400 font-bold">
            📌{" "}
            <span>Tip: Keep 1-2 meals in the fridge and freeze the rest.</span>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mb-2 mt-5">
          Step 5: Meal Prep Recipe Ideas
        </h2>
        <p className="text-gray-300">
          Here are 3 easy meal prep ideas to get started:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
          {meals.map((meal, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold flex items-center mb-3">
                <span className="mr-2 text-2xl">{meal.icon}</span> {meal.title}
              </h3>
              <ul className="list-disc list-inside text-gray-300 mb-3">
                {meal.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <p className="text-green-400 font-semibold">📌 Tip: {meal.tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
          <p className="text-blue-300 font-semibold">🔥 Final Thoughts:  Stay Consistent & Make Meal Prepping a Habit</p>
          <p className="text-gray-300">
          Meal prepping takes a little planning, but the time and stress it saves are totally worth it!
          </p>

          {/* Key Takeaways */}
          <h3 className="text-xl font-semibold text-green-400 mt-6">
            🎯 Key Takeaways
          </h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center">
            ✔ Plan your meals based on your goals
            </li>
            <li className="flex items-center">
            ✔ Choose a meal prepping method that fits your lifestyle
            </li>
            <li className="flex items-center">
            ✔ Store food properly to keep it fresh longer
            </li>
            <li className="flex items-center">
            ✔ Stay consistent—meal prepping gets easier with practice!
            </li>
          </ul>

          {/* Call to Action */}
          <p className="mt-6 text-center text-lg font-semibold text-purple-400">
          🔥 Challenge: Try meal prepping for one week and see the difference! <br />
          <span className="text-red-400">💬 What’s your go-to meal prep recipe? </span>
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

export default Nutrition1;
