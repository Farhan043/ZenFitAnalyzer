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

export default function Selfcare3() {
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

      <h2 className="text-3xl font-bold mt-6 text-center text-blue-400 mb-6">
    🧘‍♂️ Mindfulness & Meditation for Stress Relief
  </h2>
  <p className="text-center text-gray-300 max-w-2xl mx-auto">
    Stress is an unavoidable part of life, but mindfulness and meditation can enhance 
    emotional regulation, reduce anxiety, and improve focus. Here’s how it works 
    and some easy exercises to incorporate into your routine.
  </p>

  <div className="grid md:grid-cols-2 gap-6 mt-8">
    {/* How It Works */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-green-400">🌿 How It Works</h3>
      <p className="mt-2 text-gray-300">
        Mindfulness helps you stay present and aware, reducing stress by 
        shifting focus from worries to the present moment. Meditation trains 
        the brain to manage thoughts more effectively.
      </p>
    </div>

    {/* Benefits of Mindfulness */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-yellow-400">✨ Benefits of Mindfulness</h3>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> Improves focus and attention.</li>
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> Reduces stress and anxiety.</li>
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> Enhances emotional regulation.</li>
      </ul>
    </div>

    {/* Simple Mindfulness Exercises */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-blue-400">🧘‍♀️ Simple Mindfulness Exercises</h3>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> 5-Minute Breathing Meditation.</li>
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> Body Scan Relaxation Technique.</li>
        <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-2" /> Gratitude Reflection.</li>
      </ul>
    </div>

    {/* How to Incorporate Mindfulness */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-red-400">🔄 How to Incorporate Mindfulness</h3>
      <p className="mt-2 text-gray-300">
        Start with just 5 minutes a day, gradually increasing over time. 
        Practice during daily activities like eating, walking, or even 
        brushing your teeth.
      </p>
    </div>
  </div>

  <h2 className="text-3xl font-bold mt-5 text-center text-blue-400 mb-6">
    🧠 How Mindfulness & Meditation Affect the Brain
  </h2>
  <p className="text-center text-gray-300 max-w-2xl mx-auto">
    Scientific research shows that mindfulness meditation enhances brain 
    structure, improving emotional regulation, focus, and stress resilience.
  </p>

  <div className="grid md:grid-cols-2 gap-6 mt-8">
    {/* Neuroplasticity & Cortical Growth */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-green-400">🔬 Neuroplasticity & Cortical Growth</h3>
      <p className="mt-2 text-gray-300">
        Studies confirm that mindfulness meditation increases cortical thickness, 
        strengthening neural connections and brain plasticity.
      </p>
    </div>

    {/* Reduced Amygdala Reactivity */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-yellow-400">⚡ Reduced Amygdala Reactivity</h3>
      <p className="mt-2 text-gray-300">
        Meditation reduces activity in the amygdala—the brain’s center for stress 
        and fear—helping lower anxiety and emotional reactivity.
      </p>
    </div>

    {/* Harvard Study on Brain Changes */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-blue-400">🧑‍⚕️ Harvard Study on Brain Changes</h3>
      <p className="mt-2 text-gray-300">
        An 8-week mindfulness program can physically reshape brain structures, 
        improving focus and emotional resilience.
      </p>
    </div>

    {/* Mindfulness-Based Stress Reduction (MBSR) */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-red-400">🛡️ Mindfulness-Based Stress Reduction (MBSR)</h3>
      <p className="mt-2 text-gray-300">
        MBSR enhances brain regions linked to emotional regulation, strengthening 
        the mind’s ability to manage stress over time.
      </p>
    </div>

    {/* Enhanced Sensory & Attentional Processing */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-purple-400">🔍 Enhanced Sensory & Attentional Processing</h3>
      <p className="mt-2 text-gray-300">
        Mindfulness improves "bottom-up" sensory perception and "top-down" focus, 
        helping you filter distractions and stay present.
      </p>
    </div>
  </div>

  <h2 className="text-3xl mt-6 font-bold text-center text-blue-400 mb-2">
    🌿 Simple Mindfulness Exercises for Stress Relief
  </h2>
  <p className="text-center text-gray-300 max-w-2xl mx-auto mb-6">
    Reduce stress and improve focus with these simple, science-backed mindfulness techniques.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* 5-4-3-2-1 Grounding Technique */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-green-400">🛠️ 5-4-3-2-1 Grounding</h3>
      <p className="mt-2 text-gray-300">
        A quick way to anchor yourself in the present:
      </p>
      <ul className="mt-3 space-y-1 text-gray-400">
        <li>👀 Identify <strong>5 things</strong> you can see.</li>
        <li>🖐️ Recognize <strong>4 things</strong> you can touch.</li>
        <li>👂 Notice <strong>3 things</strong> you can hear.</li>
        <li>👃 Acknowledge <strong>2 things</strong> you can smell.</li>
        <li>👅 Think of <strong>1 thing</strong> you can taste.</li>
      </ul>

      <p className="mt-4 text-gray-300">This technique shifts focus away from stress and into the immediate moment.</p>
    </div>

    {/* Box Breathing */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-blue-400">💨 Box Breathing (Navy SEAL Technique)</h3>
      <p className="mt-2 text-gray-300">
        A powerful breathing exercise to calm your nervous system:
      </p>
      <ul className="mt-3 space-y-1 text-gray-400">
        <li>🫁 Inhale deeply for <strong>4 seconds</strong>.</li>
        <li>⏳ Hold your breath for <strong>4 seconds</strong>.</li>
        <li>🌬️ Exhale slowly for <strong>4 seconds</strong>.</li>
        <li>⏳ Hold again for <strong>4 seconds</strong>, then repeat.</li>
      </ul>
      <p className="mt-4 text-gray-300">This method helps calm the nervous system and increase focus.</p>
    </div>

    {/* Body Scan Meditation */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-yellow-400">🧘‍♂️ Body Scan Meditation</h3>
      <p className="mt-2 text-gray-300">
        A relaxation technique to improve sleep and awareness:
      </p>
      <ul className="mt-3 space-y-1 text-gray-400">
        <li>🛏️ Lie down and close your eyes.</li>
        <li>🧠 Focus on different body parts, from toes to head.</li>
        <li>💭 Observe sensations without judgment.</li>
      </ul>
      <p className="mt-4 text-gray-300">A study found that mindfulness meditation, including body scanning, improves sleep quality and reduces insomnia</p>
    </div>

    {/* Guided Meditation */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-purple-400">🌊 Guided Meditation</h3>
      <p className="mt-2 text-gray-300">
        Reduce cortisol and stress by visualizing a peaceful place:
      </p>
      <ul className="mt-3 space-y-1 text-gray-400">
        <li>🌴 Close your eyes and imagine a beach, forest, or peaceful scene.</li>
        <li>👂 Focus on sights, sounds, and sensations.</li>
        <li>⏳ Spend <strong>5-10 minutes</strong> immersing yourself in the moment.</li>
      </ul>
      <p className="mt-4 text-gray-300">This method is effective in reducing cortisol levels and stress responses</p>
    </div>

    {/* Mindful Walking */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-red-400">🚶‍♂️ Mindful Walking</h3>
      <p className="mt-2 text-gray-300">
        Combine movement with mindfulness:
      </p>
      <ul className="mt-3 space-y-1 text-gray-400">
        <li>👣 Walk slowly and focus on each step.</li>
        <li>🌬️Focus on how your feet feel against the ground, the rhythm of your breathing, and surrounding sounds.</li>
        <li>🔄 HThis exercise combines movement with mindfulness, helping to reduce stress and increase awareness.</li>
      </ul>
    </div>
  </div>

      <div className="bg-white bg-opacity-10 mt-5 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-8xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          🚀 Final Thoughts
        </h2>
        <p className="text-lg text-gray-300 mb-4">
        Mindfulness and meditation offer scientifically backed benefits for stress relief, improved focus, and emotional regulation. Incorporating even a few minutes of mindful practice daily can create lasting positive effects on both mental and physical well-being.
        </p>
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
