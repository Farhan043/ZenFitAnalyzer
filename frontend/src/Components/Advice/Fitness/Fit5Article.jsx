import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit5Article() {
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

      <div className="p-6 max-w-5xl mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-blue-400 text-center">
            Strength Training vs. Cardio: <br />
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              What’s Best for Fat Loss?
            </span>{" "}
          </h1>
        </div>

        <img
          src="/public/Fitness/fitness5.png"
          alt="posture"
          className="w-96 mt-5 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
          When it comes to fat loss, should you prioritize strength training or
          cardio? It’s a debate that has sparked discussions in the fitness
          world for years. While both resistance training and cardio workouts
          play a role in fat burning, they do so in different ways.
        </p>

        <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-green-400 text-center mb-4">
        How Fat Loss Actually Works
      </h2>
      <p className="text-gray-300 text-center mb-6">
        To lose fat, you need to create a caloric deficit—burning more calories than you consume. This can be achieved through:
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
          <li>✔ <span className="text-blue-400 font-semibold">Exercise:</span> Burning calories through movement.</li>
          <li>✔ <span className="text-yellow-400 font-semibold">Diet:</span> Consuming fewer calories than you burn.</li>
          <li>✔ <span className="text-red-400 font-semibold">Metabolism:</span> How efficiently your body burns calories at rest.</li>
        </ul>
      </div>

      <p className="text-lg font-semibold text-purple-400 mt-6 text-center">
        Both strength training and cardio can contribute to fat loss, but they do so in different ways. Let’s break it down.
      </p>
    </div>

        {/* List of habits with images */}
        <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
        Cardio for Fat Loss: How Effective Is It?
      </h2>
      <p className="text-gray-300 text-center mb-6">
        Cardio workouts—like running, cycling, swimming, or HIIT—are great calorie burners.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-blue-400">✅ Benefits of Cardio for Fat Loss</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
          <li>🔹 Burns more calories per session compared to strength training.</li>
          <li>🔹 Boosts cardiovascular health, improving heart and lung function.</li>
          <li>🔹 Increases calorie expenditure during exercise, helping create a deficit.</li>
          <li>🔹 Can improve insulin sensitivity, helping regulate blood sugar levels.</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold text-yellow-400">🔥 How Many Calories Does Cardio Burn?</h3>
        <p className="text-gray-300 mt-2">Here’s an estimate of calories burned per hour based on a 155-pound person:</p>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
          <li>🏃 Running (6 mph) – ~600 calories</li>
          <li>🚴 Cycling (moderate intensity) – ~500 calories</li>
          <li>🏊 Swimming – ~400-600 calories</li>
          <li>🔄 Jump Rope – ~700 calories</li>
        </ul>
      </div>

      <p className="text-lg font-semibold text-red-400 mt-6 text-center">📌 The Catch? While cardio burns more calories per session, it does not build muscle—which is key for increasing metabolism and long-term fat burning.</p>
    </div>



          <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-400 text-center mb-4">
        Strength Training for Fat Loss: Does It Work?
      </h2>
      <p className="text-gray-300 text-center mb-6">
        Strength training (weightlifting, resistance bands, bodyweight exercises) builds lean muscle mass, which increases your resting metabolism—helping you burn more calories even when you’re not working out.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-green-400">✅ Benefits of Strength Training for Fat Loss</h3>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
          <li>🔹 Boosts metabolism—muscle burns more calories at rest than fat.</li>
          <li>🔹 Increases lean muscle mass, which enhances fat-burning potential.</li>
          <li>🔹 Improves body composition, giving a more toned and sculpted look.</li>
          <li>🔹 Prevents muscle loss while in a calorie deficit.</li>
          <li>🔹 Enhances long-term fat loss—burning calories even after exercise (EPOC effect).</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold text-yellow-400">🔥 The Afterburn Effect (EPOC – Excess Post-Exercise Oxygen Consumption)</h3>
        <p className="text-gray-300 mt-2">
          Strength training creates a longer caloric burn after exercise. Your body continues burning calories for up to 48 hours post-workout while repairing muscles—something cardio doesn’t do as effectively.
        </p>
      </div>

      <p className="text-lg font-semibold text-red-400 mt-6 text-center">📌 The Catch? Strength training alone doesn’t burn as many calories per session as cardio, so diet and consistency are key.</p>
    </div>

        {/* Add more sections as needed */}

        <h2 className="text-xl font-semibold mt-8 mb-2">
          <span className="text-gray-50 text-2xl">
            🔹 Strength Training vs. Cardio: Which One Burns More Fat?{" "}
          </span>
          <br />
          <span className="text-gray-400 text-base ml-10">
            Here’s a head-to-head comparison based on fat loss effectiveness:
          </span>
        </h2>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-gray-800 text-gray-50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="py-3 px-4">Factor</th>
                <th className="py-3 px-4">Strength Training</th>
                <th className="py-3 px-4">Cardio</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Calories Burned (Per Session)",
                  "Lower than cardio",
                  "Higher than strength training",
                ],
                [
                  "Muscle Building",
                  "✅ Builds lean muscle",
                  "❌ No muscle gain",
                ],
                [
                  "Metabolism Boost",
                  "✅ Increases resting metabolism",
                  "❌ Minimal effect",
                ],
                [
                  "Afterburn Effect (EPOC)",
                  "✅ Burns calories up to 48 hours after",
                  "❌ Minimal afterburn",
                ],
                [
                  "Fat Loss Effectiveness",
                  "✅ Long-term fat loss & body recomposition",
                  "✅ Short-term calorie burn",
                ],
                [
                  "Best For",
                  "🔥 Toning, metabolism boost, long-term fat loss",
                  "🔥 Quick calorie burn, heart health",
                ],
              ].map(([factor, strength, cardio], index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-gray-300">{factor}</td>
                  <td className="py-3 px-4">{strength}</td>
                  <td className="py-3 px-4">{cardio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-7 text-gray-50">
            ✅ Cardio is great for burning calories during workouts <br /> ✅ Strength
            training is key for long-term fat loss & metabolism boost <br /> So, which
            is better? The best approach is a combination of both!
          </p>
        </div>

        <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">
        Best Workout Plan for Maximum Fat Loss
      </h2>
      <p className="text-gray-300 text-center mb-6">
        The best fat-loss routine includes both strength training and cardio to get the best of both worlds.
      </p>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-yellow-400">🔥 3-4 Days Strength Training</h3>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>Focus on compound movements: Squats, deadlifts, push-ups, rows, and presses.</li>
            <li>Lift heavy enough to challenge your muscles and build lean mass.</li>
            <li>Include bodyweight exercises (planks, lunges, dips) for variety.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-400">🔥 2-3 Days Cardio (Mix of Steady-State & HIIT)</h3>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>Steady-state cardio (walking, jogging, cycling) for endurance and fat burning.</li>
            <li>HIIT (High-Intensity Interval Training) for short bursts of calorie-burning and afterburn effect.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-400">🔥 Bonus: Keep Moving Daily</h3>
          <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
            <li>Get 10,000+ steps per day to increase overall calorie burn.</li>
            <li>Take walking breaks, stretch, and stay active outside workouts.</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">
        Final Verdict: Strength Training + Cardio = Best for Fat Loss
      </h2>
      <p className="text-gray-300 mb-4">
        If your goal is fat loss, don’t rely on just cardio or strength training—combine both!
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-left">
        <p className="text-lg text-blue-400 font-semibold">🚀 Best strategy?</p>
        <p className="text-gray-300 mt-1">
          Strength training builds muscle and boosts metabolism, while cardio burns extra calories for a greater fat-loss effect.
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-left mt-4">
        <p className="text-lg text-yellow-400 font-semibold">💡 Tip:</p>
        <p className="text-gray-300 mt-1">
          Pair workouts with a healthy diet, high-protein intake, and proper recovery for sustainable fat loss.
        </p>
      </div>

      <p className="text-xl font-semibold text-red-400 mt-6">🔥 What’s your go-to workout for fat loss?</p>
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
