import {
  CheckCircle,
  Sun,
  Droplet,
  Utensils,
  List,
  Smartphone,
  Lightbulb,
  Music,
  Moon,
  BedDouble,
  Brain,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Selfcare2() {
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

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl mt-5 font-bold mb-4">
          🌙 The Power of Restful Sleep
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Sleep is a fundamental pillar of health. Research shows that quality
          sleep is just as crucial as diet and exercise for fitness, recovery,
          and mental well-being.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          icon={<Moon className="text-blue-400 w-8 h-8" />}
          title="Enhances Muscle Recovery"
          description="Deep sleep is when muscle repair happens. Growth hormone is released, aiding recovery and strength gains."
        />
        <Card
          icon={<Brain className="text-purple-400 w-8 h-8" />}
          title="Boosts Mental Clarity"
          description="Quality sleep improves memory, focus, and emotional resilience, reducing stress and anxiety levels."
        />
        <Card
          icon={<Dumbbell className="text-green-400 w-8 h-8" />}
          title="Improves Physical Performance"
          description="Athletes who get 7-9 hours of sleep have better endurance, reaction time, and energy levels."
        />
        <Card
          icon={<BedDouble className="text-yellow-400 w-8 h-8" />}
          title="Regulates Hormones & Metabolism"
          description="Lack of sleep disrupts hunger hormones, leading to cravings and weight gain."
        />
      </div>

      {/* Tips Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-6">
        {/* Image Section */}
        <div className="flex justify-center md:w-1/2">
          <img
            src="/public/Selfcare/selfcare2.png"
            alt="Workout"
            className="w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Tips Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">✅ Tips for Better Sleep</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-center md:justify-start">
              <CheckCircle2 className="text-green-400 mr-2" /> Maintain a
              consistent sleep schedule.
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <CheckCircle2 className="text-green-400 mr-2" /> Avoid screens
              30-60 minutes before bed.
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <CheckCircle2 className="text-green-400 mr-2" /> Create a relaxing
              bedtime routine.
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <CheckCircle2 className="text-green-400 mr-2" /> Keep your room
              cool, dark, and quiet.
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <CheckCircle2 className="text-green-400 mr-2" /> Limit caffeine
              and heavy meals before bedtime.
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sleep & Physical Recovery */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-blue-400">
              💪 Sleep & Physical Recovery
            </h3>
            <p className="mt-2 text-gray-300">
              When you work out, your muscles experience micro-tears that need
              to repair and grow stronger. The body releases growth hormone
              during deep sleep (NREM stages 3 & 4), which helps repair muscle
              tissues and build endurance. A study published in the Journal of
              the American College of Cardiology found that poor sleep patterns
              are linked to higher risks of cardiovascular disease and slower
              post-exercise recovery [24].
            </p>
            <p className="mt-2 text-gray-300">
              Additionally, sleep deprivation affects reaction time,
              coordination, and energy levels, increasing the risk of injury and
              reducing performance in endurance sports and weight training.
            </p>
          </div>

          {/* Sleep & Weight Management */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-green-400">
              ⚖️ Sleep & Weight Management
            </h3>
            <p className="mt-2 text-gray-300">
              Struggling with weight loss despite regular workouts? Lack of
              sleep disrupts hormones that regulate hunger and metabolism.
              Studies show that sleep-deprived individuals have higher levels of
              ghrelin (the hunger hormone) and lower levels of leptin (the
              satiety hormone), leading to increased cravings for high-calorie
              foods [24].
            </p>
            <p className="mt-2 text-gray-300">
              Moreover, poor sleep impacts glucose metabolism, increasing the
              risk of obesity and diabetes. This explains why consistent,
              high-quality sleep is crucial for those looking to lose weight or
              maintain a healthy body composition.
            </p>
          </div>

          {/* Mental Health Benefits */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-yellow-400">
              🧠 Mental Health & Sleep Mental Health Benefits of Restful Sleep
            </h3>
            <p className="mt-2 text-gray-300">
              Sleep plays a critical role in emotional regulation and mental
              resilience. According to ScienceDaily, quality sleep reduces the
              risk of anxiety and depression, while chronic sleep deprivation
              increases stress and emotional instability [23].
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Memory consolidation
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">Sleep helps the brain process and store new information, improving focus and learning.</p>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" />Stress reduction
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4"> Deep sleep lowers cortisol (the stress hormone), making you more resilient to daily challenges.</p>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Better mood 
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">Well-rested individuals tend to experience fewer mood swings, increased motivation, and overall higher well-being.</p>
            </ul>
          </div>

          {/* Sleep Improvement Tips */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-red-400">
              🌙 How to Improve Sleep  for Better Fitness & Well-being
            </h3>
            <p className="mt-2 text-gray-300">
              Making simple adjustments to your sleep routine can drastically
              improve sleep quality and boost your fitness results.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" />Stick to a Sleep Schedule
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">
                Go to bed and wake up at the same time every day, even on
                weekends. This helps regulate your circadian rhythm and improves
                sleep efficiency [22].
              </p>

              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Optimize your
                sleep environment.
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">
                Keep your room cool (60-67°F or 16-19°C) for optimal sleep.{" "}
                <br />
                Invest in a comfortable mattress and pillows. <br />
                Reduce noise and light exposure—use blackout curtains and white
                noise if necessary.
              </p>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Limit Blue Light Before Bed
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">Exposure to screens (phones, TVs, and computers) before bedtime disrupts melatonin production, delaying sleep onset. Try reading, journaling, or meditating instead [22].</p>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Avoid Heavy Meals, Caffeine & Alcohol Late at Night
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">Eating too close to bedtime disrupts digestion, while caffeine and alcohol interfere with sleep cycles. Finish your last meal at least 2-3 hours before bed.</p>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-400 mr-2" /> Exercise, but
                not too late.
              </li>
              <p className="mt-2 text-gray-300 border-l-2 pl-4">Regular exercise improves sleep quality, but working out too close to bedtime can raise body temperature and delay sleep. Aim to complete workouts at least 3-4 hours before bedtime [22].</p>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 mt-5 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-8xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          🚀 Final Thoughts
        </h2>
        <p className="text-lg text-gray-300 mb-4">
        Quality sleep is not a luxury but a necessity for peak fitness performance, mental resilience, and overall well-being. If you’re serious about achieving your fitness goals, prioritize good sleep habits just as much as exercise and nutrition.
        </p>
        <p className="text-lg text-gray-300 mb-4">Try implementing the science-backed sleep strategies outlined in this article, and you’ll likely notice improvements in energy levels, recovery time, and mental clarity.</p>
        <div className="mt-6 border-t border-gray-500 pt-4">
          <p className="text-lg font-semibold text-gray-200">
          For more personalized fitness and wellness advice, stay tuned to FitAnalyzer!
          </p>
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="w-full p-3 mt-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
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

// Reusable Card Component
const Card = ({ icon, title, description }) => (
  <div className="flex items-start p-5 bg-gray-700 rounded-lg shadow-md">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  </div>
);
