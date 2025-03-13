import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit7Article() {
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
                  to="/fitness"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Fitness
                </Link>
                <Link
                  to="/nutrition"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Nutrition
                </Link>
                <Link
                  to="/selfcare"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Self-Care
                </Link>
                <Link
                  to="/wellness"
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

      {/* <div className="p-6 max-w-5xl mx-auto"> */}
      <div className="max-w-8xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        🛌 The Importance of Rest Days & How to Use Them Effectively
      </h2>
      <img
        src="/public/Fitness/fitness7.png"
        alt="posture"
        className="w-96 mt-5 rounded-lg mx-auto shadow-lg mb-6"
      />
      <p className="text-gray-300 leading-relaxed text-center">
        Rest days are often overlooked in fitness routines, but they are just as
        important as workouts. Whether you're into strength training, cardio, or
        high-intensity exercise, your body needs time to recover and rebuild.
        Skipping rest days can lead to burnout, injuries, and even hinder
        progress.
      </p>
      <div className="bg-gray-800 p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">💡 Why Rest Days Matter:</h3>
        <ul className="list-disc list-inside text-gray-400">
          <li>Muscle recovery and growth.</li>
          <li>Prevents overtraining and reduces injury risk.</li>
          <li>Improves overall performance and endurance.</li>
          <li>Helps maintain motivation and consistency.</li>
        </ul>
      </div>
      {/* <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-gray-50 max-w-2xl mx-auto"> */}
      <h2 className="text-2xl mt-5 font-bold mb-4 text-blue-400">Why Are Rest Days Important?</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-blue-300">✅ 1. Muscle Recovery & Growth</h3>
        <p className="leading-relaxed mt-2">
          When you work out, you create small tears in your muscle fibers. During rest days, your body repairs and rebuilds these fibers, making them stronger and more resilient. Without enough recovery time, muscle breakdown exceeds muscle repair, leading to weakness instead of growth.
        </p>
        <p className="text-gray-400 mt-2">✔ Fact: Studies show that muscles need 24-48 hours to fully recover after intense strength training.</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-blue-300">✅ 2. Prevents Overtraining & Injury</h3>
        <p className="leading-relaxed mt-2">
          Overtraining happens when your body doesn’t get enough time to recover, leading to chronic fatigue, poor performance, and increased injury risk.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li>Persistent soreness or joint pain</li>
          <li>Decreased strength and endurance</li>
          <li>Trouble sleeping or frequent colds</li>
          <li>Lack of motivation to work out</li>
        </ul>
        <p className="text-gray-400 mt-2">✔ Fact: A study in the Journal of Sports Sciences found that athletes who don’t rest properly are more prone to stress fractures, tendonitis, and joint pain.</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-blue-300">✅ 3. Improves Performance & Strength</h3>
        <p className="leading-relaxed mt-2">
          Rest days allow your nervous system to reset, leading to better coordination, power output, and overall performance. If you’ve ever felt stronger after taking a break, it’s because your body has had time to fully recover and replenish energy stores.
        </p>
        <p className="text-gray-400 mt-2">✔ Fact: Research from The National Strength and Conditioning Association shows that proper rest improves endurance, strength, and agility by up to 20% over time.</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-blue-300">✅ 4. Supports Hormonal Balance & Fat Loss</h3>
        <p className="leading-relaxed mt-2">
          Exercise boosts cortisol (stress hormone), but too much without rest can lead to elevated cortisol levels, which promotes fat storage and muscle breakdown. Rest days help restore hormonal balance, allowing your body to burn fat efficiently.
        </p>
        <p className="text-gray-400 mt-2">✔ Fact: High cortisol levels have been linked to increased belly fat and slower metabolism (American Journal of Physiology).</p>
      </div>
    {/* </div> */}


    <h2 className="text-2xl font-bold text-blue-400 mb-4">
        How to Use Rest Days Effectively
      </h2>
      
      <div className="space-y-6">
        {/* Listen to Your Body */}
        <div>
          <h3 className="text-xl font-semibold">1. Listen to Your Body</h3>
          <p className="text-gray-300 mt-2">
            ✔ Take a rest day when you feel sore, fatigued, or unmotivated.
            <br />✔ If you notice decreased performance or prolonged soreness, give yourself extra recovery time.
          </p>
          <p className="text-blue-400 mt-2 font-medium">📌 Tip: If you’re training intensely 5-6 days a week, schedule at least 1-2 full rest days.</p>
        </div>
        
        {/* Active Recovery */}
        <div>
          <h3 className="text-xl font-semibold">2. Active Recovery: Stay Lightly Active</h3>
          <p className="text-gray-300 mt-2">Low-intensity movement can improve circulation, reduce stiffness, and speed up muscle recovery.</p>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>🚶 Walking (increases blood flow without stressing muscles)</li>
            <li>🧘 Yoga or Stretching (improves flexibility, reduces soreness)</li>
            <li>🚴 Light Cycling or Swimming (low-impact and easy on joints)</li>
            <li>🏋️ Bodyweight Mobility Work (maintains range of motion)</li>
          </ul>
          <p className="text-blue-400 mt-2 font-medium">📌 Tip: Active recovery can reduce muscle soreness by 25% compared to complete rest.</p>
        </div>
        
        {/* Sleep & Recovery */}
        <div>
          <h3 className="text-xl font-semibold">3. Prioritize Sleep for Maximum Recovery</h3>
          <p className="text-gray-300 mt-2">
            ✔ Aim for 7-9 hours of sleep to optimize muscle repair and performance.
            <br />✔ Deep sleep is when growth hormone levels peak, which is crucial for muscle growth and fat loss.
          </p>
          <p className="text-blue-400 mt-2 font-medium">📌 Fact: Sleep deprivation reduces muscle recovery by 40% and increases injury risk.</p>
        </div>
        
        {/* Hydration & Nutrition */}
        <div>
          <h3 className="text-xl font-semibold">4. Stay Hydrated & Fuel Properly</h3>
          <p className="text-gray-300 mt-2">✔ Drink at least 8-10 cups of water daily to prevent dehydration.</p>
          <p className="font-medium mt-2">✔ Best Recovery Foods:</p>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>🥩 Protein: Chicken, fish, eggs, Greek yogurt</li>
            <li>🥑 Healthy Fats: Avocados, nuts, olive oil</li>
            <li>🍓 Antioxidants: Berries, spinach, turmeric</li>
            <li>🍚 Complex Carbs: Sweet potatoes, quinoa, brown rice</li>
          </ul>
          <p className="text-blue-400 mt-2 font-medium">📌 Fact: Consuming 20-30g of protein post-workout and on rest days promotes muscle recovery.</p>
        </div>
        
        {/* Recovery Tools */}
        <div>
          <h3 className="text-xl font-semibold">5. Use Recovery Tools (Massage, Foam Rolling, Cold Therapy)</h3>
          <p className="text-gray-300 mt-2">
            ✔ Foam Rolling & Stretching: Improves circulation and flexibility.
            <br />✔ Cold Therapy (Ice Baths, Cryotherapy): Helps reduce muscle soreness.
            <br />✔ Massage Guns or Deep Tissue Massage: Increases blood flow and speeds up recovery.
          </p>
          <p className="text-blue-400 mt-2 font-medium">📌 Fact: Foam rolling after workouts can reduce soreness by 30% and improve flexibility.</p>
        </div>
        
        {/* Plan Your Rest Days */}
        <div>
          <h3 className="text-xl font-semibold">6. Plan Your Rest Days Strategically</h3>
          <p className="text-gray-300 mt-2">
            Your rest day schedule depends on your workout intensity and fitness goals.
          </p>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-300 border border-gray-700">
        <thead className="text-gray-200 uppercase bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 border-r border-gray-700">
              Workout Type
            </th>
            <th scope="col" className="px-6 py-3">
              Ideal Rest Frequency
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          <tr className="border-b border-gray-700">
            <td className="px-6 py-4 border-r border-gray-700">Strength Training</td>
            <td className="px-6 py-4">1-2 rest days per week</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-6 py-4 border-r border-gray-700">HIIT Workouts</td>
            <td className="px-6 py-4">2-3 rest days per week</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-6 py-4 border-r border-gray-700">Endurance (Running, Cycling)</td>
            <td className="px-6 py-4">1-2 rest days per week</td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-r border-gray-700">Beginner (3-4x workouts/week)</td>
            <td className="px-6 py-4">2-3 rest days per week</td>
          </tr>
        </tbody>
      </table>

       {/* Section Title */}
       <h2 className="text-2xl font-semibold mt-5 text-blue-400 mb-4">📌 Example Workout Schedule</h2>

{/* Workout Days List */}
<ul className="space-y-3 text-lg">
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Monday:</span> Strength Training
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Tuesday:</span> Cardio + Core
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Wednesday:</span> Active Recovery (Yoga or Walking)
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Thursday:</span> Strength Training
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Friday:</span> HIIT Workout
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Saturday:</span> Full Rest Day
  </li>
  <li className="flex items-center">
    <span className="text-blue-500 font-bold">Sunday:</span> Active Recovery (Light Stretching, Walking)
  </li>
</ul>

{/* Divider */}
<div className="border-t border-gray-700 my-6"></div>

{/* Final Thoughts */}
<h3 className="text-xl font-semibold text-yellow-400 mb-3">🏋️‍♂️ Final Thoughts: Prioritize Rest for Long-Term Progress</h3>
<p className="text-gray-300 leading-relaxed">
  Rest days are not a setback—they are an essential part of a balanced fitness routine. If you want to build strength, avoid burnout, and stay injury-free, make recovery a priority.
</p>

{/* Key Takeaways */}
<h3 className="text-xl font-semibold text-green-400 mt-6">🎯 Key Takeaways</h3>
<ul className="mt-3 space-y-2">
  <li className="flex items-center">
    ✅ Rest days allow muscles to recover & grow, preventing overtraining.
  </li>
  <li className="flex items-center">
    ✅ Active recovery (walking, stretching, yoga) keeps blood flowing without stressing muscles.
  </li>
  <li className="flex items-center">
    ✅ Prioritize sleep, hydration, and nutrition for optimal recovery.
  </li>
  <li className="flex items-center">
    ✅ Use massage, foam rolling, and cold therapy to reduce soreness.
  </li>
  <li className="flex items-center">
    ✅ Plan rest days based on your workout intensity and listen to your body.
  </li>
</ul>

{/* Call to Action */}
<p className="mt-6 text-center text-lg font-semibold text-purple-400">
  🔥 Now it’s your turn! Do you schedule rest days, or do you tend to push through workouts without breaks?
</p>
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
    // </div>
  );
}
