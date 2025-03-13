
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,  FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness7() {
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


      <div className="bg-gray-900 text-white p-6 rounded-lg mt-5 shadow-lg max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">🩺 Liver Disease (Hepatitis, Fatty Liver)</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">📖 Description</h3>
        <p><strong>Hepatitis:</strong> Inflammation of the liver due to viral infections (Hepatitis A, B, C, D, E), alcohol abuse, or autoimmune disorders.</p>
        <p><strong>Fatty Liver Disease:</strong> Excess fat accumulation in the liver, leading to inflammation and potential damage. Includes <strong>NAFLD</strong> (Non-Alcoholic Fatty Liver Disease) and <strong>AFLD</strong> (Alcoholic Fatty Liver Disease).</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">⚠️ Symptoms</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>😴 <strong>Fatigue</strong> and weakness</li>
          <li>🟡 <strong>Jaundice</strong> (yellowing of skin and eyes)</li>
          <li>🍽️ <strong>Loss of appetite</strong> and weight loss</li>
          <li>🤢 <strong>Nausea</strong> and vomiting</li>
          <li>🚽 <strong>Dark urine</strong> and pale stools</li>
          <li>🤰 <strong>Swelling</strong> in the abdomen (ascites) and legs</li>
          <li>🦟 <strong>Itchy skin</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">🔍 Causes</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>🦠 <strong>Viral Infections:</strong> Hepatitis A, B, C, D, E</li>
          <li>🍺 <strong>Excessive Alcohol:</strong> Leads to alcoholic liver disease</li>
          <li>🍔 <strong>Obesity & Poor Diet:</strong> High sugar and fat intake</li>
          <li>🍬 <strong>Diabetes & High Cholesterol:</strong> Contribute to liver dysfunction</li>
          <li>⚗️ <strong>Toxin Exposure:</strong> Medications, chemicals, and supplements</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">🛡️ Preventive Measures</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>💉 <strong>Get Vaccinated:</strong> Hepatitis A & B vaccines</li>
          <li>🚫 <strong>Limit Alcohol Intake:</strong> Reduce or avoid alcohol consumption</li>
          <li>🥗 <strong>Eat a Liver-Friendly Diet:</strong> Avoid processed foods and excessive fats</li>
          <li>🏃 <strong>Exercise Regularly:</strong> Reduces fat accumulation in the liver</li>
          <li>⚖️ <strong>Maintain a Healthy Weight:</strong> Prevents fatty liver disease</li>
          <li>💊 <strong>Use Medications Wisely:</strong> Avoid excessive use of painkillers</li>
          <li>🧼 <strong>Practice Safe Hygiene:</strong> Prevents hepatitis infections</li>
        </ul>
      </section>

      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">💊 Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-3">Medicine Name</th>
              <th className="border border-gray-700 p-3">Type</th>
              <th className="border border-gray-700 p-3">Dosage & Usage</th>
              <th className="border border-gray-700 p-3">Side Effects</th>
              <th className="border border-gray-700 p-3">Prescription?</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Tenofovir (Viread)", "Antiviral (Hepatitis B)", "300mg once daily", "Nausea, kidney issues", "Yes"],
              ["Entecavir (Baraclude)", "Antiviral (Hepatitis B)", "0.5-1mg once daily", "Headache, dizziness", "Yes"],
              ["Sofosbuvir + Ledipasvir (Harvoni)", "Antiviral (Hepatitis C)", "400mg sofosbuvir + 90mg ledipasvir daily", "Fatigue, headache", "Yes"],
              ["Ursodeoxycholic Acid (UDCA)", "Supports liver function", "300-600mg daily", "Nausea, diarrhea", "Yes"],
              ["Acetylcysteine (NAC)", "Antioxidant for liver detox", "600-1200mg daily", "Stomach discomfort", "No"],
            ].map((row, index) => (
              <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                {row.map((cell, i) => (
                  <td key={i} className="border border-gray-700 p-3 text-center">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3 className="text-xl font-bold mt-6 border-b pb-2">🌿 Natural Alternatives</h3>
      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-2"><strong>🌿 Milk Thistle:</strong> Protects liver cells and helps detoxification.</li>
        <li className="flex items-center gap-2"><strong>🟡 Turmeric (Curcumin):</strong> Anti-inflammatory benefits for liver function.</li>
        <li className="flex items-center gap-2"><strong>🍃 Dandelion Root:</strong> Supports liver detoxification and bile production.</li>
      </ul>
    </div>

    <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🍃 Home Remedies & Wellness Tips</h2>
      
      {/* Herbal Remedies */}
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h3 className="text-xl font-semibold mb-2">🌿 Herbal Remedies</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Licorice Root Tea:</strong> May help reduce liver inflammation.</li>
          <li><strong>Papaya Seeds:</strong> Traditionally used for liver detoxification.</li>
          <li><strong>Amla (Indian Gooseberry):</strong> Rich in vitamin C, supports liver health.</li>
        </ul>
      </div>
      
      {/* Diet & Nutrition Advice */}
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h3 className="text-xl font-semibold mb-2">🥗 Diet & Nutrition Advice</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Eat Leafy Greens:</strong> Spinach, kale, and arugula help flush toxins.</li>
          <li><strong>Increase Fiber Intake:</strong> Whole grains, fruits, and legumes support digestion and liver function.</li>
          <li><strong>Stay Hydrated:</strong> Drink at least 8 glasses of water daily to aid detoxification.</li>
          <li><strong>Reduce Processed Foods:</strong> Avoid sugary snacks, fried foods, and excess salt.</li>
          <li><strong>Limit Red Meat & Dairy:</strong> Excess saturated fats may burden the liver.</li>
        </ul>
      </div>
      
      {/* Exercise Recommendations */}
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h3 className="text-xl font-semibold mb-2">🏋️ Exercise Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Cardio Exercises:</strong> Walking, jogging, or cycling for at least 30 minutes daily.</li>
          <li><strong>Strength Training:</strong> Helps regulate metabolism and fat levels.</li>
          <li><strong>Yoga for Liver Health:</strong> Specific poses like Cobra Pose (<em>Bhujangasana</em>) and Child’s Pose (<em>Balasana</em>) support liver function.</li>
        </ul>
      </div>
      
      {/* Lifestyle Changes */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">🌱 Lifestyle Changes</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Avoid Smoking & Alcohol:</strong> Reduces liver stress and inflammation.</li>
          <li><strong>Sleep Well:</strong> Lack of sleep can worsen liver function.</li>
          <li><strong>Monitor Liver Health:</strong> Regular checkups for liver enzyme levels and function.</li>
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


      
    
  );
}
