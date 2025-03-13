
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,  FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness5() {
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

    
      <div className="max-w-8xl mt-5 mx-auto p-6 bg-slate-900 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-4">❤️ Heart Disease - Information & Solutions</h1>
      
      {/* Description */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">🏥 Description</h2>
        <p className="text-gray-100 mt-2">
          Heart disease refers to a group of conditions affecting the heart and blood vessels, leading to complications such as heart attacks, strokes, and heart failure. The most common type is <strong>Coronary Artery Disease (CAD)</strong>, caused by plaque buildup in the arteries that supply blood to the heart.
        </p>
      </section>
      
      {/* Symptoms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">⚠️ Symptoms</h2>
        <ul className="list-disc pl-5 text-gray-100 mt-2">
          <li>❤️ Chest pain or discomfort (<strong>angina</strong>)</li>
          <li>😤 Shortness of breath</li>
          <li>🏋️ Fatigue and weakness</li>
          <li>⚡ Irregular heartbeat (<strong>arrhythmia</strong>)</li>
          <li>🤕 Dizziness or fainting</li>
          <li>🦵 Swelling in the legs, ankles, or feet</li>
          <li>❄️ Cold sweat or nausea (<strong>especially in heart attacks</strong>)</li>
        </ul>
      </section>
      
      {/* Causes */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">🔍 Causes</h2>
        <ul className="list-disc pl-5 text-gray-100 mt-2">
          <li>🩸 <strong>Atherosclerosis</strong>: Plaque buildup in arteries reducing blood flow</li>
          <li>⚡ <strong>High Blood Pressure (Hypertension)</strong>: Puts strain on the heart</li>
          <li>🍔 <strong>High Cholesterol</strong>: Leads to fatty deposits in blood vessels</li>
          <li>🩸 <strong>Diabetes</strong>: High blood sugar damages blood vessels</li>
          <li>🚬 <strong>Smoking</strong>: Contributes to artery damage</li>
          <li>⚖️ <strong>Obesity & Poor Diet</strong>: High-fat, high-sugar diets increase the risk</li>
          <li>🚶 <strong>Lack of Exercise</strong>: Leads to poor circulation and weight gain</li>
          <li>🍷 <strong>Excessive Alcohol Consumption</strong>: Raises blood pressure and cholesterol levels</li>
        </ul>
      </section>
      
      {/* Preventive Measures */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center">🛡️ Preventive Measures</h2>
        <ul className="list-disc pl-5 text-gray-100 mt-2">
          <li>🥗 <strong>Eat a Heart-Healthy Diet</strong>: Reduce saturated fats, processed foods, and sugar</li>
          <li>🏃 <strong>Exercise Regularly</strong>: At least <strong>150 minutes</strong> of moderate activity per week</li>
          <li>🚭 <strong>Quit Smoking</strong>: Significantly reduces heart disease risk</li>
          <li>📊 <strong>Control Blood Pressure & Cholesterol</strong>: Through diet, exercise, and medication if needed</li>
          <li>🧘 <strong>Manage Stress</strong>: Mindfulness, yoga, or relaxation techniques</li>
          <li>⚖️ <strong>Maintain a Healthy Weight</strong>: Prevents added strain on the heart</li>
          <li>🩺 <strong>Get Regular Checkups</strong>: Monitor heart health through routine medical exams</li>
        </ul>
      </section>


      <h2 className="text-2xl font-bold mt-7 text-blue-400 mb-4">💊 Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-300">
              <th className="p-3 border border-gray-700">Medicine Name</th>
              <th className="p-3 border border-gray-700">Type</th>
              <th className="p-3 border border-gray-700">Dosage & Usage</th>
              <th className="p-3 border border-gray-700">Side Effects</th>
              <th className="p-3 border border-gray-700">Prescription Required?</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Aspirin (Low-dose)",
                type: "Blood thinner",
                dosage: "75-100mg daily",
                effects: "Stomach ulcers, bleeding risk",
                prescription: "No (but consult doctor)",
              },
              {
                name: "Atorvastatin (Lipitor)",
                type: "Cholesterol-lowering (Statin)",
                dosage: "10-80mg once daily",
                effects: "Muscle pain, liver issues",
                prescription: "Yes",
              },
              {
                name: "Lisinopril (Prinivil, Zestril)",
                type: "ACE Inhibitor (Lowers BP)",
                dosage: "10-40mg once daily",
                effects: "Dry cough, dizziness",
                prescription: "Yes",
              },
              {
                name: "Metoprolol (Lopressor, Toprol-XL)",
                type: "Beta-blocker",
                dosage: "25-100mg once or twice daily",
                effects: "Fatigue, slow heart rate",
                prescription: "Yes",
              },
              {
                name: "Nitroglycerin (Nitrostat)",
                type: "For angina (chest pain)",
                dosage: "0.3-0.6mg sublingual as needed",
                effects: "Headache, dizziness",
                prescription: "Yes",
              },
            ].map((med, index) => (
              <tr key={index} className="border border-gray-700 text-gray-300">
                <td className="p-3 border border-gray-700">{med.name}</td>
                <td className="p-3 border border-gray-700">{med.type}</td>
                <td className="p-3 border border-gray-700">{med.dosage}</td>
                <td className="p-3 border border-gray-700">{med.effects}</td>
                <td className="p-3 border border-gray-700">{med.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-6">🌿 Natural Alternatives</h2>
      <ul className="list-disc pl-6 mt-3 text-gray-300">
        <li><span className="font-semibold">🧄 Garlic Extract:</span> Helps lower cholesterol and blood pressure.</li>
        <li><span className="font-semibold">🐟 Omega-3 Fatty Acids:</span> Found in fish oil, flaxseeds, and walnuts, beneficial for heart health.</li>
        <li><span className="font-semibold">💊 Coenzyme Q10 (CoQ10):</span> Helps improve blood vessel function.</li>
        <li><span className="font-semibold"> Hawthorn Berry:</span>Traditionally used to support heart function.</li>
      </ul>


      <h2 className="text-2xl font-bold mt-7 text-blue-400 mb-4">🏡 Home Remedies & Wellness Tips</h2>

<section className="mb-6">
  <h3 className="text-xl font-semibold text-gray-100 mb-2">🌿 Herbal Remedies</h3>
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Green Tea:</strong> Rich in antioxidants that may improve heart function.</li>
    <li><strong>Hibiscus Tea:</strong> Helps reduce blood pressure naturally.</li>
    <li><strong>Turmeric (Curcumin):</strong> Anti-inflammatory properties that benefit cardiovascular health.</li>
  </ul>
</section>

<section className="mb-6">
  <h3 className="text-xl font-semibold text-gray-100 mb-2">🥗 Diet & Nutrition Advice</h3>
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Mediterranean Diet:</strong> High in fruits, vegetables, whole grains, and lean proteins.</li>
    <li><strong>Healthy Fats:</strong> Olive oil, nuts, and fish.</li>
    <li><strong>Reduce Sodium Intake:</strong> Excess salt can raise blood pressure.</li>
    <li><strong>Increase Fiber:</strong> Helps lower cholesterol; found in beans, oats, and whole grains.</li>
    <li><strong>Stay Hydrated:</strong> Drinking water supports circulation and heart function.</li>
  </ul>
</section>

<section className="mb-6">
  <h3 className="text-xl font-semibold text-gray-100 mb-2">🏃 Exercise Recommendations</h3>
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Aerobic Exercise:</strong> Walking, jogging, swimming, or cycling for 30 minutes daily.</li>
    <li><strong>Strength Training:</strong> Helps improve circulation and metabolism.</li>
    <li><strong>Yoga & Stretching:</strong> Reduces stress and supports heart health.</li>
    <li><strong>Breathing Exercises:</strong> Deep breathing techniques can lower blood pressure.</li>
  </ul>
</section>

<section>
  <h3 className="text-xl font-semibold text-gray-100 mb-2">🛌 Lifestyle Changes</h3>
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Regular Blood Pressure & Cholesterol Checks:</strong> Early detection prevents complications.</li>
    <li><strong>Improve Sleep Quality:</strong> Poor sleep increases heart disease risk.</li>
    <li><strong>Reduce Stress:</strong> Practice relaxation techniques and hobbies.</li>
    <li><strong>Limit Alcohol Intake:</strong> Excessive drinking can damage the heart.</li>
  </ul>
</section>
      

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
