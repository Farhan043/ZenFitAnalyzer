import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit10Article() {
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

  const workouts = [
    {
      title: "Full-Body Burn (Total Body HIIT)",
      goal: "Get your heart pumping & burn calories",
      duration: "30 seconds per move, repeat twice",
      exercises: ["Jump Squats", "Push-Ups", "Mountain Climbers", "Plank with Shoulder Taps", "High Knees"],
      tip: "Keep rest time minimal to maintain intensity.",
      image: "/public/Fitness/full.png"
    },
    {
      title: "Core Crusher (Abs & Obliques)",
      goal: "Strengthen your core & improve posture",
      duration: "40 seconds per exercise, repeat as needed",
      exercises: ["Bicycle Crunches", "Russian Twists", "Plank Hold", "Leg Raises", "Side Plank (switch sides at 20 seconds)"],
      tip: "Engage your core throughout for better results.",
      image: "/public/Fitness/abs.png"
    },
    {
      title: "Strength in 5 (Quick Bodyweight Strength Training)",
      goal: "Build muscle in a short time",
      duration: "45 seconds per exercise, minimal rest",
      exercises: ["Squats", "Push-Ups", "Lunges (switch legs)", "Triceps Dips (use a chair)", "Glute Bridges"],
      tip: "Focus on form over speed for muscle activation.",
      image: "/public/Fitness/training.png"
    },
    {
      title: "Cardio Blaster (Heart-Pumping Cardio)",
      goal: "Improve stamina & burn fat",
      duration: "30 seconds per move, repeat once",
      exercises: ["Jumping Jacks", "Burpees", "High Knees", "Skaters", "Fast Feet"],
      tip: "Modify intensity based on fitness level (faster for more challenge).",
      image: "/public/Fitness/cardio.png"
    },
    {
      title: "Desk Workout (Quick Office Routine)",
      goal: "Stay active at work without breaking a sweat",
      duration: "30 seconds per move, repeat as needed",
      exercises: ["Seated Leg Lifts", "Chair Squats", "Desk Push-Ups", "Seated Twists (for core)", "Standing Calf Raises"],
      tip: "Perfect for lunch breaks or quick movement between meetings!",
      image: "/public/Fitness/desk.png"
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
      5-Minute Workouts for Busy Schedules: Stay Fit Anytime
        </h2>
        <img
          src="/public/Fitness/fitness10.png"
          alt="posture"
          className="w-96 mt-5 rounded-lg mx-auto shadow-lg mb-6"
        />

<h2 className="text-3xl font-semibold text-blue-400 mb-4">⏳ Why Short Workouts Work</h2>
      <p className="text-gray-300 mb-6">
        Struggling to find time for fitness? You’re not alone. The #1 excuse for skipping workouts is lack of time. But here’s the good news: 
        you don’t need an hour at the gym to stay fit.
      </p>
      
      <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-yellow-400 mb-6">
        <p className="text-yellow-300 font-semibold">🔬 Research Insights:</p>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>
          ✔ Research from the American Journal of Physiology found that short, high-intensity workouts can be as effective as longer workouts for improving cardiovascular health and muscle strength.
          </li>
          <li>
          ✔ Studies from McMaster University show that even 1-minute bursts of intense exercise can improve fitness levels when done consistently.
          </li>
        </ul>
      </div>
      
      <h3 className="text-2xl font-semibold text-green-400 mb-3">🔥 The Benefits of 5-Minute Workouts</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>⚡ Boosts metabolism – Keeps your body burning calories throughout the day</li>
        <li>🚀 Increases energy – Moves oxygen to muscles & brain, making you feel more alert</li>
        <li>💪 Builds strength & endurance – Even short workouts engage key muscle groups</li>
        <li>😊 Improves mood – Releases endorphins, reducing stress & anxiety</li>
      </ul>
      
      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
        <p className="text-blue-300 font-semibold">💡 Fact:</p>
        <p className="text-gray-300">
          A study from Harvard Medical School found that short bursts of exercise reduce stress and improve focus better than long, drawn-out workouts.
        </p>
      </div>
      
      <h2 className="text-3xl font-semibold text-blue-400 mb-6">🔥 5 Quick & Effective Workouts for Any Schedule</h2>
      <p className="text-gray-300 mb-6">No equipment needed! These routines fit into any schedule—morning, lunch break, or before bed.</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {workouts.map((workout, index) => (
          <div key={index} className="p-5 rounded-lg shadow-md bg-gray-800 border-l-4 border-yellow-400">
            <img src={workout.image} alt={workout.title} className="w-full  object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-yellow-300">{workout.title}</h3>
            <p className="text-gray-400 italic">🎯 {workout.goal}</p>
            <p className="text-gray-400 mt-2">⏱ {workout.duration}</p>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              {workout.exercises.map((exercise, i) => (
                <li key={i}>{exercise}</li>
              ))}
            </ul>
            <p className="text-blue-300 font-semibold mt-2">📌 Tip: {workout.tip}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold text-blue-400 mt-6 mb-6">🔥 How to Make It a Habit</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-yellow-400">
          <h3 className="text-xl font-semibold text-yellow-300">📌 Schedule It</h3>
          <p className="text-gray-300">Treat your 5-minute workout like an important meeting.</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-300">📌 Stack It</h3>
          <p className="text-gray-300">Combine with existing habits (before coffee, after brushing teeth).</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-300">📌 Stay Consistent</h3>
          <p className="text-gray-300">Even 5 minutes a day builds long-term results.</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-300">📌 Mix It Up</h3>
          <p className="text-gray-300">Rotate between workouts to keep it fun & effective.</p>
        </div>
      </div>

      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-purple-400">
        <p className="text-purple-300 font-semibold">🔹 Fact:</p>
        <p className="text-gray-300">
          The CDC recommends at least 150 minutes of moderate exercise per week, but short workouts throughout the day count toward this goal!
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">🚀 Final Thoughts: Small Steps = Big Results</h2>
      <p className="text-gray-300 mt-3">
        You don’t need an hour—just 5 minutes can make a difference! Whether at home, in the office, or on the go, these quick workouts keep you active, energized, and strong.
      </p>

      <ul className="list-disc list-inside text-gray-300 mt-4">
        <li>✔ No time? No problem! Short workouts still build strength & endurance</li>
        <li>✔ Consistency matters more than duration—move daily</li>
        <li>✔ Try different workouts to find what works for you</li>
      </ul>

      <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-orange-400">
        <h3 className="text-orange-300 font-semibold">🔥 Challenge:</h3>
        <p className="text-gray-300">Try a 5-minute workout every day for a week & see the difference!</p>
      </div>

      <p className="text-gray-400 text-center mt-6 italic">💬 What’s your favorite quick workout?</p>
      
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
