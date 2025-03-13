import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Fit3Article() {
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

      <div className="p-6 max-w-5xl mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-blue-400 text-center">
            How to Improve Your Posture with <br />
            <span className="text-gray-50 text-4xl sm:text-5xl md:text-6xl">
              Simple Daily Exercises
            </span>{" "}
          </h1>
        </div>

        <img
          src="/public/Fitness/fitness3.png"
          alt="posture"
          className="w-96 rounded-lg flex mx-auto items-center shadow-lg mb-6"
        />
        <p className="text-gray-50 leading-relaxed">
          Poor posture is a common problem caused by sedentary lifestyles,
          prolonged screen time, and lack of movement. Over time, bad posture
          can lead to back pain, muscle imbalances, and reduced mobility. The
          good news? You can fix your posture by incorporating simple daily
          exercises that strengthen your core, stretch tight muscles, and
          realign your body.
        </p>

        <p className="text-gray-50 leading-relaxed mt-4">
          <h2 className="text-gray-50 text-2xl font-bold ">Why Good Posture is Important:-</h2>  ✅ Reduces back, neck, and shoulder pain
          <br /> ✅ Prevents spinal misalignment and muscle imbalances <br /> ✅ Boosts
          confidence and appearance <br /> ✅ Enhances breathing and digestion <br /> ✅
          Improves mobility, flexibility, and athletic performance By improving
          your posture, you’ll feel stronger, healthier, and more energetic
          throughout the day!
        </p>

        {/* List of habits with images */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Chin Tucks (For Forward Head Posture)
          </h2>
          <img
            src="/public/Fitness/chin.png"
            alt="Protein food"
            className="w-96 flex mx-auto items-center rounded-md mb-4"
          />
          <p className="text-gray-50">
            🔹 Why it works: Strengthens the neck and corrects "tech neck" caused by looking at screens.
          </p>
          <p className="text-gray-50">
            🔹 How to do it:- <br />
            🔹Sit or stand tall with your shoulders relaxed. <br />
            🔹 Slowly tuck your chin toward your chest without tilting your head.{" "}
            <br />
            🔹 Hold for 5 seconds, then release. <br />
            🔹 Repeat 10-15 times daily.
            <br /> ✅ Tip: Do this while sitting at your desk to prevent neck strain.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              2.  Shoulder Blade Squeeze (For Rounded Shoulders)
            </h2>
            <img
              src="/public/Fitness/squeeze.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Strengthens the upper back and improves shoulder alignment.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Sit or stand with your back straight. <br />
                      2. Pull your shoulder blades together as if holding a pencil between them.{" "}
                      <br />
                      3. Hold for 5-10 seconds, then relax. <br />
                      4. Repeat 10 times, twice daily. <br />
              ✅ Tip: Keep your shoulders down to avoid tension in the neck.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              3.  Wall Angels (For Upper Back & Shoulder Mobility)
            </h2>
            <img
              src="/public/Fitness/wall.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹Why it works: Opens up the chest, strengthens the back, and improves posture.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Stand with your back against a wall, feet 6 inches away.<br />
                      2. Keep your lower back and head against the wall.{" "}
                      <br />
                      3. Raise your arms to a goalpost position (90-degree angles). <br />
                      4. Slowly raise and lower your arms like making a snow angel. <br />
                      5. Repeat 10 times daily. <br />
                      ✅ Tip: If your lower back arches off the wall, engage your core to maintain contact.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              4.  Cat-Cow Stretch (For Spinal Mobility)
            </h2>
            <img
              src="/public/Fitness/catCow.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹  Why it works: Improves flexibility and mobility in the spine while relieving tension.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Get on all fours, hands under shoulders, knees under hips.<br />
                      2. Cow Pose: Inhale, arch your back, lift your chest, and look up.{" "}
                      <br />
                      3. Cat Pose: Exhale, round your back, tuck your chin, and draw your belly in. <br />
                      4. SAlternate 10 times, moving with your breath. <br />
                      ✅ Tip: Great for desk workers who experience lower back stiffness.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              5. Plank (For Core & Postural Stability)
            </h2>
            <img
              src="/public/Fitness/plank.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Strengthens the core, shoulders, and lower back, helping to maintain an upright posture.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Get into a forearm plank position with elbows under shoulders.<br />
                      2. Engage your core and glutes to keep your body in a straight line.{" "}
                      <br />
                      3. Hold for 30-60 seconds (or as long as possible). <br />
                      4. Repeat 2-3 times daily. <br />
                      ✅ Tip: Avoid arching your back or dropping your hips—keep your spine neutral.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              6. Doorway Chest Stretch (For Tight Chest Muscles)
            </h2>
            <img
              src="/public/Fitness/chest.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Opens up the chest and counters the effects of slouching.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Stand in a doorway with your hands on the frame at shoulder height.<br />
                      2. Step one foot forward and gently lean until you feel a stretch in your chest.{" "}
                      <br />
                      3. Hold for 20-30 seconds, then switch sides. <br />
                      4. Repeat 2-3 times daily. <br />
                      ✅ Tip: Avoid arching your lower back—keep your core engaged.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              7. Glute Bridge (For Lower Back & Core Support)
            </h2>
            <img
              src="/public/Fitness/muscle.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹  Why it works: Strengthens the glutes and lower back, which helps support the spine and improve posture.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Lie on your back with knees bent, feet flat on the floor.<br />
                      2. Press through your heels and lift your hips toward the ceiling.{" "}
                      <br />
                      3. Squeeze your glutes at the top and hold for 3-5 seconds. <br />
                      4.Lower down slowly and repeat 15 times. <br />
                      ✅ Tip: Keep your knees in line with your hips to prevent strain.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              8. Standing Posture Check (For Mindful Awareness)
            </h2>
            <img
              src="/public/Fitness/straight.png"
              alt="Protein food"
              className="w-96 flex mx-auto items-center rounded-md mb-4"
            />
            <p className="text-gray-50">
              🔹 Why it works: Helps you practice good posture throughout the day.
            </p>
            <p className="text-gray-50">
              🔹 How to do it:- <br />
              <div className="ml-7">
                      1. Stand with feet hip-width apart, weight evenly distributed.<br />
                      2. Engage your core, roll your shoulders back, and keep your head neutral.{" "}
                      <br />
                      3.Hold for 30 seconds, then repeat as often as needed. <br />
                      ✅ Tip: Use mirrors or posture reminders to stay aware of your alignment.
                      </div>
            </p>
          </div>

          <div className="mt-8">
            <p className="text-blue-200 text-2xl">
            Improving your posture doesn’t require hours in the gym—just a few minutes of daily exercises and mindful habits can make a huge difference.

By consistently strengthening key muscles and stretching tight areas, you’ll reduce pain, improve mobility, and feel more confident in your movements.
            </p>
            <p className="text-blue-400 text-2xl mt-5">
            🚀 Start today! Which exercise will you try first?
            </p>
          </div>
        </div>

        {/* Add more sections as needed */}

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
