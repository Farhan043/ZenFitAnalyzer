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

export default function Selfcare5() {
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

 {/* Header Section */}
 <div className="text-center">
    <h2 className="text-4xl mt-6 font-bold bg-gradient-to-r from-blue-500 to-green-500 text-white inline-block px-6 py-2 rounded-lg shadow-lg">
      🏋️‍♂️ Balancing Fitness & Mental Health
    </h2>
    <p className="text-lg text-gray-300 mt-4">
      Understanding the connection between **physical activity and emotional resilience** can transform  
      your approach to well-being. Exercise isn't just about fitness—it’s about **mental strength too**.  
    </p>
  </div>

  {/* Hero Image */}
  <div className="flex justify-center my-6">
    <img 
      src="/public/Selfcare/selfcare5.png" 
      alt="Fitness and Mental Health" 
      className="w-full max-w-3xl rounded-lg shadow-lg"
    />
  </div>

  {/* Content Section */}
  <div className="bg-gray-900 text-white  p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold mb-4">Why Fitness Supports Mental Well-being</h3>
    
    <ul className="space-y-3 text-lg">
      <li>✅ **Boosts Mood** – Releases **endorphins** that reduce stress and anxiety.</li>
      <li>✅ **Enhances Focus** – Improves cognitive function & memory.</li>
      <li>✅ **Builds Resilience** – Strengthens the mind against emotional challenges.</li>
      <li>✅ **Promotes Better Sleep** – Helps regulate your sleep cycle.</li>
      <li>✅ **Reduces Depression** – Scientifically proven to **alleviate symptoms** of depression.</li>
    </ul>

    <p className="mt-6 text-lg text-gray-300">
      Making exercise a **part of your self-care routine** can lead to a **happier, healthier life**.
    </p>
  </div>



  <div className="text-center">
    <h2 className="text-4xl mt-6 font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white inline-block px-6 py-2 rounded-lg shadow-lg">
      🏃‍♂️ Exercise & Mental Health: The Science Behind It
    </h2>
    <p className="text-lg text-gray-300 mt-4">
      Discover how **physical activity reduces stress, boosts mood, and enhances emotional resilience.**  
    </p>
  </div>

  {/* Content Sections */}
  <div className="mt-8 space-y-8">

    {/* 1. Exercise as an Antidepressant */}
    <div className="bg-gray-900  text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold">📉 Exercise as a Natural Antidepressant</h3>
      <p className="mt-2 text-lg">
        Studies show that **regular movement significantly reduces depressive symptoms.** Even small  
        actions like **walking or taking the stairs** lower the risk of depression.
      </p>
    </div>

    {/* 2. Exercise and Brain Chemistry */}
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold">🧠 Exercise & Brain Chemistry</h3>
      <p className="mt-2 text-lg">
        Physical activity releases **endorphins (happiness chemicals)** and increases  
        **brain-derived neurotrophic factor (BDNF),** which improves learning, memory, and cognitive function.
      </p>
    </div>

    {/* 3. Stress Reduction */}
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold">💆‍♀️ Movement for Stress Reduction</h3>
      <p className="mt-2 text-lg">
        Exercise **lowers cortisol (stress hormone)** while boosting serotonin and dopamine,  
        which help **regulate mood and promote relaxation**.
      </p>
    </div>

    {/* 4. Emotional Resilience */}
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold">💪 Building Emotional Resilience</h3>
      <p className="mt-2 text-lg">
        Activities like **yoga, strength training, and team sports** build both **mental and  
        physical resilience**, improving overall well-being.
      </p>
    </div>

    {/* 5. Recommended Exercise Duration */}
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold">⏳ How Much Exercise is Needed?</h3>
      <p className="mt-2 text-lg">
        Just **15 minutes of intense exercise** (like running) or **an hour of moderate activity**  
        (like walking) significantly reduces depression risk. Even **cleaning or gardening counts!**
      </p>
    </div>

  </div>

  {/* Card Container */}
  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-lg shadow-lg text-center">
    
    {/* Header */}
    <h2 className="text-3xl font-bold">🌿 Final Thoughts</h2>
    
    {/* Text Content */}
    <p className="mt-4 text-lg">
      **Balancing fitness and mental health** isn’t about extremes—it’s about finding movement  
      that supports **your well-being**. Whether it’s a **brisk nature walk, a yoga session, or  
      lifting weights**, exercise is a **powerful tool** for reducing stress, boosting mood,  
      and fostering emotional resilience.  
    </p>

    <p className="mt-4 text-lg font-semibold">
      Prioritize **movement as self-care** and build a sustainable **mind-body connection**.
    </p>

    {/* Encouraging CTA */}
    <div className="mt-6">
      <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition">
        Start Your Wellness Journey 💪
      </button>
    </div>

   
        <div className="mt-6">
          <Link
            to="/home"
            className="text-blue-100 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
  </div>

      </div>
  );
}

// Reusable Card Component

