
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf,FaExclamationTriangle,FaSpa,FaFish,   FaDumbbell, FaRegHeart , FaBrain, FaSadCry, FaUtensils, FaRunning, FaUsers,FaHandsHelping,  FaBed, FaHeartbeat,FaBars, FaTimes  } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdOutlineMonitorHeart } from "react-icons/md";
import { GiBrain, GiMeditation } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";

export default function Wellness10() {
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
    { name: "Fluoxetine (Prozac)", type: "SSRI Antidepressant", dosage: "10-40mg daily", sideEffects: "Nausea, dizziness, insomnia", prescription: "Yes" },
    { name: "Sertraline (Zoloft)", type: "SSRI Antidepressant", dosage: "25-100mg daily", sideEffects: "Dry mouth, drowsiness, headache", prescription: "Yes" },
    { name: "Escitalopram (Lexapro)", type: "SSRI Antidepressant", dosage: "10-20mg daily", sideEffects: "Weight gain, fatigue", prescription: "Yes" },
    { name: "Alprazolam (Xanax)", type: "Benzodiazepine (for anxiety)", dosage: "0.25-1mg as needed", sideEffects: "Drowsiness, addiction risk", prescription: "Yes" },
    { name: "Buspirone (Buspar)", type: "Anti-anxiety", dosage: "5-10mg twice daily", sideEffects: "Dizziness, nausea", prescription: "Yes" },
    { name: "Bupropion (Wellbutrin)", type: "Atypical Antidepressant", dosage: "75-300mg daily", sideEffects: "Dry mouth, sweating, agitation", prescription: "Yes" },
    { name: "L-Theanine (Natural Supplement)", type: "Amino Acid", dosage: "200-400mg daily", sideEffects: "None (generally safe)", prescription: "No" },
  ];

  const sections = [
    {
      icon: <FaLeaf className="text-green-500 text-2xl" />, title: "Herbal Remedies", items: [
        "Chamomile Tea: Reduces stress and promotes relaxation",
        "Lavender Essential Oil: Helps with sleep and anxiety relief",
        "Valerian Root: Used for anxiety and insomnia"
      ]
    },
    {
      icon: <FaUtensils className="text-yellow-500 text-2xl" />, title: "Diet & Nutrition Advice", items: [
        "Increase Omega-3 Intake: Fatty fish, walnuts, and flaxseeds",
        "Eat Magnesium-Rich Foods: Bananas, dark chocolate, and leafy greens",
        "Vitamin B12 & D: Found in eggs, dairy, and sunlight exposure",
        "Limit Sugar & Processed Foods: Can contribute to mood swings"
      ]
    },
    {
      icon: <FaDumbbell className="text-blue-500 text-2xl" />, title: "Exercise Recommendations", items: [
        "Yoga & Meditation: Reduces stress hormones",
        "divio Workouts: Running, cycling, and swimming boost serotonin",
        "Strength Training: Helps with self-confidence and resilience",
        "Breathing Exercises: Deep breathing calms the nervous system"
      ]
    },
    {
      icon: <FaRegHeart className="text-red-500 text-2xl" />, title: "Lifestyle Changes", items: [
        "Set a Routine: Structured days improve mood stability",
        "Socialize: Engaging with friends or support groups helps mental well-being",
        "Journaling: Writing down thoughts reduces emotional overload",
        "Reduce Screen Time: Social media can increase anxiety"
      ]
    }
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

      <div className="p-6 max-w-8xl mx-auto bg-slate-900 mt-5 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🧠 Depression & Anxiety</h2>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaSadCry className="mr-2 text-red-600" /> Description</h3>
        <p className="text-gray-200">
          Depression and anxiety are mental health disorders that affect emotions and daily life.
          Depression includes persistent sadness, while anxiety causes excessive worry.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><FaHeartbeat className="mr-2 text-red-500" /> Symptoms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black bg-opacity-50 p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><MdOutlineMonitorHeart className="mr-2 text-red-400" /> Depression</h4>
            <ul className="list-disc ml-6 text-gray-200">
              <li>Persistent sadness or hopelessness</li>
              <li>Loss of interest in activities</li>
              <li>Fatigue and low energy</li>
              <li>Sleep disturbances</li>
              <li>Suicidal thoughts (severe cases)</li>
            </ul>
          </div>
          <div className="bg-black bg-opacity-50 p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaBrain className="mr-2 text-blue-400" /> Anxiety</h4>
            <ul className="list-disc ml-6 text-gray-200">
              <li>Excessive worry and fear</li>
              <li>Increased heart rate</li>
              <li>Muscle tension</li>
              <li>Shortness of breath</li>
              <li>Panic attacks</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-6 bg-black bg-opacity-50 p-4 rounded shadow ">
        <h3 className="text-xl  font-semibold mb-2 flex items-center"><GiBrain className="mr-2 text-purple-500" /> Causes</h3>
        <ul className="list-disc ml-6 text-gray-200">
          <li><strong>Genetics:</strong> Family history of mental disorders</li>
          <li><strong>Chronic Stress:</strong> Work, finance, relationships</li>
          <li><strong>Hormonal Changes:</strong> Pregnancy, menopause</li>
          <li><strong>Substance Abuse:</strong> Alcohol & drug dependence</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center"><MdOutlineHealthAndSafety className="mr-2 text-green-500" /> Preventive Measures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaRunning className="mr-2 text-green-400" /> Regular Exercise</h4>
            <p className="text-gray-700">Boosts endorphins and reduces stress.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaUtensils className="mr-2 text-yellow-400" /> Healthy Diet</h4>
            <p className="text-gray-700">Nutrient-rich foods improve brain function.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaBed className="mr-2 text-blue-400" /> Adequate Sleep</h4>
            <p className="text-gray-700">7-9 hours of rest daily.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaUsers className="mr-2 text-purple-400" /> Social Support</h4>
            <p className="text-gray-700">Staying connected with loved ones.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><GiMeditation className="mr-2 text-pink-400" /> Mindfulness & Meditation</h4>
            <p className="text-gray-700">Reduces stress and enhances emotional regulation.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold flex items-center"><FaHandsHelping className="mr-2 text-orange-400" /> Seeking Therapy</h4>
            <p className="text-gray-700">Professional guidance can prevent severe episodes.</p>
          </div>
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-4 border-b pb-2">💊 Medicine Recommendations</h2>
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

      <h2 className="text-2xl font-semibold mt-7 mb-4 flex items-center">
        <FaLeaf className="mr-2 text-green-400" /> Natural Alternatives
      </h2>
      <ul className="space-y-3">
        <li className="flex items-center">
          <FaSpa className="text-yellow-400 mr-2" /> <strong>St. John’s Wort</strong> (for mild depression)
        </li>
        <li className="flex items-center">
          <FaBrain className="text-blue-400 mr-2" /> <strong>Ashwagandha</strong> (reduces stress and anxiety)
        </li>
        <li className="flex items-center">
          <FaLeaf className="text-green-300 mr-2" /> <strong>Magnesium Supplements</strong> (improves relaxation)
        </li>
        <li className="flex items-center">
          <FaFish className="text-cyan-400 mr-2" /> <strong>Omega-3 Fatty Acids</strong> (found in fish oil for brain health)
        </li>
      </ul>
      <div className="mt-4 p-4 bg-red-700 text-white rounded-lg flex items-center">
        <FaExclamationTriangle className="mr-2 text-yellow-300" />
        <span>
          <strong>Warning:</strong> Some herbal remedies interact with medications. Consult a doctor before using them.
        </span>
      </div>

      <h2 className="text-3xl font-bold mt-5 text-center mb-6">Home Remedies & Wellness Tips</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-2xl shadow-lg">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {section.icon}
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <ul className="list-disc ml-5 space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-gray-300">{item}</li>
                ))}
              </ul>
            </div>
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

  );
}
