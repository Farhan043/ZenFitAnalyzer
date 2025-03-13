import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit4Article() {
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
          Top 5 Recovery Methods to  <br />
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
            Reduce Muscle Soreness
            </span>{" "}
          </h1>
        </div>

        <img
          src="/public/Fitness/fitness4.png"
          alt="posture"
          className="w-96 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
        Feeling sore after a tough workout? Delayed Onset Muscle Soreness (DOMS) is common after intense physical activity, especially if you’re trying new exercises or increasing intensity. While some soreness is a sign of progress, excessive discomfort can slow you down.
        </p>

       
        {/* List of habits with images */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Active Recovery (Light Movement to Improve Circulation)
          </h2>
          <p className="text-gray-50">
            🔹 Why it works: Light movement increases blood flow, helping deliver oxygen and nutrients to sore muscles while flushing out lactic acid buildup.
          </p>
          <p className="text-gray-50">
            🔹 How to do it:- <br />
            <div className="ml-7">
                      1. Take a 10-15 minute walk or do light cycling. <br />
                      2. Perform gentle yoga or mobility exercises.{" "}
                      <br />
                      3. Do bodyweight movements (air squats, lunges, shoulder rolls) at low intensity. <br />
                      ✅ Tip: Avoid complete rest; staying sedentary can slow down muscle recovery.
                      </div>
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              2.  Hydration & Proper Nutrition (Fuel Your Muscles for Faster Healing)
            </h2>
            <img
              src="/public/Fitness/human.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Muscles need hydration and essential nutrients to repair and grow. Dehydration can make soreness worse and slow down muscle function.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Drink plenty of water throughout the day (at least 2-3 liters). <br />
                      2. Consume electrolytes (coconut water, electrolyte drinks) after intense sweat sessions.{" "}
                      <br />
                      3. Eat protein-rich foods (chicken, eggs, Greek yogurt, tofu) to aid muscle repair. <br />
                      4. Include anti-inflammatory foods (berries, turmeric, salmon) to reduce soreness.
                      <br />
                      ✅ Example: Post-workout protein shake + banana + handful of nuts = optimal recovery meal.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              3.   Foam Rolling & Massage (Relieve Tight Muscles & Improve Mobility)
            </h2>
            <img
              src="/public/Fitness/roller.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Foam rolling and massage release muscle tension, increase blood flow, and reduce stiffness by breaking up knots and adhesions in the muscles.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Foam roll sore muscles for 30-60 seconds per area.<br />
                      2.Focus on quads, hamstrings, calves, and back—common areas for soreness.{" "}
                      <br />
                      3.Get a massage or use a massage gun for deeper muscle relaxation. <br />
                      ✅ Tip: Roll slowly and pause on tight spots for 10-15 seconds to relieve tension.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              4.  Contrast Therapy (Alternating Hot & Cold Therapy for Muscle Recovery)
            </h2>
            <img
              src="/public/Fitness/therapy.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Alternating between hot and cold therapy reduces inflammation, improves circulation, and relieves muscle tightness.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Use ice packs (10-15 minutes) to reduce swelling.<br />
                      2. Take a hot shower or use a heating pad to relax tight muscles.{" "}
                      <br />
                      3. Try contrast baths:- <br />
                      Alternate between 1 minute of cold water and 3 minutes of hot water for 15 minutes. <br />
                      ✅ Tip: If soreness is severe, prioritize ice therapy to control inflammation.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              5.Quality Sleep & Rest (The #1 Muscle Repair Method)
            </h2>
            <img
              src="/public/Fitness/L.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Your body does most of its muscle repair and growth during sleep. Poor sleep slows recovery and increases inflammation.
            </p>
            <p className="text-gray-50">
              🔹  How to improve sleep for recovery:- <br />
              <div className="ml-7">
                      1.Aim for 7-9 hours of sleep per night.<br />
                      2. Avoid screens (blue light) 30-60 minutes before bed.{" "}
                      <br />
                      3. Create a cool, dark, and quiet sleep environment. <br />
                      4. Use magnesium or tart cherry juice to promote muscle relaxation and deeper sleep.<br />
                      ✅ Tip: If you feel excessively sore, take an extra rest day to allow full recovery.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-blue-200 text-2xl">
            Muscle soreness is part of the fitness journey, but it shouldn’t stop you from staying active. By following these top 5 recovery methods, you’ll reduce soreness, recover faster, and improve performance.
            </p>
            <p className="text-blue-400 text-2xl mt-5">
            💡 Which recovery method works best for you?
            </p>
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
