
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf, FaLemon, FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness8() {
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
        name: "Tamsulosin (Flomax)",
        type: "Alpha-blocker (helps pass stones)",
        dosage: "0.4mg once daily",
        sideEffects: "Dizziness, fatigue",
        prescription: "Yes",
      },
      {
        name: "Potassium Citrate",
        type: "Alkalizing agent (prevents stone formation)",
        dosage: "10-30mEq daily",
        sideEffects: "Nausea, stomach pain",
        prescription: "Yes",
      },
      {
        name: "Allopurinol (Zyloprim)",
        type: "Reduces uric acid stones",
        dosage: "100-300mg daily",
        sideEffects: "Rash, liver effects",
        prescription: "Yes",
      },
      {
        name: "Ibuprofen (Advil, Motrin)",
        type: "Pain relief",
        dosage: "200-400mg every 4-6 hours",
        sideEffects: "Stomach irritation, kidney strain",
        prescription: "No",
      },
      {
        name: "Acetaminophen (Tylenol)",
        type: "Pain relief",
        dosage: "500mg every 4-6 hours",
        sideEffects: "Liver damage (high doses)",
        prescription: "No",
      },
    ];
  
    const naturalAlternatives = [
      {
        name: "Lemon Juice & Water",
        description: "Citrate in lemons helps prevent stone formation.",
      },
      {
        name: "Apple Cider Vinegar",
        description: "Contains acetic acid, which may help dissolve small stones.",
      },
      {
        name: "Dandelion Root Tea",
        description: "Acts as a natural diuretic to flush out kidneys.",
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

      <div className="max-w-8xl mt-5 mx-auto p-6 bg-slate-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 flex items-center mb-4">
        ⚡ Kidney Stones - Disease Information & Solutions
      </h1>
      
      {/* Description */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          🏥 Description
        </h2>
        <p className="text-gray-200">
          Kidney stones are <strong>hard mineral and salt deposits</strong> that form inside the kidneys.
          They develop when urine becomes too concentrated, allowing minerals to <strong>crystallize</strong> and stick together.
          Small stones may pass naturally, while larger stones can cause <strong>severe pain</strong> and may require medical intervention.
        </p>
      </section>

      {/* Symptoms */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          ⚠ Symptoms
        </h2>
        <ul className="list-disc pl-5 text-gray-200">
          <li>🩸 <strong>Severe pain</strong> in the back, side, or lower abdomen</li>
          <li>👉 Pain that <strong>radiates to the groin</strong></li>
          <li>💧 <strong>Blood in urine</strong> (pink, red, or brown urine)</li>
          <li>🚿 <strong>Frequent or painful urination</strong></li>
          <li>🪫 <strong>Cloudy or foul-smelling urine</strong></li>
          <li>🤮 <strong>Nausea and vomiting</strong></li>
          <li>🌡 Fever and chills (if infection is present)</li>
        </ul>
      </section>

      {/* Causes */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          🔍 Causes
        </h2>
        <ul className="list-disc pl-5 text-gray-200">
          <li>💧 <strong>Dehydration:</strong> Insufficient water intake leads to concentrated urine.</li>
          <li>🌿 <strong>High Oxalate Diet:</strong> Foods like spinach, nuts, and chocolate contribute to stones.</li>
          <li>🍽️ <strong>Excess Salt & Sugar Intake:</strong> Increases calcium levels in urine.</li>
          <li>💪 <strong>Obesity:</strong> Metabolic changes increase kidney stone risk.</li>
          <li>📝 <strong>Certain Medical Conditions:</strong> Hyperparathyroidism, UTIs, and gout can contribute.</li>
          <li>👨‍👩‍👦 <strong>Genetics:</strong> Family history increases risk.</li>
        </ul>
      </section>

      {/* Preventive Measures */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold flex items-center mb-2">
          ⚖️ Preventive Measures
        </h2>
        <ul className="list-disc pl-5 text-gray-200">
          <li>💧 <strong>Drink Plenty of Water:</strong> Aim for 2-3 liters daily to flush out minerals.</li>
          <li>🌟 <strong>Reduce Sodium Intake:</strong> High salt intake increases calcium in urine.</li>
          <li>🌿 <strong>Limit Oxalate-Rich Foods:</strong> Consume spinach, nuts, and tea in moderation.</li>
          <li>🏏 <strong>Consume Calcium from Food:</strong> Helps bind oxalate in the intestines rather than kidneys.</li>
          <li>🍽 <strong>Limit Sugary & Carbonated Drinks:</strong> Contribute to stone formation.</li>
          <li>💪 <strong>Maintain a Healthy Weight:</strong> Obesity increases kidney stone risk.</li>
        </ul>
      </section>

      <div className="max-w-8xl mx-auto bg-slate-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-blue-400">
          💊 Medicine Recommendations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-300">
            <thead>
              <tr className="bg-gray-900">
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
                  className="border-t hover:bg-gray-600 transition"
                >
                  <td className="p-3 border font-semibold">{med.name}</td>
                  <td className="p-3 border">{med.type}</td>
                  <td className="p-3 border">{med.dosage}</td>
                  <td className="p-3 border">{med.sideEffects}</td>
                  <td className="p-3 border font-semibold">
                    {med.prescription}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-6 text-blue-400 border-b pb-2">
          🌿 Natural Alternatives
        </h2>
        <ul className="mt-4 space-y-2">
          {naturalAlternatives.map((alt, index) => (
            <li key={index} className="bg-gray-800 p-3 rounded-md shadow-sm">
              <strong className="text-gray-200">{alt.name}:</strong> {alt.description}
            </li>
          ))}
        </ul>

      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl font-bold mt-9 text-blue-400 mb-4">Home Remedies & Wellness Tips</h2>
        
        {/* Herbal Remedies */}
        <div className="mb-6 p-4 bg-green-100 shadow rounded-lg border-l-4 border-green-500">
          <h3 className="text-xl font-semibold flex items-center gap-2"><FaLeaf /> Herbal Remedies</h3>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li><strong>Chanca Piedra</strong> ("Stone Breaker"): Traditionally known to help break down stones.</li>
            <li><strong>Horsetail Tea</strong>: A natural diuretic that may aid in flushing stones out.</li>
            <li><strong>Nettle Leaf Tea</strong>: Promotes urine flow and may prevent stone formation.</li>
          </ul>
        </div>
        
        {/* Diet & Nutrition Advice */}
        <div className="mb-6 p-4 bg-yellow-100 shadow rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold flex items-center gap-2"><FaLemon /> Diet & Nutrition Advice</h3>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li><strong>Increase Citrus Intake</strong>: Lemons, oranges, and grapefruits help prevent kidney stones.</li>
            <li><strong>Reduce Red Meat & Processed Foods</strong>: High protein intake increases uric acid levels.</li>
            <li><strong>Drink Coconut Water</strong>: Helps hydrate and flush the kidneys.</li>
            <li><strong>Eat Fiber-Rich Foods</strong>: Whole grains, fruits, and vegetables support kidney health.</li>
          </ul>
        </div>
        
        {/* Exercise Recommendations */}
        <div className="mb-6 p-4 bg-blue-100 shadow rounded-lg border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold flex items-center gap-2"><FaRunning /> Exercise Recommendations</h3>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li><strong>Gentle Walking</strong>: Helps movement and may encourage stone passage.</li>
            <li><strong>Yoga Poses for Kidney Health</strong>:
              <ul className="list-disc ml-6">
                <li>Cobra Pose (Bhujangasana)</li>
                <li>Bridge Pose (Setu Bandhasana)</li>
                <li>Child’s Pose (Balasana)</li>
              </ul>
            </li>
            <li><strong>Avoid Strenuous Activity</strong>: Too much exertion may worsen pain.</li>
          </ul>
        </div>
        
        {/* Lifestyle Changes */}
        <div className="mb-6 p-4 bg-red-100 shadow rounded-lg border-l-4 border-red-500">
          <h3 className="text-xl font-semibold flex items-center gap-2"><FaHeartbeat /> Lifestyle Changes</h3>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li><strong>Hydration is Key</strong>: Drink water regularly throughout the day.</li>
            <li><strong>Limit Alcohol & Caffeine</strong>: Can dehydrate the body and worsen stone risk.</li>
            <li><strong>Monitor Urine Color</strong>: Dark urine may indicate dehydration.</li>
            <li><strong>Regular Kidney Checkups</strong>: Helps detect stones early.</li>
          </ul>
        </div>
      </div>
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
