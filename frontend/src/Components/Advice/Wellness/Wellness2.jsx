
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf, FaUtensils, FaRunning, FaHeartbeat,FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness2() {
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
      name: "Oseltamivir (Tamiflu)",
      dosage: "75mg twice daily for 5 days (within 48 hours of symptoms)",
      sideEffects: "Nausea, vomiting, headache",
      prescription: "Yes",
    },
    {
      name: "Zanamivir (Relenza)",
      dosage: "10mg (two inhalations) twice daily for 5 days",
      sideEffects: "Cough, wheezing, nasal irritation",
      prescription: "Yes",
    },
    {
      name: "Paracetamol (Tylenol, Panadol)",
      dosage: "500-1000mg every 4-6 hours (max 4000mg/day)",
      sideEffects: "Liver damage (if overdosed), nausea",
      prescription: "No",
    },
    {
      name: "Ibuprofen (Advil, Motrin)",
      dosage: "200-400mg every 4-6 hours",
      sideEffects: "Stomach irritation, dizziness",
      prescription: "No",
    },
    {
      name: "Decongestants (Pseudoephedrine, Phenylephrine)",
      dosage: "30-60mg every 4-6 hours",
      sideEffects: "Increased heart rate, insomnia",
      prescription: "Yes (for pseudoephedrine in some countries)",
    },
  ];

  const naturalAlternatives = [
    {
      name: "Elderberry Syrup",
      description: "Contains antiviral properties that may shorten flu duration.",
    },
    {
      name: "Ginger Tea",
      description: "Reduces inflammation and relieves congestion.",
    },
    {
      name: "Garlic Extract",
      description: "Boosts the immune system and fights viral infections.",
    },
  ];


  const sections = [
    {
      title: "Herbal Remedies",
      items: [
        { name: "Echinacea Tea", description: "Strengthens the immune system." },
        { name: "Peppermint Steam Inhalation", description: "Clears nasal congestion." },
        { name: "Turmeric Milk", description: "Anti-inflammatory and helps reduce fever." },
      ],
    },
    {
      title: "Diet & Nutrition Advice",
      items: [
        { name: "Increase Vitamin C Intake", description: "Eat oranges, strawberries, and bell peppers to boost immunity." },
        { name: "Hydration is Key", description: "Drink plenty of warm fluids like soups, herbal teas, and warm water." },
        { name: "Consume Zinc-Rich Foods", description: "Nuts, seeds, and beans enhance immune response." },
        { name: "Eat Probiotic Foods", description: "Yogurt and fermented foods support gut health and immunity." },
      ],
    },
    {
      title: "Exercise Recommendations",
      items: [
        { name: "Rest is Essential", description: "Allow your body to recover fully before engaging in exercise." },
        { name: "Gentle Yoga or Stretching", description: "Helps with circulation without overexerting." },
        { name: "Breathing Exercises", description: "Improves lung function and reduces congestion." },
        { name: "Avoid Intense Workouts", description: "Flu weakens the body, so avoid strenuous activities." },
      ],
    },
    {
      title: "Lifestyle Changes",
      items: [
        { name: "Get Plenty of Sleep", description: "Aim for 7-9 hours to support immune function." },
        { name: "Reduce Stress", description: "Practice meditation and relaxation techniques." },
        { name: "Use a Humidifier", description: "Keeps airways moist and reduces irritation." },
        { name: "Avoid Smoking & Alcohol", description: "These weaken the immune system and prolong recovery." },
      ],
    },
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

      <div className="max-w-8xl mx-auto p-6 bg-gray-900 mt-5 text-white shadow-lg rounded-2xl">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">🦠 Flu (Influenza) – Disease Information & Solutions</h2>

      {/* Disease Description */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="flex items-center text-xl font-semibold text-red-400 mb-3">
          <FaVirus className="mr-2" /> Description
        </h3>
        <p className="text-gray-300">
          Influenza (flu) is a highly contagious viral infection affecting the respiratory system. Symptoms can range 
          from mild to severe and may lead to complications like pneumonia.
        </p>
      </div>

      {/* Symptoms Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="flex items-center text-xl font-semibold text-blue-400 mb-3">
          <FaNotesMedical className="mr-2" /> Symptoms
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><span className="text-yellow-300 font-medium">High fever:</span> 100.4°F or higher</li>
          <li><span className="text-yellow-300 font-medium">Chills & Sweating</span></li>
          <li><span className="text-yellow-300 font-medium">Severe body aches & muscle pain</span></li>
          <li><span className="text-yellow-300 font-medium">Persistent cough & sore throat</span></li>
          <li><span className="text-yellow-300 font-medium">Fatigue, weakness, headache</span></li>
          <li><span className="text-yellow-300 font-medium">Runny or stuffy nose</span></li>
          <li><span className="text-yellow-300 font-medium">Nausea or vomiting:</span> More common in children</li>
        </ul>
      </div>

      {/* Causes Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="flex items-center text-xl font-semibold text-orange-400 mb-3">
          <FaShieldAlt className="mr-2" /> Causes
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><span className="text-yellow-300 font-medium">Influenza Virus:</span> Spread through respiratory droplets when an infected person sneezes, coughs, or talks.</li>
          <li><span className="text-yellow-300 font-medium">Direct Contact:</span> Touching contaminated surfaces or shaking hands like doorknobs, phones, and keyboards.</li>
          <li><span className="text-yellow-300 font-medium">Weakened Immunity:</span> Stress, poor diet, and lack of sleep increase risk.</li>
        </ul>
      </div>

      {/* Prevention Measures */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="flex items-center text-xl font-semibold text-green-400 mb-3">
          <FaHandsWash className="mr-2" /> Preventive Measures
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><span className="text-yellow-300 font-medium">Annual Flu Vaccine:</span> Reduces risk and severity of infection.</li>
          <li><span className="text-yellow-300 font-medium">Frequent Handwashing:</span> Wash hands for at least 20 seconds.</li>
          <li><span className="text-yellow-300 font-medium">Avoid Touching Face:</span> Prevents virus entry through eyes, nose, or mouth.</li>
          <li><span className="text-yellow-300 font-medium">Boost Immunity:</span> Eat a nutrient-rich diet and stay active.</li>
          <li><span className="text-yellow-300 font-medium">Good Respiratory Hygiene:</span> Cover your mouth and nose when sneezing.</li>
          <li><span className="text-yellow-300 font-medium">Disinfect Common Surfaces:</span> Clean frequently touched objects regularly.</li>
        </ul>
      </div>

      <h2 className="text-2xl mt-6 text-blue-400 text-center font-bold mb-4">Medicine Recommendations</h2>
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="p-3 border border-gray-700">Medicine Name</th>
            <th className="p-3 border border-gray-700">Dosage & Usage</th>
            <th className="p-3 border border-gray-700">Side Effects</th>
            <th className="p-3 border border-gray-700">Prescription Required?</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
              <td className="p-3 border border-gray-700">{medicine.name}</td>
              <td className="p-3 border border-gray-700">{medicine.dosage}</td>
              <td className="p-3 border border-gray-700">{medicine.sideEffects}</td>
              <td className="p-3 border border-gray-700">{medicine.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mt-6">Natural Alternatives</h3>
      <ul className="list-disc list-inside mt-2">
        {naturalAlternatives.map((alt, index) => (
          <li key={index} className="mt-2">
            <strong>{alt.name}:</strong> {alt.description}
          </li>
        ))}
      </ul>



      <h2 className="text-2xl font-bold mb-4 mt-6 text-center">Home Remedies & Wellness Tips</h2>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-600 pb-2 mb-3">{section.title}</h3>
          <ul className="list-disc list-inside space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded-lg shadow-md">
                <strong className="text-blue-400">{item.name}:</strong> {item.description}
              </li>
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

      
    // </div>
  );
}
