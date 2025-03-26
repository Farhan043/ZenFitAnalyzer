import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Wellness = () => {
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

  const wellnessData = [
    { title: "🤧 Common Cold", description: "Understanding the symptoms, causes, and best solutions for relief.", link: "/Wellness1" },
    { title: "🦠 Flu (Influenza)", description: "Influenza (flu) is a highly contagious viral infection affecting the respiratory system.", link: "/Wellness2" },
    { title: "Diabetes (Type 1 & Type 2)", description: "Diabetes is a chronic condition that affects how the body processes blood sugar (glucose).", link: "/Wellness3" },
    { title: "Hypertension (High Blood Pressure)", description: "Hypertension is a chronic condition where blood pressure levels remain too high.", link: "/Wellness4" },
    { title: "❤️ Heart Disease", description: "Heart disease refers to a group of conditions that affect the heart and blood vessels.", link: "/Wellness5" },
    { title: "🫁 Pneumonia", description: "Pneumonia is a lung infection that causes inflammation of the air sacs.", link: "/Wellness6" },
    { title: "🩺 Liver Disease", description: "Hepatitis and fatty liver disease can impact liver function significantly.", link: "/Wellness7" },
    { title: "⚡ Kidney Stones", description: "Kidney stones are hard mineral deposits that can cause severe pain and require treatment.", link: "/Wellness8" },
    { title: "Anemia", description: "Anemia is a condition where the body lacks enough healthy red blood cells to carry oxygen.", link: "/Wellness9" },
    { title: "🧠 Depression & Anxiety", description: "Depression and anxiety are mental health disorders that affect emotions and daily life.", link: "/Wellness10" },
    { title: "Dengue Fever", description: "Dengue fever is a mosquito-borne viral infection that can cause severe complications.", link: "/Wellness11" },
  ];
  


  return (
    <>
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
              <Link to="/social" className="hover:text-blue-400 transition">
                community
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
                        to="/Wellness"
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
              <Link
                to="/home"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/meal"
                className="py-2 px-4 hover:bg-gray-700 rounded-md"
              >
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
                    to="/Wellness"
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

        <div className="bg-slate-900 min-h-screen py-10 px-5 text-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">Wellness & Health Tips</h2>
      <div className="max-w-4xl mx-auto grid gap-6">
        {wellnessData.map((item, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md hover:bg-gray-700 transition">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 mt-2">{item.description}</p>
            <Link to={item.link} className="text-blue-400 font-semibold mt-3 inline-block hover:underline">
              READ MORE
            </Link>
          </div>
        ))}
      </div>
            </div>
            </div>
    </>
  );
};

export default Wellness;
