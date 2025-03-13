
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Tooltip } from "@mui/material";
import { Info } from "lucide-react"
import { FaLeaf, FaLemon, FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness9() {
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
    {
      name: "Ferrous Sulfate (Iron Supplement)",
      type: "Iron Replacement",
      dosage: "325mg daily",
      sideEffects: "Constipation, nausea",
      prescription: "No",
    },
    {
      name: "Folic Acid",
      type: "Vitamin B9 Supplement",
      dosage: "400-1000mcg daily",
      sideEffects: "Stomach upset",
      prescription: "No",
    },
    {
      name: "Vitamin B12 (Cyanocobalamin)",
      type: "B12 Replacement",
      dosage: "1000mcg (oral or injection)",
      sideEffects: "Rare but possible allergic reaction",
      prescription: "Yes (for injection)",
    },
    {
      name: "Epoetin Alfa (Procrit, Epogen)",
      type: "Stimulates RBC production",
      dosage: "Dosage varies (injection)",
      sideEffects: "Increased blood pressure, headache",
      prescription: "Yes",
    },
    {
      name: "Hydroxyurea (for Sickle Cell Anemia)",
      type: "Reduces sickling of RBCs",
      dosage: "15-35mg/kg daily",
      sideEffects: "Bone marrow suppression",
      prescription: "Yes",
    },
  ];
  
  const alternatives = [
    "Beetroot Juice: Increases hemoglobin naturally.",
    "Spinach & Kale: Rich in iron and folate.",
    "Dates & Raisins: Natural sources of iron and energy.",
    "Liver & Red Meat: High in heme iron (better absorbed by the body).",
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

      <div className="max-w-8xl mx-auto p-6 bg-slate-900 mt-5 rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
        <FaTint className="mr-2" /> Anemia Information & Solutions
      </h1>

      {/* Description */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Description</h2>
        <p className="text-gray-200">
          Anemia is a condition where the body lacks enough healthy red blood
          cells to carry oxygen. It can cause fatigue, weakness, and other
          complications.
        </p>
      </section>

      {/* Symptoms */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-red-500 flex items-center">
          <FaHeartbeat className="mr-2 text-red-500" /> Symptoms
        </h2>
        <ul className="list-disc pl-6 text-gray-200">
          <li>Fatigue and weakness</li>
          <li>Pale or yellowish skin</li>
          <li>Shortness of breath</li>
          <li>Dizziness or lightheadedness</li>
          <li>Cold hands and feet</li>
          <li>Rapid or irregular heartbeat</li>
          <li>Chest pain (in severe cases)</li>
          <li>Headaches</li>
        </ul>
      </section>

      {/* Causes */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-blue-400 flex items-center">
          <FaTint className="mr-2 text-blue-500" /> Causes
        </h2>
        <ul className="list-disc pl-6 text-gray-200">
          <li>Iron Deficiency</li>
          <li>Vitamin B12 or Folate Deficiencies</li>
          <li>Chronic Diseases</li>
          <li>Bone Marrow Disorders</li>
          <li>Blood Loss</li>
          <li>Inherited Conditions</li>
        </ul>
      </section>

      {/* Preventive Measures */}
      <section>
        <h2 className="text-xl font-semibold text-green-400 flex items-center">
          <FaUtensils className="mr-2 text-green-500" /> Preventive Measures
        </h2>
        <ul className="list-disc pl-6 text-gray-200">
          <li>Eat Iron-Rich Foods</li>
          <li>Consume Vitamin C for better absorption</li>
          <li>Get enough Vitamin B12 & Folate</li>
          <li>Limit Tea & Coffee During Meals</li>
          <li>Regular Health Checkups</li>
        </ul>
      </section>


      <h2 className="text-2xl font-bold border-b pb-2 mt-5 mb-4">💊 Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full   border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-3 text-left border">Medicine Name</th>
              <th className="p-3 text-left border">Type</th>
              <th className="p-3 text-left border">Dosage & Usage</th>
              <th className="p-3 text-left border">Side Effects</th>
              <th className="p-3 text-left border">Prescription Required?</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr
                key={index}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3 border font-semibold">{med.name}</td>
                <td className="p-3 border">{med.type}</td>
                <td className="p-3 border">{med.dosage}</td>
                <td className="p-3 border">{med.sideEffects}</td>
                <td className="p-3 border font-semibold text-{med.prescription === 'Yes' ? 'red-500' : 'green-400'}">
                  {med.prescription}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold mt-6">🌿 Natural Alternatives</h2>
      <ul className="list-disc ml-5 mt-2 bg-slate-900 text-gray-300">
        {alternatives.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>


      <h2 className="text-2xl font-bold mt-7 border-b pb-2 text-blue-400 mb-4">Home Remedies & Wellness Tips</h2>
      
      {/* Herbal Remedies */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">Herbal Remedies</h3>
        <ul className="list-disc pl-5 text-gray-200">
          <li><span className="font-semibold">Nettle Leaf Tea:</span> High in iron and vitamin C.</li>
          <li><span className="font-semibold">Ashwagandha:</span> Used in Ayurveda to boost blood health.</li>
          <li><span className="font-semibold">Dandelion Root:</span> Supports digestion and iron absorption.</li>
        </ul>
      </div>
      
      {/* Diet & Nutrition Advice */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">Diet & Nutrition Advice</h3>
        <ul className="list-disc pl-5 text-gray-200">
          <li><span className="font-semibold">Iron-Rich Foods:</span> Red meat, legumes, shellfish, and tofu.</li>
          <li><span className="font-semibold">Boost Vitamin C Intake:</span> Helps absorb non-heme iron (from plants).</li>
          <li><span className="font-semibold">Avoid Calcium-Rich Foods with Iron:</span> Dairy products can hinder iron absorption.</li>
          <li><span className="font-semibold">Drink Herbal Teas Instead of Coffee/Tea:</span> Reduces tannin interference with iron absorption.</li>
        </ul>
      </div>
      
      {/* Exercise Recommendations */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">Exercise Recommendations</h3>
        <ul className="list-disc pl-5 text-gray-200">
          <li><span className="font-semibold">Moderate Cardio:</span> Walking, cycling, or light jogging to improve circulation.</li>
          <li><span className="font-semibold">Strength Training:</span> Helps boost endurance and reduce fatigue.</li>
          <li><span className="font-semibold">Yoga Poses for Energy:</span>
            <ul className="list-disc pl-5">
              <li>Cobra Pose (Bhujangasana)</li>
              <li>Sun Salutations (Surya Namaskar)</li>
              <li>Legs-Up-The-Wall Pose (Viparita Karani)</li>
            </ul>
          </li>
        </ul>
      </div>
      
      {/* Lifestyle Changes */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-100 mb-2">Lifestyle Changes</h3>
        <ul className="list-disc pl-5 text-gray-200">
          <li><span className="font-semibold">Prioritize Sleep:</span> Lack of sleep can worsen fatigue.</li>
          <li><span className="font-semibold">Reduce Stress:</span> High stress can impact nutrient absorption.</li>
          <li><span className="font-semibold">Stay Hydrated:</span> Supports overall blood health.</li>
          <li><span className="font-semibold">Monitor Iron Levels Regularly:</span> Helps prevent severe anemia.</li>
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
