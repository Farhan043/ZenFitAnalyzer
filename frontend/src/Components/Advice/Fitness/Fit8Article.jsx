import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit8Article() {
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

  const stretches = [
    {
      title: "Standing Forward Fold",
      targets: "Hamstrings, lower back, calves",
      benefits: [
        "Improves lower back flexibility",
        "Relieves tight hamstrings and calves",
        "Reduces stress and tension in the spine",
      ],
      steps: [
        "Stand with feet hip-width apart.",
        "Slowly bend forward at the hips, reaching toward your toes.",
        "Keep your knees slightly bent if needed.",
        "Hold for 30 seconds, breathing deeply.",
      ],
      tip: "Don’t force the stretch—let gravity do the work.",
    },
    {
      title: "Cat-Cow Stretch",
      targets: "Spine, neck, lower back",
      benefits: [
        "Enhances spinal flexibility and mobility",
        "Relieves back stiffness",
        "Improves posture and reduces back pain",
      ],
      steps: [
        "Start on all fours (hands under shoulders, knees under hips).",
        "Inhale—arch your back, lift your head and tailbone (Cow Pose).",
        "Exhale—round your back, tucking your chin and pelvis (Cat Pose).",
        "Repeat 10 times, flowing with your breath.",
      ],
      tip: "Move slowly and focus on spinal articulation for maximum benefit.",
    },
    {
      title: "Butterfly Stretch",
      targets: "Hips, inner thighs, lower back",
      benefits: [
        "Improves hip mobility",
        "Reduces lower back and knee pain",
        "Increases flexibility in the groin area",
      ],
      steps: [
        "Sit with your feet together, knees bent outward.",
        "Hold your feet and gently press your knees toward the floor.",
        "Keep your back straight and hold for 30 seconds.",
      ],
      tip: "If your hips are tight, sit on a cushion to elevate your hips.",
    },

    {
      title: "Seated Spinal Twist (Back & Core Stretch)",
      targets: "Spine, lower back, obliques",
      benefits: [
        "Enhances spinal rotation and mobility",
        "Alleviates lower back stiffness",
        "Aids digestion and relieves tension",
      ],
      steps: [
        "Sit with legs extended.",
        "Bend your right knee and place your right foot over your left thigh.",
        "Place your right hand behind you, left elbow on right knee, and twist.",
        "Hold for 30 seconds per side."
      ],
      tip: "Keep your spine long and tall as you twist—avoid hunching.",
    },

    {
      title: "Downward Dog (Full-Body Mobility Stretch)",
      targets: "Shoulders, hamstrings, calves, spine",
      benefits: [
        "Stretches the entire posterior chain (back, legs, arms)",
        "Improves shoulder and hamstring flexibility",
        "Relieves back and neck tension",
      ],
      steps: [
        "Start in a push-up position.",
        "Lift your hips toward the ceiling, forming an inverted V.",
        "Press your heels toward the floor and relax your head.",
        "Hold for 30 seconds, breathing deeply."
      ],
      tip: "Bend your knees slightly if your hamstrings are tight.",
    },

    {
      title: "Hip Flexor Stretch (Hip Mobility & Posture)",
      targets: "Hip flexors, quads, lower back",
      benefits: [
        "Counteracts tight hips from sitting too much",
        "Improves posture and reduces lower back pain",
        "Enhances mobility for squats and lunges",
      ],
      steps: [
        "Kneel on one knee, other foot forward (90-degree angle).",
        "Push hips forward slightly, keeping your chest upright.",
        "Hold for 30 seconds per side.",
      ],
      tip: "Engage your glutes to deepen the stretch.",
    },

    {
      title: "Shoulder Stretch (Upper Body Mobility)",
      targets: "Shoulders, upper back, arms",
      benefits: [
        "Relieves shoulder tension",
        "Improves range of motion for lifting, throwing, and pushing movements",
        "Helps prevent shoulder impingement",
      ],
      steps: [
        "Extend one arm across your chest.",
        "Use the opposite hand to gently press your arm closer.",
        "Hold for 20-30 seconds per side.",
      ],
      tip: "Keep your shoulders relaxed—don’t shrug.",
    },

    {
        title: "Standing Quad Stretch (Leg Flexibility & Knee Health)",
        targets: "Quadriceps, hip flexors",
        benefits: [
          "Improves knee and hip flexibility",
          "Reduces thigh tightness after running or leg workouts",
          "Enhances mobility for squats and lunges",
        ],
        steps: [
          "Stand tall and grab your right foot behind you.",
          "Keep knees together, pulling your heel toward your glutes.",
          "Hold for 30 seconds per side.",
        ],
        tip: "Hold onto a wall for balance if needed.",
      },

      {
        title: "Child’s Pose (Relaxation & Flexibility)",
        targets: " Lower back, hips, shoulders",
        benefits: [
          "Stretches the spine and hips",
          "Reduces lower back pain",
          "Enhances relaxation and recovery",
        ],
        steps: [
          "Kneel on the floor, sit back on your heels.",
          "Extend arms forward, lowering your chest to the ground.",
          "Hold for 30-60 seconds, breathing deeply.",
        ],
        tip: "Spread your knees wider for a deeper stretch.",
      },

      {
        title: " Standing Side Stretch (Oblique & Spine Flexibility)",
        targets: " Obliques, spine, shoulders",
        benefits: [
          "SImproves side-to-side mobility",
          "Reduces lower back stiffness",
          "Helps with rotational movements (sports, daily activities)",
        ],
        steps: [
          "Stand tall, feet hip-width apart.",
          "Reach your right arm overhead and lean left.",
          "Hold for 20-30 seconds per side.",
        ],
        tip: "Keep your core engaged to avoid collapsing into the stretch.",
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

      <div className="max-w-8xl mt-7 mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
          10 Essential Stretches to Boost Flexibility & Mobility
        </h2>
        <img
          src="/public/Fitness/fitness8.png"
          alt="posture"
          className="w-96 mt-5 rounded-lg mx-auto shadow-lg mb-6"
        />
        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          🧘 Why Flexibility & Mobility Matter
        </h2>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed">
          Flexibility and mobility aren’t just for athletes or yogis—they are
          essential for everyone. Whether you want to improve posture, prevent
          injuries, or simply move better in daily life, stretching plays a
          crucial role in keeping your muscles and joints healthy.
        </p>

        {/* Key Definitions */}
        <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <p className="text-green-400 font-semibold">✔ Flexibility:</p>
          <p className="text-gray-300">Your muscles' ability to lengthen.</p>

          <p className="text-green-400 font-semibold mt-3">✔ Mobility:</p>
          <p className="text-gray-300">
            Your joints' ability to move through their full range of motion.
          </p>
        </div>

        {/* Fact Section */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
          <p className="text-blue-300 font-semibold">🔹 Fact:</p>
          <p className="text-gray-300">
            According to the{" "}
            <span className="font-semibold text-yellow-400">
              American College of Sports Medicine (ACSM)
            </span>
            , regular stretching improves range of motion, enhances athletic
            performance, and reduces injury risk.
          </p>
        </div>

        {/* <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg"> */}
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">
          🧘 Stretching & Mobility Routine
        </h2>

        {stretches.map((stretch, index) => (
          <div
            key={index}
            className="mb-6 p-5 bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-400">
              {stretch.title}
            </h3>
            <p className="text-gray-300 italic">
              🎯 Targets: {stretch.targets}
            </p>

            <div className="mt-2">
              <p className="text-yellow-400 font-semibold">✅ Why It Works:</p>
              <ul className="list-disc list-inside text-gray-300">
                {stretch.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-blue-300 font-semibold">📌 How to Do It:</p>
              <ol className="list-decimal list-inside text-gray-300">
                {stretch.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <p className="mt-3 text-gray-300">
              <span className="font-semibold text-pink-400">📌 Tip:</span>{" "}
              {stretch.tip}
            </p>
          </div>
        ))}

        <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400">
          <p className="text-blue-300 font-semibold">🔥 Final Thoughts:</p>
          <p className="text-gray-300">
            Improving flexibility and mobility takes consistency, but the
            benefits are worth it—you’ll move better, feel stronger, and prevent
            injuries.
          </p>

        {/* Key Takeaways */}
<h3 className="text-xl font-semibold text-green-400 mt-6">🎯 Key Takeaways</h3>
<ul className="mt-3 space-y-2">
  <li className="flex items-center">
  ✔ Stretch daily for best results (even 5-10 minutes helps).
  </li>
  <li className="flex items-center">
  ✔ Hold each stretch for at least 30 seconds—don’t rush.
  </li>
  <li className="flex items-center">
  ✔ Focus on deep breathing to enhance flexibility.
  </li>
  <li className="flex items-center">
  ✔ Combine static (holding) & dynamic (moving) stretches for full mobility benefits.
  </li>
</ul>

{/* Call to Action */}
<p className="mt-6 text-center text-lg font-semibold text-purple-400">
  🔥 Now it’s your turn! Which stretch will you try first?
</p>
</div>

      </div>
      {/* </div>       */}

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
