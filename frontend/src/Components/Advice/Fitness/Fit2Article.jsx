import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit2Article() {
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
            The Best Morning Routine for <br />
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              An Active
            </span>{" "}
            &
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              {" "}
              Energized Day
            </span>
          </h1>
        </div>

        <img
          src="/public/Fitness/fitness2.png"
          alt="Workout"
          className="w-96 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
          Starting your morning the right way sets the tone for the rest of your
          day. A structured morning routine helps boost energy, improve focus,
          and enhance overall well-being. Whether you're an athlete, fitness
          enthusiast, or just looking to feel more refreshed, adopting these
          habits will help you stay active and energized throughout the day.
        </p>

        {/* List of habits with images */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Hydrate Immediately After Waking Up
          </h2>
          <img
            src="/public/Fitness/wakeup.png"
            alt="Protein food"
            className="w-96 flex mx-auto items-center rounded-md mb-4"
          />
          <p className="text-gray-50">
            🔹 Why it’s important: After hours of sleep, your body is
            dehydrated. Drinking water first thing in the morning helps
            kickstart metabolism, improve digestion, and boost alertness.
          </p>
          <p className="text-gray-50">
            🔹 How to do it:- <br />
            🔹Drink at least 16-20 oz (500-600ml) of water right after waking
            up. <br />
            🔹 Add lemon or electrolyte tablets for extra hydration benefits.{" "}
            <br />
            🔹 Avoid starting the day with coffee on an empty stomach—it can
            lead to dehydration.
            <br />✅ Tip: Keep a water bottle on your nightstand so it’s the
            first thing you reach for.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Get Sunlight for 10-15 Minutes
            </h2>
            <img
              src="/public/Fitness/time.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹Why it’s important: Morning sunlight regulates your circadian
              rhythm, boosts vitamin D, and enhances mood by increasing
              serotonin levels.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹 Spend 10-15 minutes outside in natural light. <br />
              🔹 Open your windows to let sunlight in while you get ready.{" "}
              <br />
              🔹If you have limited sunlight, consider a sun lamp (light therapy
              box) to mimic natural light exposure. <br />✅ Tip: Combine
              sunlight with a short walk outside for double the benefits.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              3. Perform Gentle Movement & Stretching
            </h2>
            <img
              src="/public/Fitness/stretch.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Your body is stiff after sleep, and gentle
              movement improves circulation, reduces muscle tightness, and wakes
              up your nervous system.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Perform a 5-minute mobility routine: <br /> 🔹Neck rolls (10 sec
              each direction) <br /> 🔹Shoulder circles (10 reps) <br />{" "}
              🔹Cat-Cow stretch (10 reps) <br />
              🔹Hip openers & hamstring stretches (30 sec each)
              <br />
              🔹Stand up and stretch every 30-60 minutes if working at a desk.{" "}
              <br />
              🔹 Walk around your home or do some light yoga poses. <br />✅
              Tip: Avoid jumping straight into high-intensity workouts without a
              proper warm-up.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              4. Fuel Your Body with a Nutritious Breakfast
            </h2>
            <img
              src="/public/Fitness/breakfast.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: A balanced breakfast stabilizes blood
              sugar, provides sustained energy, and improves cognitive function.
            </p>
            <p className="text-gray-50">
              🔹 What to eat::- <br />
              🔹Protein: Eggs, Greek yogurt, cottage cheese, or a protein
              smoothie. <br />
              🔹Healthy fats: Avocados, nuts, seeds, or olive oil. <br />
              🔹Complex carbs: Oats, whole-grain toast, berries, or bananas.{" "}
              <br />✅ Example: Scrambled eggs with spinach, whole-wheat toast,
              and a side of fruit.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              5. Avoid Checking Your Phone First Thing in the Morning
            </h2>
            <img
              src="/public/Fitness/phone.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Scrolling through social media or emails
              immediately after waking up can increase stress, reduce focus, and
              disrupt a mindful morning routine.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Set your phone to Do Not Disturb mode before bed. <br />
              🔹Avoid checking emails or social media for at least 30 minutes
              after waking. <br />
              🔹Use an actual alarm clock instead of your phone to wake up.{" "}
              <br />✅ Tip: Replace phone scrolling with reading, journaling, or
              meditation for a calmer start.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              6. Engage in Light Physical Activity or a Short Workout
            </h2>
            <img
              src="/public/Fitness/heart.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: A morning workout boosts metabolism,
              releases endorphins, and sets a productive tone for the day.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Short on time? Do a 5-10 minute HIIT or bodyweight workout.{" "}
              <br />
              🔹Prefer a slow start? Go for a morning walk or yoga session.{" "}
              <br />
              🔹Full workout? Strength training or cardio in the morning can be
              great for energy levels. <br />
              ✅ Example Routine (5 min full-body  workout):- <br />
              🔹30 sec Jumping jacks <br />  🔹30 sec Bodyweight squats <br />  🔹30 sec
              Push-ups <br />  🔹30 sec Plank 30 sec <br />  🔹Mountain climbers Repeat for 2
              rounds.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">7. Take a Cold or Contrast Shower</h2>
            <img
              src="/public/Fitness/shower.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹  Why it’s important: A cold shower boosts circulation, reduces inflammation, and increases alertness.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Start with a warm shower, then gradually switch to cold water for 30-60 seconds. <br />
              🔹Try contrast showers (alternating between hot and cold water). <br />
              🔹If cold showers are too intense, just splash cold water on your face to wake up. <br />
              ✅ Tip: Cold showers can also boost metabolism and support muscle recovery.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              8. Set Intentions & Plan Your Day
            </h2>
            <img
              src="/public/Fitness/goal.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it’s important: Starting your day with clear intentions reduces stress and increases productivity.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              🔹Write down your top 3 priorities for the day.
              <br />
              🔹Use a planner or digital app to schedule tasks. <br />
              🔹Take 2-5 minutes for deep breathing or meditation to clear your mind. <br />
              ✅ Tip: Practicing gratitude each morning improves mood and motivation.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-blue-200 text-2xl">
            An effective morning routine doesn’t have to be complicated. By incorporating these 8 simple habits, you can feel more energized, focused, and active throughout the day.
            </p>
            <p className="text-blue-400 text-2xl mt-5">
            💡 Which habit will you add to your routine first?
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
