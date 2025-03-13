
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,  FaFish, FaHeart, FaTint , FaHeartbeat,  FaWeight,  FaAppleAlt,FaDumbbell, FaMugHot, FaSmokingBan, FaBrain, FaUtensils, FaRunning, FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness6() {
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


      <div className="max-w-8xl mx-auto p-6 bg-slate-900 mt-5 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
        🫁 Pneumonia - Disease Information & Solutions
      </h1>
      <hr className="my-4" />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
          🏥 Description
        </h2>
        <p className="text-gray-100 mt-2">
          Pneumonia is a <strong>lung infection</strong> that causes <strong>inflammation</strong> of the air sacs
          (<strong>alveoli</strong>) in one or both lungs. These sacs may fill with <strong>fluid or pus</strong>,
          making it difficult to breathe. Pneumonia can range from <strong>mild to severe</strong> and may be
          <strong>life-threatening</strong>, especially for <strong>young children, the elderly, and individuals with
          weakened immune systems</strong>. It can be caused by <strong>bacteria, viruses, or fungi</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
          ⚠️ Symptoms
        </h2>
        <ul className="list-disc list-inside text-gray-100 mt-2 space-y-2">
          <li>🤧 <strong>Cough</strong> (may produce mucus or phlegm)</li>
          <li>🌡️ <strong>Fever, chills, and sweating</strong></li>
          <li>😤 <strong>Shortness of breath</strong></li>
          <li>💔 <strong>Chest pain</strong>, especially while breathing or coughing</li>
          <li>🥱 <strong>Fatigue and weakness</strong></li>
          <li>🤢 <strong>Nausea or vomiting</strong></li>
          <li>🤯 <strong>Confusion</strong> (especially in older adults)</li>
          <li>🫁 <strong>Rapid or shallow breathing</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
          🔍 Causes
        </h2>
        <ul className="list-disc list-inside text-gray-100 mt-2 space-y-2">
          <li>🦠 <strong>Bacteria</strong>: <em>Streptococcus pneumoniae</em> is the most common bacterial cause.</li>
          <li>🦠 <strong>Viruses</strong>: Influenza (<strong>flu</strong>), <strong>COVID-19</strong>, and <strong>RSV</strong> can lead to viral pneumonia.</li>
          <li>🍄 <strong>Fungi</strong>: More common in people with <strong>weakened immune systems</strong>.</li>
          <li>🍽️ <strong>Aspiration Pneumonia</strong>: Occurs when <strong>food, liquids, or vomit enter the lungs</strong> instead of the stomach.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-400 flex items-center gap-2">
          🛡️ Preventive Measures
        </h2>
        <ul className="list-disc list-inside text-gray-100 mt-2 space-y-2">
          <li>💉 <strong>Get Vaccinated</strong>: Pneumococcal and flu vaccines can <strong>prevent some forms of pneumonia</strong>.</li>
          <li>🧼 <strong>Practice Good Hygiene</strong>: Wash hands frequently and avoid close contact with sick individuals.</li>
          <li>🚭 <strong>Quit Smoking</strong>: Smoking <strong>damages lung tissue</strong> and weakens immune defenses.</li>
          <li>🥗 <strong>Maintain a Healthy Diet</strong>: Strengthen immunity with a <strong>balanced diet</strong> rich in <strong>vitamins and minerals</strong>.</li>
          <li>💧 <strong>Stay Hydrated</strong>: Helps keep the <strong>respiratory tract clear</strong>.</li>
          <li>⚕️ <strong>Manage Chronic Conditions</strong>: Conditions like <strong>asthma and diabetes</strong> increase pneumonia risk.</li>
        </ul>
      </section>



      <h2 className="text-2xl font-bold text-blue-400 mb-4">💊 Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Medicine Name</th>
              <th className="border border-gray-700 px-4 py-2">Type</th>
              <th className="border border-gray-700 px-4 py-2">Dosage & Usage</th>
              <th className="border border-gray-700 px-4 py-2">Side Effects</th>
              <th className="border border-gray-700 px-4 py-2">Prescription Required?</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Amoxicillin",
                type: "Antibiotic",
                dosage: "500-875mg every 8-12 hours",
                effects: "Nausea, diarrhea, rash",
                prescription: "Yes",
              },
              {
                name: "Azithromycin (Zithromax)",
                type: "Antibiotic",
                dosage: "500mg once daily for 3-5 days",
                effects: "Stomach upset, dizziness",
                prescription: "Yes",
              },
              {
                name: "Levofloxacin (Levaquin)",
                type: "Antibiotic",
                dosage: "500-750mg once daily",
                effects: "Headache, nausea, tendon damage risk",
                prescription: "Yes",
              },
              {
                name: "Oseltamivir (Tamiflu)",
                type: "Antiviral (for flu-related pneumonia)",
                dosage: "75mg twice daily for 5 days",
                effects: "Nausea, vomiting",
                prescription: "Yes",
              },
              {
                name: "Acetaminophen (Tylenol)",
                type: "Fever & pain relief",
                dosage: "500mg every 4-6 hours as needed",
                effects: "Liver damage (high doses)",
                prescription: "No",
              },
            ].map((med, index) => (
              <tr key={index} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="border border-gray-700 px-4 py-2 font-semibold">{med.name}</td>
                <td className="border border-gray-700 px-4 py-2">{med.type}</td>
                <td className="border border-gray-700 px-4 py-2">{med.dosage}</td>
                <td className="border border-gray-700 px-4 py-2">{med.effects}</td>
                <td className="border border-gray-700 px-4 py-2 font-bold text-yellow-400">{med.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold mt-6">🌿 Natural Alternatives</h3>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li><strong>🫐 Elderberry Syrup:</strong> May boost the immune system and help fight viral infections.</li>
        <li><strong>🍯 Honey & Lemon:</strong> Helps soothe the throat and reduce coughing.</li>
        <li><strong>🍵 Ginger & Turmeric Tea:</strong> Has anti-inflammatory and antibacterial properties.</li>
        <li><strong>🥛 Probiotics (Yogurt, Kefir):</strong> Strengthens immunity and gut health.</li>
      </ul>


      <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold border-b-2 border-gray-700 pb-2 mb-4">🏡 Home Remedies & Wellness Tips</h2>
      
      {/* Herbal Remedies */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">🌿 Herbal Remedies</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Eucalyptus Steam Inhalation:</strong> Helps clear mucus and open airways.</li>
          <li><strong>Ginger Tea:</strong> Reduces inflammation and relieves congestion.</li>
          <li><strong>Garlic:</strong> Has antimicrobial properties that may help fight infections.</li>
        </ul>
      </section>
      
      {/* Diet & Nutrition Advice */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">🥗 Diet & Nutrition Advice</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Increase Vitamin C & Zinc:</strong> Found in citrus fruits, bell peppers, and nuts, helps boost immunity.</li>
          <li><strong>Drink Warm Fluids:</strong> Herbal teas, broths, and soups keep the respiratory system hydrated.</li>
          <li><strong>Avoid Dairy & Processed Foods:</strong> May increase mucus production.</li>
          <li><strong>Eat Antioxidant-Rich Foods:</strong> Berries, spinach, and nuts help reduce inflammation.</li>
        </ul>
      </section>
      
      {/* Exercise Recommendations */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">🏃 Exercise Recommendations</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Deep Breathing Exercises:</strong> Strengthens lung capacity and improves oxygen flow.</li>
          <li><strong>Light Walking:</strong> Helps maintain circulation but avoid overexertion.</li>
          <li><strong>Postural Drainage:</strong> Lying in different positions helps clear mucus from the lungs.</li>
        </ul>
      </section>
      
      {/* Lifestyle Changes */}
      <section>
        <h3 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">🌍 Lifestyle Changes</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Use a Humidifier:</strong> Keeps airways moist and eases breathing.</li>
          <li><strong>Rest & Sleep Well:</strong> Helps the body recover faster.</li>
          <li><strong>Avoid Polluted Areas:</strong> Stay away from smoke and dust to prevent irritation.</li>
        </ul>
      </section>
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
