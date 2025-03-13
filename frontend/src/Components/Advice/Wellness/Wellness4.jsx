
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,  FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness4() {
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

  const sections = [
    { title: "Description", content: "Hypertension, or high blood pressure, is a chronic condition where the force of blood against artery walls is consistently too high. If left untreated, it can lead to serious health complications such as heart disease, stroke, and kidney failure. Hypertension is often called the 'silent killer' because it may not show symptoms until it reaches severe levels." },
    { title: "Symptoms", list: [
      "Headaches", "Dizziness", "Shortness of breath", "Chest pain", "Blurred vision", "Nosebleeds"
    ]},
    { title: "Causes", subcategories: [
      { name: "Primary (Essential) Hypertension", content: "No identifiable cause but linked to genetics, aging, and lifestyle factors." },
      { name: "Secondary Hypertension", content: "Caused by an underlying condition such as:", list: [
        "Kidney disease", "Thyroid disorders", "Sleep apnea", "Hormonal imbalances", "Certain medications (e.g., birth control, decongestants)"
      ]}
    ]},
    { title: "Preventive Measures", measures: [
      { icon: <FaAppleAlt className="text-green-400" />, name: "Healthy Diet", description: "Reduce salt intake, avoid processed foods, and eat potassium-rich foods." },
      { icon: <FaDumbbell className="text-blue-400" />, name: "Regular Exercise", description: "At least 30 minutes of moderate activity (walking, swimming, cycling) per day." },
      { icon: <FaWeight className="text-orange-400" />, name: "Weight Management", description: "Maintain a healthy BMI to reduce strain on the heart." },
      { icon: <FaMugHot className="text-yellow-400" />, name: "Limit Alcohol & Caffeine", description: "Excessive intake can raise blood pressure." },
      { icon: <FaSmokingBan className="text-red-400" />, name: "Quit Smoking", description: "Nicotine increases blood pressure and damages arteries." },
      { icon: <FaBrain className="text-purple-400" />, name: "Manage Stress", description: "Practice meditation, deep breathing, or yoga." }
    ]}
  ];

  const medicines = [
    { name: "Amlodipine (Norvasc)", type: "Calcium channel blocker", dosage: "5-10mg once daily", sideEffects: "Dizziness, swelling, flushing", prescription: "Yes" },
    { name: "Lisinopril (Prinivil, Zestril)", type: "ACE inhibitor", dosage: "10-40mg once daily", sideEffects: "Dry cough, kidney issues, dizziness", prescription: "Yes" },
    { name: "Losartan (Cozaar)", type: "ARB (Angiotensin II receptor blocker)", dosage: "50-100mg once daily", sideEffects: "Fatigue, muscle cramps, dizziness", prescription: "Yes" },
    { name: "Hydrochlorothiazide (HCTZ)", type: "Diuretic", dosage: "12.5-50mg once daily", sideEffects: "Frequent urination, dehydration", prescription: "Yes" },
    { name: "Metoprolol (Lopressor, Toprol-XL)", type: "Beta-blocker", dosage: "25-100mg once or twice daily", sideEffects: "Fatigue, slow heart rate, dizziness", prescription: "Yes" }
  ];


  const alternatives = [
    { icon: <FaLeaf className="text-green-400 text-2xl" />, title: "Garlic Supplements", description: "May help lower blood pressure naturally." },
    { icon: <FaFish className="text-blue-400 text-2xl" />, title: "Omega-3 Fatty Acids", description: "Found in fish oil, flaxseeds, and walnuts, beneficial for heart health." },
    { icon: <FaHeartbeat className="text-red-400 text-2xl" />, title: "Coenzyme Q10 (CoQ10)", description: "Helps improve blood vessel function." },
    { icon: <FaAppleAlt className="text-yellow-400 text-2xl" />, title: "Magnesium & Potassium-Rich Foods", description: "Bananas, spinach, avocados, and nuts help regulate blood pressure." }
  ];


  const remedies = [
    { icon: <FaLeaf className="text-green-400 text-2xl" />, category: "Herbal Remedies", items: [
      "Hibiscus Tea: Contains antioxidants that may lower blood pressure.",
      "Hawthorn Extract: Used in traditional medicine to support heart health.",
      "Green Tea: Contains compounds that may improve circulation and lower blood pressure."
    ] },
    { icon: <FaUtensils className="text-yellow-400 text-2xl" />, category: "Diet & Nutrition Advice", items: [
      "DASH Diet: Eat fruits, vegetables, whole grains, and lean proteins while reducing sodium intake.",
      "Increase Potassium Intake: Found in bananas, oranges, and potatoes to balance sodium levels.",
      "Reduce Processed Foods: Avoid high sodium and unhealthy fats."
    ] },
    { icon: <FaRunning className="text-blue-400 text-2xl" />, category: "Exercise Recommendations", items: [
      "Cardio Workouts: Brisk walking, cycling, or swimming for 30 minutes daily.",
      "Strength Training: Helps improve circulation and heart function.",
      "Yoga & Meditation: Reduces stress and promotes relaxation.",
      "Breathing Exercises: Deep breathing techniques help lower blood pressure."
    ] },
    { icon: <FaHeart className="text-red-400 text-2xl" />, category: "Lifestyle Changes", items: [
      "Monitor Blood Pressure Regularly: Helps track changes and adjust lifestyle accordingly.",
      "Improve Sleep Quality: Poor sleep can raise blood pressure.",
      "Reduce Stress: Practice mindfulness, hobbies, or relaxation techniques.",
      "Stay Hydrated: Drinking enough water helps maintain blood flow and kidney function."
    ] }
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

    
      <div className="bg-gray-900 mt-6 text-white p-6 rounded-lg shadow-lg max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hypertension (High Blood Pressure)</h2>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">{section.title}</h3>
          {section.content && <p className="bg-gray-800 p-3 rounded-lg shadow-md">{section.content}</p>}
          {section.list && (
            <ul className="list-disc list-inside space-y-2">
              {section.list.map((item, i) => (
                <li key={i} className="bg-gray-800 p-3 rounded-lg shadow-md">{item}</li>
              ))}
            </ul>
          )}
          {section.subcategories && section.subcategories.map((sub, i) => (
            <div key={i} className="mt-4">
              <h4 className="text-lg font-semibold text-green-400">{sub.name}</h4>
              {sub.content && <p className="bg-gray-800 p-3 rounded-lg shadow-md">{sub.content}</p>}
              {sub.list && (
                <ul className="list-disc list-inside space-y-2">
                  {sub.list.map((item, j) => (
                    <li key={j} className="bg-gray-800 p-3 rounded-lg shadow-md">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {section.measures && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.measures.map((measure, i) => (
                <div key={i} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
                  {measure.icon}
                  <div className="ml-3">
                    <strong className="text-lg text-white">{measure.name}</strong>
                    <p className="text-gray-300 text-sm">{measure.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
   
   <h2 className="text-2xl font-bold mb-4">💊 Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700 text-blue-400">
              <th className="p-3 text-left">Medicine Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Dosage & Usage</th>
              <th className="p-3 text-left">Side Effects</th>
              <th className="p-3 text-left">Prescription Required?</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{med.name}</td>
                <td className="p-3">{med.type}</td>
                <td className="p-3">{med.dosage}</td>
                <td className="p-3">{med.sideEffects}</td>
                <td className="p-3">{med.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



<h2 className="text-2xl mt-7 font-bold mb-4">🌿 Natural Alternatives</h2>
      <div className="space-y-4">
        {alternatives.map((alt, index) => (
          <div key={index} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
            {alt.icon}
            <div className="ml-3">
              <strong className="text-lg text-white">{alt.title}</strong>
              <p className="text-gray-300 text-sm">{alt.description}</p>
            </div>
          </div>
        ))}
      </div>


      <h2 className="text-2xl mt-9 font-bold mb-4">🏡 Home Remedies & Wellness Tips</h2>
      <div className="space-y-6">
        {remedies.map((remedy, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              {remedy.icon}
              <h3 className="ml-2 text-lg font-semibold">{remedy.category}</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300">
              {remedy.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
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

      
    // </div>
  );
}
