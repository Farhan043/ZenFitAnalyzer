import {
  CheckCircle,
  Sun,
  Droplet,
  Brain,
  Dumbbell,
  Utensils,
  List,
  Smartphone,
  Lightbulb,
  Music,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const morningRituals = [
  {
    icon: <Sun className="text-yellow-400 w-6 h-6" />,
    title: "Wake Up at a Consistent Time",
    description:
      "Your body's internal clock, or circadian rhythm, functions best when you maintain a regular sleep schedule. Studies show that waking up at the same time each day (even on weekends) improves mood, energy levels, and cognitive function",
  },
  {
    icon: <Droplet className="text-blue-400 w-6 h-6" />,
    title: "Hydrate Immediately",
    description:
      "After hours of sleep, your body is dehydrated. Drinking a glass of water first thing in the morning can kickstart metabolism, flush out toxins, and improve brain function​",
  },
  {
    icon: <Brain className="text-purple-400 w-6 h-6" />,
    title: "Practice Mindfulness or Meditation",
    description:
      "Taking a few minutes for deep breathing, meditation, or gratitude journaling can significantly lower stress levels and improve mental clarity​ Even just 5–10 minutes of quiet reflection can help set a calm and focused tone for the day.",
  },
  {
    icon: <Dumbbell className="text-green-400 w-6 h-6" />,
    title: "Engage in Light Physical Activity",
    description:
      "Exercise in the morning, even if it's just stretching or a short walk, can enhance mood and energy levels by increasing endorphin production. Morning movement also helps regulate blood sugar and improves focus​",
  },
  {
    icon: <Utensils className="text-orange-400 w-6 h-6" />,
    title: "Eat a Nutritious Breakfast",
    description:
      "Skipping breakfast can lead to energy crashes and reduced productivity. A well-balanced breakfast with protein, healthy fats, and fiber sustains energy levels and supports cognitive function",
  },
  {
    icon: <List className="text-teal-400 w-6 h-6" />,
    title: "Plan Your Day with Intent",
    description:
      "Taking a few minutes to set goals and prioritize tasks ensures a productive day. Studies show that writing down goals increases the likelihood of achieving them by 42%​",
  },
  {
    icon: <Smartphone className="text-red-400 w-6 h-6" />,
    title: "Avoid Checking Your Phone First Thing",
    description:
      "Checking emails or social media immediately after waking up can spike stress and distract you from your morning routine. Instead, focus on personal development habits before diving into digital distractions​",
  },
  {
    icon: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    title: "Step Outside for Natural Light",
    description:
      "Exposure to natural light in the morning helps regulate melatonin levels and boosts serotonin production, which enhances mood and alertness",
  },
  {
    icon: <Music className="text-pink-400 w-6 h-6" />,
    title: "Use a Morning Playlist for Motivation",
    description:
      "Listening to upbeat or relaxing music can set a positive tone for the day. Music has been shown to improve mood and reduce stress​",
  },
  {
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    title: "Be Flexible and Adjust as Needed",
    description:
      "No two days are the same, and life happens. If you wake up late or feel off track, adapt your routine instead of skipping it entirely. Even a condensed version of your morning habits can keep you on track for a productive day​",
  },
];

export default function Selfcare1() {
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

      {/* <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white min-h-screen"> */}
      <h1 className="text-2xl md:text-3xl mt-7 font-bold mb-6 text-center">
        🌅 Morning Rituals for a Positive Start
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Start your day right with these science-backed habits for better focus,
        energy, and well-being.
      </p>
      <img
        src="/public/Selfcare/selfcare1.png"
        alt="Workout"
        className="w-96 rounded-lg  flex mx-auto items-center shadow-lg mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {morningRituals.map((ritual, index) => (
          <div
            key={index}
            className="flex items-start p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <div className="mr-4">{ritual.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{ritual.title}</h2>
              <p className="text-gray-300 text-sm">{ritual.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white bg-opacity-10 mt-5 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-8xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          🚀 Final Thoughts
        </h2>
        <p className="text-lg text-gray-300 mb-4">
          👨 Creating a morning routine doesn’t have to be complicated. Start
          with one or two habits and build from there. The key is
          consistency—small actions repeated daily lead to significant long-term
          benefits. Whether your goal is to reduce stress, increase
          productivity, or simply feel more in control of your day, an
          intentional morning routine can help set a positive foundation for
          success.
        </p>
        <div className="mt-6 border-t border-gray-500 pt-4">
          <p className="text-lg font-semibold text-gray-200">
            💬 Would you like a customized morning routine guide for different fitness goals?
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
