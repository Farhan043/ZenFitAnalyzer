import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function FitnessArticle() {
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
            8 Daily Habits to Prevent <br />
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              Muscle Loss
            </span>{" "}
            &
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              {" "}
              Build Strength
            </span>
          </h1>
        </div>

        <img
          src="/public/Fitness/fitness1.png"
          alt="Workout"
          className="w-96 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
          As we age or go through periods of inactivity, we naturally start
          losing muscle mass. This process, known as sarcopenia, can lead to
          weakness, poor mobility, and an increased risk of injuries. However,
          by adopting the right daily habits, you can maintain and even build
          muscle strength over time. Here are 8 key habits to help you stay
          strong and prevent muscle loss.
        </p>

        {/* List of habits with images */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Prioritize Protein Intake
          </h2>
          <img
            src="/public/Fitness/protienFood.png"
            alt="Protein food"
            className="w-96 flex mx-auto items-center rounded-md mb-4"
          />
          <p className="text-gray-50">
            🔹 Why it’s important: Protein provides the essential amino acids
            needed for muscle repair and growth.
          </p>
          <p className="text-gray-50">
            🔹 How to do it:- <br />
            🔹 Aim for 0.6–1.0 grams of protein per pound of body weight daily.{" "}
            <br />
            🔹 Include lean meats, eggs, fish, dairy, tofu, beans, and nuts in
            your meals. <br />
            🔹 Consider a protein shake post-workout to aid recovery. <br />✅
            Example: A balanced meal with grilled chicken, quinoa, and steamed
            vegetables is a great protein-rich option.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Strength Train at Least 3 Times Per Week
            </h2>
            <img
              src="/public/Fitness/strength.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Resistance training stimulates muscle
              growth and prevents muscle breakdown
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹 Focus on compound exercises like squats, deadlifts, push-ups,
              and rows. <br />
              🔹 Use progressive overload (gradually increasing weights or reps)
              to challenge your muscles. <br />
              🔹 If you're a beginner, start with bodyweight exercises like
              lunges and planks. <br />✅ Tip: Strength training just 3 times
              per week is enough to maintain and build muscle.
            </p>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              3. Stay Active Throughout the Day
            </h2>
            <img
              src="/public/Fitness/walk.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Being sedentary leads to muscle atrophy. Staying active keeps your muscles
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹 Walk at least 7,000–10,000 steps per day. <br />
              🔹Stand up and stretch every 30-60 minutes if working at a desk. <br />
              🔹 Include functional movements like squatting to pick up items instead of bending over. <br />
              ✅ Simple Trick: Take the stairs instead of the elevator for extra leg strength!
            </p>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              4. Prioritize Sleep for Recovery
            </h2>
            <img
              src="/public/Fitness/sleep.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Muscles repair and grow during deep sleep cycles. Poor sleep leads to muscle breakdown and weak performance.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Get 7-9 hours of quality sleep each night. <br />
              🔹Maintain a consistent sleep schedule (sleep and wake up at the same time daily). <br />
              🔹 Avoid screens and caffeine at least 1 hour before bed to improve sleep quality. <br />
              ✅ Tip: A dark, cool, and quiet bedroom promotes better recovery sleep.
            </p>
          </div>



          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              5. Consume Enough Calories
            </h2>
            <img
              src="/public/Fitness/kcal.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: If you’re not eating enough, your body starts breaking down muscle for energy.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Maintain a slight calorie surplus (if bulking) or a well-balanced intake (if maintaining muscle). <br />
              🔹Eat nutrient-dense foods like whole grains, healthy fats, and lean proteins. <br />
              🔹 Avoid excessive crash dieting, which can lead to rapid muscle loss. <br />
              ✅ Example: Instead of skipping breakfast, have oatmeal with almonds and Greek yogurt for a muscle-friendly start.
            </p>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              6. Incorporate Mobility & Stretching Exercises
            </h2>
            <img
              src="/public/Fitness/steching.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹  Why it’s important: Stretching prevents injuries, improves flexibility, and enhances muscle function.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Stretch daily, especially after workouts. <br />
              🔹Perform dynamic warm-ups before exercising and static stretches afterward. <br />
              🔹 Try yoga or foam rolling to release muscle tightness. <br />
              ✅ Simple Routine: Spend 5-10 minutes daily doing hip flexor stretches, shoulder rolls, and hamstring stretches.
            </p>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              7.  Stay Hydrated
            </h2>
            <img
              src="/public/Fitness/hydrated.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹  Why it’s important: Dehydration leads to muscle cramps, weakness, and fatigue. Muscles are about 75% water!
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Drink at least 8-10 cups (2-3 liters) of water per day. <br />
              🔹Increase water intake during workouts and in hot weather. <br />
              🔹Include electrolytes (like sodium and potassium) if you sweat a lot. <br />
              ✅ Tip: Carry a refillable water bottle to remind yourself to drink throughout the day.
            </p>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              8.   Manage Stress Levels
            </h2>
            <img
              src="/public/Fitness/stress.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Chronic stress increases cortisol, a hormone that breaks down muscle and stores fat.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Practice meditation, deep breathing, or mindfulness daily. <br />
              🔹Engage in relaxing activities like reading, walking, or spending time with loved ones. <br />
              🔹Avoid overtraining, as excessive exercise can increase stress on the body. <br />
              ✅ Tip: Just 10 minutes of deep breathing exercises can help lower stress and improve recovery.
            </p>
          </div>


          <div className="mt-8">
            <p className="text-blue-200 text-2xl">Preventing muscle loss and building strength doesn’t require extreme changes—it’s all about small, consistent habits. By focusing on nutrition, exercise, recovery, and lifestyle, you can maintain strong, healthy muscles for life.</p>
            <p className="text-blue-400 text-2xl mt-5">🚀 Start today! Which habit will you focus on first?</p>
        </div>
        </div>


        {/* Add more sections as needed */}

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
