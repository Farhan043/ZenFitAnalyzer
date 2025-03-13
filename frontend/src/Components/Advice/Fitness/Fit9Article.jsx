import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit9Article() {
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

  const preWorkoutFoods = [
    {
      title: "Oatmeal with Banana & Peanut Butter",
      benefits: [
        "Provides slow-digesting carbs for sustained energy",
        "Contains potassium (prevents muscle cramps)",
        "Healthy fats & protein keep you full",
      ],
    },
    {
      title: "Greek Yogurt with Berries & Honey",
      benefits: [
        "High in protein & probiotics (supports digestion)",
        "Natural sugars from fruit provide quick energy",
      ],
    },
    {
      title: "Whole Wheat Toast with Almond Butter & Sliced Banana",
      benefits: [
        "Complex carbs for steady blood sugar",
        "Almond butter provides healthy fats & protein",
      ],
    },
    {
      title: "Smoothie with Protein, Banana & Spinach",
      benefits: [
        "Easy to digest & rich in essential nutrients",
        "Protein helps preserve muscle mass",
      ],
    },
    {
      title: "Brown Rice with Chicken & Steamed Veggies",
      benefits: [
        "Provides complex carbs, lean protein, and fiber",
        "Helps with muscle strength & endurance",
      ],
    },
  ];


    const postWorkoutFoods = [
      {
        title: "Grilled Chicken with Quinoa & Roasted Veggies",
        benefits: [
          "High in lean protein (muscle recovery)",
          "Quinoa provides complex carbs & fiber",
        ],
      },
      {
        title: "Protein Shake with Banana & Almond Milk",
        benefits: [
          "Fast-absorbing protein for muscle repair",
          "Banana restores glycogen & potassium levels",
        ],
      },
      {
        title: "Scrambled Eggs with Whole-Grain Toast & Avocado",
        benefits: [
          "Eggs = high-quality protein & amino acids",
          "Avocado provides healthy fats for recovery",
        ],
      },
      {
        title: "Cottage Cheese with Pineapple & Chia Seeds",
        benefits: [
          "Rich in casein protein (supports overnight muscle recovery)",
          "Pineapple contains bromelain, which reduces muscle inflammation",
        ],
      },
      {
        title: "Salmon with Sweet Potato & Steamed Greens",
        benefits: [
          "Omega-3s in salmon reduce inflammation",
          "Sweet potatoes restore glycogen & boost recovery",
        ],
      },
    ];


        const workoutData = [
          {
            type: "Strength Training",
            preWorkout: "Brown rice + chicken, protein smoothie",
            postWorkout: "Salmon + quinoa, eggs + avocado",
          },
          {
            type: "Cardio (Running, Cycling)",
            preWorkout: "Banana + peanut butter, oatmeal",
            postWorkout: "Greek yogurt + fruit, protein shake",
          },
          {
            type: "HIIT / CrossFit",
            preWorkout: "Whole wheat toast + almond butter",
            postWorkout: "Cottage cheese + pineapple, protein smoothie",
          },
          {
            type: "Yoga / Pilates",
            preWorkout: "Berries + Greek yogurt, smoothie",
            postWorkout: "Scrambled eggs + whole-grain toast",
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

      <div className="max-w-8xl mt-7 mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">

      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
      Best Foods to Eat Before & After a Workout for Maximum Performance & Recovery
        </h2>
        <img
          src="/public/Fitness/fitness9.png"
          alt="posture"
          className="w-96 mt-5 rounded-lg mx-auto shadow-lg mb-6"
        />

      <h2 className="text-3xl font-semibold text-yellow-400 mb-6">🔥 What to Eat Before a Workout</h2>
      
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-300">Why Pre-Workout Nutrition Matters</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✔ Boosts energy levels</li>
          <li>✔ Prevents fatigue and muscle breakdown</li>
          <li>✔ Enhances endurance & strength</li>
          <li>✔ Improves focus & performance</li>
        </ul>
      </div>

      <div className="mb-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-yellow-400">
        <h3 className="text-2xl font-semibold text-yellow-300">Macronutrients to Focus On</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li><span className="text-blue-300 font-semibold">Carbohydrates</span> → Primary fuel source for muscles</li>
          <li><span className="text-blue-300 font-semibold">Protein</span> → Helps prevent muscle breakdown</li>
          <li><span className="text-blue-300 font-semibold">Healthy Fats</span> → Provides sustained energy (best for low-intensity workouts)</li>
        </ul>
      </div>
      
      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
        <p className="text-blue-300 font-semibold">🔹 Fact:</p>
        <p className="text-gray-300">
          A study in the <span className="font-semibold">Journal of the International Society of Sports Nutrition</span> found that consuming carbs and protein before exercise improves performance and reduces muscle protein breakdown.
        </p>
      </div>


      <h2 className="text-3xl font-semibold text-yellow-400 mt-5 mb-6">⚡ Best Pre-Workout Foods</h2>
      <p className="text-gray-300 mb-6">
        Eating the right foods before exercise fuels your body, boosts energy, and enhances performance. 
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {preWorkoutFoods.map((food, index) => (
          <div key={index} className="p-5 bg-gray-800 border-l-4 border-yellow-400 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300">{food.title}</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              {food.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
        <p className="text-blue-300 font-semibold">📌 Tip:</p>
        <p className="text-gray-300">
          Eat your pre-workout meal **30-60 minutes** before exercise to allow for proper digestion and energy release.
        </p>
      </div>



      <h2 className="text-3xl font-semibold text-green-400 mt-5 mb-6">🥩 What to Eat After a Workout (Optimize Muscle Recovery)</h2>
      
      <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-green-400 mb-6">
        <h3 className="text-xl font-semibold text-green-300">Why Post-Workout Nutrition Matters</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✔ Replenishes glycogen stores (restores energy)</li>
          <li>✔ Repairs muscle damage (promotes growth & recovery)</li>
          <li>✔ Reduces soreness & inflammation</li>
        </ul>
      </div>
      
      <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-blue-400">
        <h3 className="text-xl font-semibold text-blue-300">Macronutrients to Focus On</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li><span className="text-blue-400 font-semibold">Protein</span> → Repairs & builds muscle</li>
          <li><span className="text-blue-400 font-semibold">Carbohydrates</span> → Replenishes glycogen stores</li>
          <li><span className="text-blue-400 font-semibold">Electrolytes</span> → Replaces lost minerals (sodium, potassium, magnesium)</li>
        </ul>
      </div>
      
      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-yellow-400">
        <p className="text-yellow-300 font-semibold">🔹 Fact:</p>
        <p className="text-gray-300">
          Research from the American Journal of Clinical Nutrition suggests that consuming 20-30g of protein post-workout enhances muscle recovery and growth.
        </p>
      </div>


      <h2 className="text-3xl font-semibold text-green-400 mt-5 mb-6">🥗 Best Post-Workout Foods</h2>
      <p className="text-gray-300 mb-6">
        Eating the right foods after your workout helps replenish glycogen, repair muscles, and reduce inflammation.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {postWorkoutFoods.map((food, index) => (
          <div key={index} className="p-5 rounded-lg shadow-md bg-gray-800 border-l-4 border-green-400">
            <h3 className="text-xl font-semibold text-green-300">{food.title}</h3>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              {food.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
        <p className="text-blue-300 font-semibold">💧 Hydration: The Key to Performance & Recovery</p>
        <p className="text-gray-300 mt-2">
          Dehydration can lead to fatigue, muscle cramps, and poor performance.
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>Pre-Workout: Drink 16-20 oz of water 1-2 hours before exercise</li>
          <li>During Workout: Sip 8 oz of water every 15-20 minutes</li>
          <li>Post-Workout: Replenish with 20-24 oz of water or electrolyte drinks</li>
        </ul>
      </div>


      <h2 className="text-2xl font-semibold text-white mb-4">💪 Pre- & Post-Workout Nutrition Based on Workout Type</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 text-left border border-gray-700">Workout Type</th>
              <th className="p-3 text-left border border-gray-700">Best Pre-Workout Foods</th>
              <th className="p-3 text-left border border-gray-700">Best Post-Workout Foods</th>
            </tr>
          </thead>
          <tbody>
            {workoutData.map((workout, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "bg-gray-800 text-gray-300" : "bg-gray-700 text-gray-300"
                }
              >
                <td className="p-3 font-semibold text-white border border-gray-700">{workout.type}</td>
                <td className="p-3 border border-gray-700">{workout.preWorkout}</td>
                <td className="p-3 border border-gray-700">{workout.postWorkout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <h2 className="text-3xl font-semibold text-blue-400 mt-5 mb-6">Final Thoughts: Eat Smart for Better Results</h2>
      <p className="text-gray-300 mb-6">
        Pre- and post-workout nutrition directly impacts your performance, recovery, and overall fitness progress. 
        Make sure to eat a balance of protein, carbs, and healthy fats to fuel and rebuild your body efficiently.
      </p>
      
      <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-yellow-400">
        <h3 className="text-xl font-semibold text-yellow-300">🎯 Key Takeaways:</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✔ <span className="text-yellow-200">Pre-Workout:</span> Focus on carbs + protein for energy</li>
          <li>✔ <span className="text-yellow-200">Post-Workout:</span> Prioritize protein + carbs for recovery</li>
          <li>✔ <span className="text-yellow-200">Stay Hydrated:</span> Drink enough water before, during, and after workouts</li>
          <li>✔ <span className="text-yellow-200">Timing Matters:</span> Eat 30-60 minutes pre/post-workout for best results</li>
        </ul>
      </div>
      
      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-red-400 text-center">
        <p className="text-red-300 font-semibold text-lg">🔥 What’s your go-to pre- and post-workout meal?</p>
      </div>

      
</div>

      {/* </div> */}
      {/* </div>       */}

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
