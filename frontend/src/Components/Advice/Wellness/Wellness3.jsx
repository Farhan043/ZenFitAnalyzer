
import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLeaf, FaUtensils, FaRunning, FaHeartbeat,FaBars,FaVirus,FaShieldAlt,  FaTimes ,FaShieldVirus, FaNotesMedical, FaHandsWash } from "react-icons/fa";

export default function Wellness3() {
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
    {
      title: "Description",
      content: (
        <>
          <p className="mb-3">Diabetes is a chronic condition that affects how the body processes blood sugar (glucose). There are two main types:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">Type 1 Diabetes:</strong> An autoimmune condition where the body attacks insulin-producing cells in the pancreas, leading to little or no insulin production.</li>
            <li><strong className="text-blue-400">Type 2 Diabetes:</strong> A metabolic disorder where the body becomes resistant to insulin or doesn't produce enough, leading to high blood sugar levels.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Symptoms",
      items: [
        "Frequent urination (polyuria)",
        "Excessive thirst (polydipsia)",
        "Increased hunger (polyphagia)",
        "Unexplained weight loss (common in Type 1)",
        "Fatigue and weakness",
        "Blurred vision",
        "Slow-healing wounds",
        "Tingling or numbness in hands/feet (common in Type 2)",
      ],
    },
    {
      title: "Causes",
      subsections: [
        {
          subtitle: "Type 1 Diabetes",
          items: [
            "Autoimmune Reaction: The immune system mistakenly destroys insulin-producing cells.",
            "Genetics: A family history increases the risk.",
            "Environmental Triggers: Viral infections may contribute to the onset.",
          ],
        },
        {
          subtitle: "Type 2 Diabetes",
          items: [
            "Insulin Resistance: Cells fail to respond properly to insulin.",
            "Obesity & Poor Diet: High sugar and processed food intake increase the risk.",
            "Sedentary Lifestyle: Lack of physical activity leads to insulin resistance.",
            "Genetics: Family history increases the likelihood.",
          ],
        },
      ],
    },
    {
      title: "Preventive Measures",
      items: [
        "Healthy Diet: Reduce sugar and processed carbs, and focus on whole foods.",
        "Regular Exercise: At least 150 minutes of moderate activity per week.",
        "Maintain Healthy Weight: Prevent obesity-related insulin resistance.",
        "Monitor Blood Sugar: Regular check-ups to detect early signs.",
        "Stay Hydrated: Drinking water can help regulate blood sugar levels.",
        "Quit Smoking & Limit Alcohol: Both increase diabetes complications.",
      ],
    },
  ];

  const medicines = [
    {
      name: "Metformin (Glucophage)",
      type: "Type 2",
      dosage: "500-2000mg daily",
      sideEffects: "Nausea, diarrhea, lactic acidosis (rare)",
      prescription: "Yes",
    },
    {
      name: "Insulin (Rapid, Short, Long-acting)",
      type: "Type 1 & Type 2",
      dosage: "Dosage varies per individual",
      sideEffects: "Hypoglycemia (low blood sugar)",
      prescription: "Yes",
    },
    {
      name: "Sulfonylureas (Glibenclamide, Glipizide)",
      type: "Type 2",
      dosage: "2.5-20mg daily",
      sideEffects: "Weight gain, hypoglycemia",
      prescription: "Yes",
    },
    {
      name: "DPP-4 Inhibitors (Sitagliptin, Linagliptin)",
      type: "Type 2",
      dosage: "100mg once daily",
      sideEffects: "Headache, joint pain",
      prescription: "Yes",
    },
    {
      name: "SGLT2 Inhibitors (Canagliflozin, Empagliflozin)",
      type: "Type 2",
      dosage: "100-300mg once daily",
      sideEffects: "Urinary infections, dehydration",
      prescription: "Yes",
    },
  ];

  const alternatives = [
    { name: "Cinnamon Supplements", description: "May improve insulin sensitivity." },
    { name: "Fenugreek Seeds", description: "Help lower blood sugar." },
    { name: "Apple Cider Vinegar", description: "Can reduce post-meal glucose spikes." },
  ];


  const remedies = [
    { category: "Herbal Remedies", items: [
      { name: "Bitter Melon", description: "Contains insulin-like compounds that lower blood sugar." },
      { name: "Turmeric (Curcumin)", description: "Reduces inflammation and helps regulate glucose." },
      { name: "Ginseng", description: "Can enhance insulin sensitivity." }
    ]},
    { category: "Diet & Nutrition Advice", items: [
      { name: "Low-Carb, High-Fiber Diet", description: "Eat whole grains, legumes, and leafy greens." },
      { name: "Lean Protein Sources", description: "Include fish, chicken, tofu, and nuts." },
      { name: "Healthy Fats", description: "Avocados, olive oil, and nuts help maintain blood sugar stability." },
      { name: "Avoid Sugary Foods & Drinks", description: "Reduce soda, sweets, and white bread." }
    ]},
    { category: "Exercise Recommendations", items: [
      { name: "Aerobic Exercise", description: "Walking, cycling, or swimming for at least 30 minutes daily." },
      { name: "Strength Training", description: "Helps improve insulin sensitivity." },
      { name: "Yoga & Stretching", description: "Reduces stress and improves circulation." },
      { name: "Short Walks After Meals", description: "Helps control blood sugar spikes." }
    ]},
    { category: "Lifestyle Changes", items: [
      { name: "Regular Blood Sugar Monitoring", description: "Helps track trends and avoid complications." },
      { name: "Reduce Stress", description: "Meditation, deep breathing, and mindfulness help regulate hormones." },
      { name: "Adequate Sleep", description: "Poor sleep can raise blood sugar levels." },
      { name: "Stay Hydrated", description: "Drinking enough water prevents dehydration-related spikes." }
    ]}
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

    
      <div className="bg-gray-900 text-white mt-5 p-6 rounded-lg shadow-lg max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">Diabetes (Type 1 & Type 2)</h2>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-gray-600 pb-2 mb-3">{section.title}</h3>
          {section.content || (
            <ul className="list-disc list-inside space-y-2">
              {section.items?.map((item, i) => (
                <li key={i} className="bg-gray-800 p-3 rounded-lg shadow-md">{item}</li>
              ))}
            </ul>
          )}
          {section.subsections &&
            section.subsections.map((sub, i) => (
              <div key={i} className="mt-4">
                <h4 className="text-lg font-semibold text-blue-400">{sub.subtitle}</h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {sub.items.map((item, j) => (
                    <li key={j} className="bg-gray-800 p-3 rounded-lg shadow-md">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ))}

    <h2 className="text-2xl text-blue-400 font-bold mb-4">Medicine Recommendations</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 border border-gray-700">Medicine Name</th>
              <th className="p-3 border border-gray-700">Type</th>
              <th className="p-3 border border-gray-700">Dosage & Usage</th>
              <th className="p-3 border border-gray-700">Side Effects</th>
              <th className="p-3 border border-gray-700">Prescription Required?</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index} className="bg-gray-800 text-center">
                <td className="p-3 border border-gray-700">{medicine.name}</td>
                <td className="p-3 border border-gray-700">{medicine.type}</td>
                <td className="p-3 border border-gray-700">{medicine.dosage}</td>
                <td className="p-3 border border-gray-700">{medicine.sideEffects}</td>
                <td className="p-3 border border-gray-700">{medicine.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-semibold mt-6 mb-3">Natural Alternatives</h3>
      <ul className="list-disc list-inside space-y-2">
        {alternatives.map((alt, index) => (
          <li key={index} className="bg-gray-800 p-3 rounded-lg shadow-md">
            <strong className="text-blue-400">{alt.name}:</strong> {alt.description}
          </li>
        ))}
      </ul>

      <h2 className="text-3xl text-blue-400 mt-9 font-bold mb-4">Home Remedies & Wellness Tips</h2>
      {remedies.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">{section.category}</h3>
          <ul className="list-disc list-inside space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded-lg shadow-md">
                <strong className="text-green-400">{item.name}:</strong> {item.description}
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
