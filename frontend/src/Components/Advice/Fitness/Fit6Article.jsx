import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";


export default function Fit6Article() {

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
    //   <div className="mt-8 p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg max-w-8xl mx-auto">
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


        <h2 className="text-2xl font-bold text-blue-400 mt-5 text-center mb-4">
          How to Stay Consistent with Your Fitness Routine
        </h2>
        <p className="text-gray-300 text-center mb-6">
        Starting a fitness journey is easy, but staying consistent? That’s the real challenge. Many people begin with motivation but struggle to maintain a routine after a few weeks. The secret to long-term fitness success isn’t willpower—it’s building sustainable habits.
        </p>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-400">{section.title}</h3>
              <p className="text-gray-300 mt-2">{section.description}</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                {section.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            
          ))}
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
  
  const sections = [
    {
      title: "Set Clear, Realistic Goals",
      description: "Without a goal, it’s easy to lose focus. Use the SMART method to create structured fitness goals.",
      points: [
        "Specific → 'I want to lose 10 lbs' instead of 'I want to get fit.'",
        "Measurable → Track workouts, weight, or endurance levels.",
        "Achievable → Set goals that fit your lifestyle.",
        "Relevant → Align your fitness goal with your personal reasons.",
        "Time-bound → Set a deadline (e.g., 'In 3 months, I want to run a 5K').",
      ],
    },
    {
      title: "Find a Workout You Enjoy",
      description: "If you hate your workout, you won’t stick with it. Enjoyment leads to consistency.",
      points: [
        "Experiment with different workouts like strength training, yoga, HIIT, running, or group classes.",
        "Mix it up to avoid boredom—alternate exercises and locations.",
        "Choose an activity that fits your personality (team sports, solo workouts, guided classes).",
      ],
    },
    {
      title: "Create a Schedule & Treat Workouts Like Appointments",
      description: "A planned workout is more likely to happen than a spontaneous one.",
      points: [
        "Pick specific workout days/times and add them to your calendar.",
        "Treat workouts like important meetings—non-negotiable.",
        "Plan workouts around your most energetic times (morning, lunch, evening).",
      ],
    },
    {
      title: "Start Small & Build Up",
      description: "Overcommitting leads to burnout. Small, manageable steps create lasting habits.",
      points: [
        "Start with short workouts (10-15 minutes) and gradually increase.",
        "Focus on consistency first, intensity later.",
        "Set mini-goals to build momentum.",
      ],
    },
    {
      title: "Find an Accountability System",
      description: "Accountability boosts commitment and motivation when discipline fades.",
      points: [
        "Get a workout buddy or join a fitness group.",
        "Use fitness apps to track progress.",
        "Announce your goals publicly for extra motivation.",
      ],
    },
    {
      title: "Remove Barriers & Make It Convenient",
      description: "If workouts are hard to access, you’ll skip them. Make fitness as easy as possible.",
      points: [
        "Prepare in advance—set out workout clothes and gear.",
        "Pick a gym or workout space nearby.",
        "Keep a backup plan for quick home workouts.",
      ],
    },
    {
      title: "Focus on Progress, Not Perfection",
      description: "Progress fuels motivation, while perfectionism leads to frustration.",
      points: [
        "Track non-scale victories like strength gains and endurance.",
        "Celebrate small wins.",
        "Accept setbacks—missing one workout isn’t failure.",
      ],
    },
    {
      title: "Keep It Fun & Reward Yourself",
      description: "Rewards create positive reinforcement, making workouts enjoyable.",
      points: [
        "Reward consistency with new workout gear or a spa day.",
        "Turn workouts into challenges like a 30-day plank challenge.",
        "Listen to music, podcasts, or audiobooks during workouts.",
      ],
    },
    {
      title: "Prioritize Recovery & Listen to Your Body",
      description: "Burnout leads to quitting. Proper recovery ensures sustainability.",
      points: [
        "Get 7-9 hours of sleep for muscle repair.",
        "Schedule rest days to prevent overtraining.",
        "Stay hydrated and eat nutrient-dense foods.",
      ],
    },
    {
      title: "Remember Your 'Why' & Stay Motivated",
      description: "Your why keeps you going when motivation fades.",
      points: [
        "Write down why you want to stay fit.",
        "Visualize success and stay inspired.",
        "Follow fitness influencers or join a community for support.",
      ],
    },
  ];

  
  