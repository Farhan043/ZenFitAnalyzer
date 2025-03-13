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
   Users, HeartPulse , RefreshCw, XCircle,  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Selfcare6() {
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
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

  const selfCareTopics = [
    { title: "Mindfulness", description: "Practice being present and fully engaged in the moment." },
    { title: "Sleep Hygiene", description: "Maintain a consistent sleep schedule for better rest." },
    { title: "Healthy Eating", description: "Consume balanced meals rich in nutrients." },
    { title: "Hydration", description: "Drink enough water to keep your body functioning well." },
    { title: "Exercise", description: "Engage in physical activities to maintain overall health." },
    { title: "Journaling", description: "Write down your thoughts and emotions to process them better." },
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

  {/* Section Header */}
  <div className="text-center mt-6 mb-8">
    <h2 className="text-3xl font-bold text-blue-400">📵 Digital Detox</h2>
    <p className="mt-2 text-lg text-gray-100">
      Reclaim your time for **mental clarity** and **relaxation** by reducing screen time.
    </p>
  </div>

  {/* Content Grid */}
  <div className="grid md:grid-cols-2 gap-8 items-center">
    
    {/* Image */}
    <img
      src="/public/Selfcare/detox.png"
      alt="Digital Detox"
      className="rounded-lg shadow-lg"
    />
    
    {/* Text Content */}
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-100">Why Digital Detox Matters?</h3>
      <p className="text-gray-200">
        In today’s **hyperconnected world**, constant digital engagement can lead to 
        **stress, anxiety, and cognitive overload**. Taking breaks from screens can:  
      </p>

      {/* Benefits List */}
      <ul className="space-y-3">
        <li className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" /> Improve **mental clarity & focus**.
        </li>
        <li className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" /> Enhance **sleep quality**.
        </li>
        <li className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" /> Strengthen **relationships & real-life connections**.
        </li>
      </ul>
    </div>
  </div>

  
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold mt-8 text-gray-100">📱 Why a Digital Detox Matters</h2>
    <p className="mt-2 text-lg text-gray-200">
      Excessive screen time affects **mental well-being**, **attention span**, and **emotional regulation**.  
      Learn how taking a break can **recharge your mind**.
    </p>
  </div>

  {/* Content Grid */}
  <div className="grid md:grid-cols-2 gap-8 items-center">
    
    {/* Image */}
    <img
      src="/public/Selfcare/detox.png"
      alt="Brain impact from digital overload"
      className="rounded-lg shadow-lg"
    />
    
    {/* Text Content */}
    <div className="space-y-6">
      
      {/* Brain Health Impact */}
      <div className="flex items-start">
        <Brain className="text-blue-500 w-8 h-8 mr-3" />
        <div>
          <h3 className="text-xl font-semibold text-gray-100">🧠 Digital Overload & Brain Health</h3>
          <p className="text-gray-200">
            MRI studies show that **excessive screen time** reduces gray matter 
            in areas responsible for **decision-making & emotional control**.
          </p>
        </div>
      </div>

      {/* Social Media & Mental Health */}
      <div className="flex items-start">
        < XCircle className="text-red-500 w-8 h-8 mr-3" />
        <div>
          <h3 className="text-xl font-semibold text-gray-100">🚨 Social Media & Anxiety</h3>
          <p className="text-gray-200">
            The **"Fear of Missing Out" (FOMO)** and **constant comparison** online contribute to stress, 
            anxiety, and negative self-perception.
          </p>
        </div>
      </div>

      {/* Recovery & Neuroplasticity */}
      <div className="flex items-start">
        <RefreshCw className="text-green-500 w-8 h-8 mr-3" />
        <div>
          <h3 className="text-xl font-semibold text-gray-100">🌱 Your Brain Can Recover</h3>
          <p className="text-gray-200">
            Thanks to **neuroplasticity**, **digital detoxing** can reverse negative effects, 
            helping improve **focus, memory, and emotional balance**.
          </p>
        </div>
      </div>
    </div>
  </div>

 
  <div className="text-center mt-12 mb-10">
        <h2 className="text-3xl font-bold  text-gray-100">📵 Proven Benefits of a Digital Detox</h2>
        <p className="mt-2 text-lg text-gray-200">
          Reducing screen time leads to **better sleep, improved focus, deeper relationships,** and **reduced stress**.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Sleep Quality */}
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
          <Moon className="text-blue-500 w-12 h-12 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Better Sleep Quality</h3>
          <p className="text-gray-600 mt-2">
            Limiting screens before bedtime reduces **blue light exposure**, improving melatonin production 
            and promoting restful sleep. (*American Academy of Sleep Medicine*)
          </p>
        </div>

        {/* Mental Clarity */}
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
          <Brain className="text-purple-500 w-12 h-12 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Enhanced Mental Clarity</h3>
          <p className="text-gray-600 mt-2">
            Without constant notifications, **problem-solving & creativity improve**. Studies show unplugging 
            leads to **higher cognitive performance**. (*Psychological Science*)
          </p>
        </div>

        {/* Strengthened Relationships */}
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
          <Users className="text-green-500 w-12 h-12 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Stronger Relationships</h3>
          <p className="text-gray-600 mt-2">
            Offline activities **deepen emotional connections**. Families who replace screen time 
            with board games & outdoor fun report **better bonding**. (*Vivalyze*)
          </p>
        </div>

        {/* Reduced Stress & Anxiety */}
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center">
          <HeartPulse className="text-red-500 w-12 h-12 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Less Stress & Anxiety</h3>
          <p className="text-gray-600 mt-2">
            Mindfulness, meditation, and yoga **help rewire the brain** to resist digital distractions, 
            leading to a calmer mind. (*Michigan Health & Wellness*)
          </p>
        </div>

      </div>


      <h2 className="text-xl font-semibold mt-6 text-center mb-4">Self-Care Advice</h2>
      <div className="grid grid-cols-2 gap-4">
        {selfCareTopics.map((topic, index) => (
          <div key={index} onClick={() => setSelectedTopic(topic)} className="cursor-pointer p-4 bg-slate-900">
            <divContent>
              <h3 className="text-lg font-medium">{topic.title}</h3>
            </divContent>
          </div>
        ))}
      </div>
      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{selectedTopic.title}</h3>
              <Button variant="ghost" onClick={() => setSelectedTopic(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p>{selectedTopic.description}</p>
          </div>
        </div>
      )}
     
     <h2 className="text-2xl font-bold mt-10 text-center text-gray-100">Final Thoughts - Overcoming Challenges</h2>
        <p className="text-gray-200 mt-4">
          Many people struggle with withdrawal symptoms when reducing screen use,
          including restlessness or the fear of missing out. However, structured detox
          plans, offline hobbies, and support from family or friends can help make the
          transition smoother (Vivalyze).
        </p>
        <p className="text-gray-200 mt-4">
          By taking intentional breaks from digital devices, you can reclaim your time,
          boost mental well-being, and improve your overall quality of life. A digital
          detox is not about eliminating technology but finding balance and using it in
          ways that enrich, rather than consume, your life.
        </p>
        <button className="mt-6 bg-slate-900 text-white py-2 px-4 rounded-lg shadow-md ">
          Start Your Detox Journey
        </button>
   
        <div className="mt-6">
          <Link
            to="/home"
            className="text-blue-100 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
  </div>

  );
}

// Reusable div Component

