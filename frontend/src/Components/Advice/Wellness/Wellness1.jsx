
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf, FaUtensils, FaRunning, FaHeartbeat,FaBars, FaTimes  } from "react-icons/fa";

export default function Wellness1() {
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

      <div className="max-w-8xl mx-auto mt-6 p-6 bg-slate-900 shadow-lg rounded-2xl">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">
        🤧 Common Cold
      </h2>
      <p className="text-gray-300 text-center text-lg mb-6">
        Understanding the symptoms, causes, and best solutions for relief.
      </p>

      {/* Disease Description */}
      <div className="bg-blue-100 p-4 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-2">
          🩺 Disease Information & Solutions
        </h3>
        <p className="text-gray-700 leading-relaxed">
          The <span className="font-semibold text-blue-500">common cold</span> is a viral infection of the 
          upper respiratory tract, primarily affecting the nose and throat. While generally mild, it 
          can cause symptoms such as sneezing, congestion, and a sore throat.
        </p>
      </div>

     {/* Flexbox Section for Symptoms, Causes, Prevention */}
     <div className="grid md:grid-cols-3  mt-6 gap-6">
        {/* Symptoms */}
        <div className="bg-gray-200 p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🚨 Common Symptoms</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Runny or stuffy nose</li>
            <li>Sneezing and congestion</li>
            <li>Sore throat</li>
            <li>Cough and mild fever</li>
            <li>Fatigue and body aches</li>
          </ul>
        </div>

        {/* Causes */}
        <div className="bg-red-200 p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-red-600 mb-3">⚠️ Causes</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Exposure to cold viruses</li>
            <li>Weakened immune system</li>
            <li>Close contact with infected individuals</li>
            <li>Touching contaminated surfaces</li>
            <li>Seasonal changes & cold weather</li>
          </ul>
        </div>

        {/* Prevention */}
        <div className="bg-green-200 p-5 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-green-600 mb-3">🛡️ Prevention Tips</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Wash hands frequently</li>
            <li>Avoid touching your face</li>
            <li>Eat a balanced diet for immunity</li>
            <li>Use a humidifier</li>
            <li>Stay hydrated and get enough rest</li>
          </ul>
        </div>
      </div>

       {/* Section Header */}
       <h2 className="text-2xl font-bold mt-9 text-white mb-4">💊 Medicine Recommendations</h2>

{/* Medicine Table */}
<div className="overflow-x-auto">
  <table className="w-full border border-gray-700 rounded-lg">
    <thead>
      <tr className="bg-gray-800 text-gray-300">
        <th className="px-4 py-2">Medicine Name</th>
        <th className="px-4 py-2">Dosage & Usage</th>
        <th className="px-4 py-2">Side Effects</th>
        <th className="px-4 py-2">Prescription?</th>
      </tr>
    </thead>
    <tbody className="text-gray-200">
      <tr className="border-b border-gray-700">
        <td className="px-4 py-2">Paracetamol (Tylenol, Panadol)</td>
        <td className="px-4 py-2">500mg every 4-6 hours (max 4000mg/day)</td>
        <td className="px-4 py-2">Nausea, liver damage (if overdosed)</td>
        <td className="px-4 py-2">No</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="px-4 py-2">Ibuprofen (Advil, Motrin)</td>
        <td className="px-4 py-2">200-400mg every 4-6 hours as needed</td>
        <td className="px-4 py-2">Stomach irritation, dizziness</td>
        <td className="px-4 py-2">No</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="px-4 py-2">Antihistamines (Cetirizine, Loratadine)</td>
        <td className="px-4 py-2">10mg once daily</td>
        <td className="px-4 py-2">Drowsiness, dry mouth</td>
        <td className="px-4 py-2">No</td>
      </tr>
      <tr className="border-b border-gray-700">
        <td className="px-4 py-2">Decongestants (Pseudoephedrine, Phenylephrine)</td>
        <td className="px-4 py-2">30-60mg every 4-6 hours</td>
        <td className="px-4 py-2">Increased heart rate, insomnia</td>
        <td className="px-4 py-2">Yes (for pseudoephedrine in some countries)</td>
      </tr>
      <tr>
        <td className="px-4 py-2">Cough Syrup (Dextromethorphan, Guaifenesin)</td>
        <td className="px-4 py-2">10-20mg every 4 hours</td>
        <td className="px-4 py-2">Drowsiness, dizziness</td>
        <td className="px-4 py-2">No</td>
      </tr>
    </tbody>
  </table>
</div>

{/* Natural Alternatives */}
<div className="mt-6 bg-gray-800 p-4 rounded-lg">
  <h3 className="text-xl font-semibold text-green-400">🌿 Natural Alternatives</h3>
  <ul className="list-disc list-inside text-gray-300 mt-3 space-y-2">
    <li><span className="text-yellow-300 font-medium">Honey & Lemon:</span> Mix in warm water to soothe a sore throat.</li>
    <li><span className="text-yellow-300 font-medium">Ginger Tea:</span> Helps reduce inflammation and clears congestion.</li>
    <li><span className="text-yellow-300 font-medium">Steam Inhalation:</span> Clears nasal passages.</li>
    <li><span className="text-yellow-300 font-medium">Garlic Supplements:</span> Boosts immune response.</li>
    
  </ul>
</div>


   {/* Section Header */}
   <h2 className="text-2xl mt-6 font-bold text-white mb-4">🌿 Home Remedies & Wellness Tips</h2>

{/* Remedies Grid */}
<div className="grid md:grid-cols-2 gap-6">
  {/* Herbal Remedies */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="flex items-center text-xl font-semibold text-green-400 mb-3">
      <FaLeaf className="mr-2" /> Herbal Remedies
    </h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2">
      <li><span className="text-yellow-300 font-medium">Ginger & Turmeric Tea:</span> Anti-inflammatory & antimicrobial.</li>
      <li><span className="text-yellow-300 font-medium">Echinacea Extract:</span> Boosts immune function.</li>
      <li><span className="text-yellow-300 font-medium">Peppermint Tea:</span> Eases congestion & throat irritation.</li>
    </ul>
  </div>

  {/* Diet & Nutrition Advice */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="flex items-center text-xl font-semibold text-blue-400 mb-3">
      <FaUtensils className="mr-2" /> Diet & Nutrition
    </h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2">
      <li><span className="text-yellow-300 font-medium">Increase Vitamin C:</span> Citrus fruits, bell peppers, kiwis.</li>
      <li><span className="text-yellow-300 font-medium">Eat Zinc-Rich Foods:</span> Nuts, seeds, beans, whole grains.</li>
      <li><span className="text-yellow-300 font-medium">Stay Hydrated:</span> Drink at least 8 glasses of water daily.</li>
      <li><span className="text-yellow-300 font-medium">Avoid Dairy:</span> May increase mucus production.</li>
    </ul>
  </div>

  {/* Exercise Recommendations */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="flex items-center text-xl font-semibold text-purple-400 mb-3">
      <FaRunning className="mr-2" /> Exercise Tips
    </h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2">
      <li><span className="text-yellow-300 font-medium">Mild Stretching & Yoga:</span> Aids circulation without overexertion.</li>
      <li><span className="text-yellow-300 font-medium">Walking:</span> Improves blood flow and speeds up recovery.</li>
      <li><span className="text-yellow-300 font-medium">Avoid Intense Workouts:</span> Rest is essential for healing.</li>
    </ul>
  </div>

  {/* Lifestyle Changes */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="flex items-center text-xl font-semibold text-red-400 mb-3">
      <FaHeartbeat className="mr-2" /> Lifestyle Changes
    </h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2">
      <li><span className="text-yellow-300 font-medium">Get Enough Sleep:</span> Aim for 7-9 hours per night.</li>
      <li><span className="text-yellow-300 font-medium">Manage Stress:</span> Practice meditation or deep breathing.</li>
      <li><span className="text-yellow-300 font-medium">Use a Humidifier:</span> Keeps nasal passages moist.</li>
      <li><span className="text-yellow-300 font-medium">Quit Smoking:</span> Reduces irritation and speeds recovery.</li>
    </ul>
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
    // </div>
  );
}
