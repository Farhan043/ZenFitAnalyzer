
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,FaExclamationTriangle,FaSpa, FaTint, FaAppleAlt, FaProcedures ,FaFish, FaThermometerThreeQuarters, FaShieldAlt,   FaDumbbell, FaRegHeart , FaBrain, FaSadCry, FaUtensils, FaRunning, FaUsers,FaHandsHelping,  FaBed, FaHeartbeat,FaBars, FaTimes  } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdOutlineMonitorHeart } from "react-icons/md";
import { GiBrain, GiMeditation } from "react-icons/gi";
// import { FaMosquito, FaThermometerThreeQuarters, FaShieldAlt } from "react-icons/fa";
import { MdOutlineSick, MdWaterDrop } from "react-icons/md";
// import { IoIosFitness } from "react-icons/io";

export default function Wellness11() {
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

  const medicines = [
    { name: "Paracetamol (Acetaminophen)", type: "Pain & Fever Relief", dosage: "500-1000mg every 6 hours (max 4g/day)", sideEffects: "Liver toxicity (if overdosed)", prescription: "No" },
    { name: "Oral Rehydration Salts (ORS)", type: "Fluid Replacement", dosage: "As needed to prevent dehydration", sideEffects: "None", prescription: "No" },
    { name: "IV Fluids", type: "Severe Cases", dosage: "10-20mg daily", sideEffects: "Fluid overload risk	", prescription: "Yes" },
    { name: "Platelet Transfusion", type: "Severe Dengue (Low Platelets)", dosage: "Only if levels drop critically", sideEffects: "Risk of transfusion reactions", prescription: "Yes" },
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

      <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">Dengue Fever</h1>

      <div className="mb-4 bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="text-red-500 text-2xl" />
            <h2 className="text-xl font-semibold">Disease Information</h2>
          </div>
          <p className="mt-2 text-gray-300">
            Dengue fever is a mosquito-borne viral infection transmitted by Aedes mosquitoes. It can cause flu-like symptoms and severe complications.
          </p>
        </div>
      </div>

      <div className="mb-4 bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <FaThermometerThreeQuarters className="text-yellow-500 text-2xl" />
            <h2 className="text-xl font-semibold">Symptoms</h2>
          </div>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>High fever (104°F or 40°C)</li>
            <li>Severe headaches</li>
            <li>Joint and muscle pain</li>
            <li>Skin rash (2-5 days after fever onset)</li>
            <li>Mild bleeding (nosebleeds, gum bleeding)</li>
          </ul>
        </div>
      </div>

      <div className="mb-4 bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <MdWaterDrop className="text-blue-500 text-2xl" />
            <h2 className="text-xl font-semibold">Causes</h2>
          </div>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Spread through bites of infected Aedes mosquitoes</li>
            <li>Dengue virus has four types (DENV-1 to DENV-4)</li>
            <li>Mosquitoes breed in stagnant water</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-green-500 text-2xl" />
            <h2 className="text-xl font-semibold">Preventive Measures</h2>
          </div>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li>Remove stagnant water to eliminate breeding sites</li>
            <li>Use mosquito repellents and wear protective clothing</li>
            <li>Install mosquito nets and window screens</li>
            <li>Vaccination (Dengvaxia) for those with a history of dengue</li>
          </ul>
        </div>
      </div>

        <h2 className="text-2xl font-bold mb-4 m-5 border-b pb-2">💊 Medicine Recommendations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-700">
                <thead>
                  <tr className="bg-gray-800 text-left">
                    <th className="p-2 border">Medicine Name</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Dosage & Usage</th>
                    <th className="p-2 border">Side Effects</th>
                    <th className="p-2 border">Prescription Required?</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, index) => (
                    <tr key={index} className="border border-gray-700 text-sm">
                      <td className="p-2 border font-semibold">{med.name}</td>
                      <td className="p-2 border">{med.type}</td>
                      <td className="p-2 border">{med.dosage}</td>
                      <td className="p-2 border">{med.sideEffects}</td>
                      <td className="p-2 border">{med.prescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-red-700 text-white rounded-lg flex items-center">
              <FaExclamationTriangle className="mr-2 text-yellow-300" />
              <span>
                <strong>🚨 Avoid Aspirin & Ibuprofen! </strong> These can worsen bleeding risks in dengue patients.
              </span>
            </div>
      
            <h2 className="text-2xl font-semibold mt-7 mb-4 flex items-center">
              <FaLeaf className="mr-2 text-green-400" /> Natural Alternatives
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaSpa className="text-yellow-400 mr-2" /> <strong>Papaya Leaf Extract: </strong> May help increase platelet count.
              </li>
              <li className="flex items-center">
                <FaBrain className="text-blue-400 mr-2" /> <strong>Coconut Water:</strong> Helps restore electrolytes and prevent dehydration.
              </li>
              <li className="flex items-center">
                <FaLeaf className="text-green-300 mr-2" /> <strong>Giloy (Tinospora cordifolia):</strong> Boosts immunity and supports recovery.
              </li>
            </ul>


            <h2 className="text-2xl font-bold mt-7 mb-4">🏡 Home Remedies & Wellness Tips</h2>
      
      {/* Herbal Remedies */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaLeaf className="mr-2 text-green-400" /> Herbal Remedies</h3>
        <ul className="list-disc ml-6">
          <li>🌿 <strong>Papaya Leaf Juice:</strong> Blend fresh leaves with water and drink 2 tbsp twice daily.</li>
          <li>🌿 <strong>Giloy Juice:</strong> Helps boost immunity and platelet count.</li>
          <li>🌿 <strong>Turmeric Milk:</strong> Acts as a natural immunity booster and anti-inflammatory.</li>
        </ul>
      </div>

      {/* Diet & Nutrition Advice */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaAppleAlt className="mr-2 text-yellow-400" /> Diet & Nutrition Advice</h3>
        <ul className="list-disc ml-6">
          <li>💧 <strong>Hydration is Key:</strong> Drink coconut water, ORS, and fresh juices.</li>
          <li>🥬 <strong>Iron-Rich Foods:</strong> Pomegranate, spinach, and beetroot to support blood cell production.</li>
          <li>🍊 <strong>Vitamin C Foods:</strong> Oranges, kiwi, and amla to strengthen immunity.</li>
          <li>⚠️ <strong>Avoid Spicy & Oily Foods:</strong> These can worsen nausea and digestive discomfort.</li>
        </ul>
      </div>

      {/* Exercise Recommendations */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaRunning className="mr-2 text-blue-400" /> Exercise Recommendations</h3>
        <ul className="list-disc ml-6">
          <li>🛌 <strong>Rest is Essential:</strong> Avoid strenuous activities to prevent exhaustion.</li>
          <li>🧘 <strong>Light Stretching:</strong> Once recovering, gentle movements can help regain strength.</li>
          <li>🌬️ <strong>Deep Breathing Exercises:</strong> Supports lung function and relaxation.</li>
        </ul>
      </div>

      {/* Lifestyle Changes */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaHeartbeat className="mr-2 text-red-400" /> Lifestyle Changes</h3>
        <ul className="list-disc ml-6">
          <li>🦟 <strong>Use Mosquito Nets:</strong> While sleeping to prevent bites.</li>
          <li>👕 <strong>Wear Light-Colored Clothing:</strong> Full-sleeved to avoid mosquito exposure.</li>
          <li>🛡️ <strong>Apply Mosquito Repellent:</strong> Regularly to protect yourself.</li>
          <li>🩺 <strong>Regular Blood Tests:</strong> Essential during recovery.</li>
        </ul>
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
