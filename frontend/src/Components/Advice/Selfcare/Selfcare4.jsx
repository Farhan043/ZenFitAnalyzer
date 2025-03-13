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

export default function Selfcare4() {
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


      <h2 className="text-4xl font-bold text-center mt-5 text-pink-500 mb-4">
    🌸 Self-Care Sundays: A Weekly Reset for Mind & Body
  </h2>
  <p className="text-lg text-gray-300 text-center max-w-8xl mx-auto">
    Take a break from the hustle. A dedicated self-care day can rejuvenate your mind, body, and soul—boosting happiness and reducing stress.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    
    {/* Relax & Unwind */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
      <img src="/public/Selfcare/relax.png" alt="Relaxing" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-blue-400">🛀 Relax & Unwind</h3>
      <p className="text-gray-300 mt-2">
        Take a long bath, light a candle, or listen to calming music. Self-care starts with relaxation.
      </p>
    </div>

    {/* Digital Detox */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
    <img src="/public/Selfcare/detox.png" alt="Digital Detox" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-green-400">📵 Digital Detox</h3>
      <p className="text-gray-300 mt-2">
        Disconnect from screens and social media. Enjoy real-world moments with yourself or loved ones.
      </p>
    </div>

    {/* Nourish Your Body */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
    <img src="/public/Selfcare/healthy.png"  alt="Healthy Food" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-yellow-400">🥗 Nourish Your Body</h3>
      <p className="text-gray-300 mt-2">
        Prepare a wholesome meal filled with nutrients. Eating well fuels both your body and mind.
      </p>
    </div>

    {/* Move Your Body */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
    <img src="/public/Selfcare/yoga.png" alt="Yoga" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-purple-400">🧘 Move Your Body</h3>
      <p className="text-gray-300 mt-2">
        Do yoga, stretch, or take a mindful walk. Physical activity releases stress and boosts energy.
      </p>
    </div>

    {/* Journaling */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
    <img src="/public/Selfcare/diaro.png" alt="Journaling" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-orange-400">📖 Journaling & Reflection</h3>
      <p className="text-gray-300 mt-2">
        Write down thoughts, gratitude, or weekly goals. Self-reflection is key for growth.
      </p>
    </div>

    {/* Quality Sleep */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
    <img src="/public/Selfcare/quality.png" alt="Sleep" className="w-32 h-32 mb-4"/>
      <h3 className="text-xl font-bold text-teal-400">💤 Quality Sleep</h3>
      <p className="text-gray-300 mt-2">
        End your Sunday early. A good night's sleep sets the tone for a fresh, energized week ahead.
      </p>
    </div>

  </div>


  <h2 className="text-4xl font-bold text-center mt-6 text-blue-400 mb-4">
    🌿 Why Self-Care Matters
  </h2>
  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
    Prioritizing self-care enhances mental clarity, emotional balance, and overall well-being. According to <span className="text-blue-400 font-semibold">Psychology Today</span>, self-care consists of four essential pillars.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
    
    {/* Nutrition */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/nutr.png" alt="Nutrition" className="w-24 h-24 mb-4"/>
      <h3 className="text-xl font-bold text-yellow-400">🥗 Nutrition</h3>
      <p className="text-gray-300 mt-2">
        A balanced diet fuels both the body and mind, enhancing mood and cognitive function.
      </p>
    </div>

    {/* Sleep */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
    <img src="/public/Selfcare/sl.png" alt="Sleep" className="w-24 h-24 mb-4"/>
      <h3 className="text-xl font-bold text-blue-400">💤 Sleep</h3>
      <p className="text-gray-300 mt-2">
        Quality sleep supports emotional resilience and brain function, reducing stress levels.
      </p>
    </div>

    {/* Physical Activity */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
    <img src="/public/Selfcare/activity.png" alt="Exercise" className="w-24 h-24 mb-4"/>
      <h3 className="text-xl font-bold text-green-400">🏃‍♂️ Physical Activity</h3>
      <p className="text-gray-300 mt-2">
        Exercise releases endorphins, improving mood and energy levels while reducing anxiety.
      </p>
    </div>

    {/* Mental Relaxation */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
    <img src="/public/Selfcare/mental.png" alt="Relaxation" className="w-24 h-24 mb-4"/>
      <h3 className="text-xl font-bold text-purple-400">🧘 Mental Relaxation</h3>
      <p className="text-gray-300 mt-2">
        Meditation, journaling, and mindfulness enhance emotional balance and focus.
      </p>
    </div>

  </div>

  <div className="mt-8">
    <p className="text-gray-400 text-lg">
      Studies show that consistent self-care reduces symptoms of depression and anxiety. Start today for a healthier, happier you!
    </p>
  </div>
  


  <h2 className="text-4xl font-bold  mt-6 text-center text-purple-400 mb-6">
    🌿 How to Structure a Self-Care Sunday
  </h2>

  <div className="space-y-6">
    
    {/* Slow & Mindful Morning */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/yoga.png" alt="Mindful Morning" className="w-24 h-24 md:mr-6"/>
      <div>
        <h3 className="text-2xl font-semibold text-blue-400">🌅 Start with a Slow and Mindful Morning</h3>
        <p className="text-gray-300 mt-2">
          Wake up naturally, enjoy a nutritious breakfast, and avoid social media to maintain a peaceful mindset.
        </p>
      </div>
    </div>

    {/* Engage in Physical Movement */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/activity.png" alt="Physical Movement" className="w-24 h-24 md:mr-6"/>
      <div>
        <h3 className="text-2xl font-semibold text-green-400">🏃‍♀️ Engage in Physical Movement</h3>
        <p className="text-gray-300 mt-2">
          A relaxing walk, yoga, or stretching helps relieve stress. Spending time outdoors boosts relaxation.
        </p>
      </div>
    </div>

    {/* Prioritize Mental Well-Being */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/mental.png" alt="Mental Well-Being" className="w-24 h-24 md:mr-6"/>
      <div>
        <h3 className="text-2xl font-semibold text-yellow-400">🧘 Prioritize Mental Well-Being</h3>
        <p className="text-gray-300 mt-2">
          Try journaling, meditation, or engaging in hobbies to enhance emotional clarity and focus.
        </p>
      </div>
    </div>

    {/* Indulge in Self-Care Rituals */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/yourself.png" alt="Self-Care Rituals" className="w-24 h-24 md:mr-6"/>
      <div>
        <h3 className="text-2xl font-semibold text-pink-400">🛀 Indulge in Self-Care Rituals</h3>
        <p className="text-gray-300 mt-2">
          Take a bath, unplug from technology, and nourish your body with healthy meals.
        </p>
      </div>
    </div>

    {/* Plan for the Upcoming Week */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
      <img src="/public/Selfcare/week.png" alt="Plan Week" className="w-24 h-24 md:mr-6"/>
      <div>
        <h3 className="text-2xl font-semibold text-orange-400">📅 Plan for the Upcoming Week</h3>
        <p className="text-gray-300 mt-2">
          Set small goals, prepare meals, and reflect on gratitude to ensure a productive week.
        </p>
      </div>
    </div>

  </div>

  <div className="mt-8 text-center">
    <p className="text-gray-400 text-lg">
      Making **Self-Care Sundays** a habit ensures long-term wellness and balance.
    </p>
  </div>


  <div className=" text-white p-8 rounded-lg shadow-lg ">
    <h2 className="text-3xl font-bold">🌿 Final Thoughts</h2>
    <p className="text-lg mt-4">
      By incorporating <span className="font-semibold">Self-Care Sundays</span> into your routine,  
      you invest in <span className="text-yellow-300">long-term mental and physical well-being</span>.  
      Prioritizing yourself for even one day a week can:
    </p>
    
    <ul className="mt-4 space-y-3 text-lg">
      <li>✅ Improve **resilience**</li>
      <li>✅ Reduce **stress & anxiety**</li>
      <li>✅ Enhance **your overall quality of life**</li>
    </ul>

    <p className="mt-6 text-lg">
      Start small—**make self-care a habit** and enjoy a healthier, more balanced life! 💜
    </p>
  {/* </div> */}
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

