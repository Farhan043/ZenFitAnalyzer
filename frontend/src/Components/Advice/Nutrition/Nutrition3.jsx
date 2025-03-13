import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import {
  FaLeaf,
  FaAppleAlt,
  FaFish,
  FaLemon,
  FaSeedling,
  FaHeartbeat,
} from "react-icons/fa";
import { MdLocalDrink, MdOutlineDarkMode } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { CheckCircle, Info ,  Leaf, UtensilsCrossed, Lightbulb} from "lucide-react";

export default function Nutrition3() {
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

  const superfoods = [
    {
      title: "Berries (Blueberries, Acai, Strawberries, Goji)",
      icon: "🍓",
      why: "Packed with antioxidants, vitamin C, and fiber",
      benefits: [
        "Strengthens immune response",
        "Reduces inflammation",
        "Boosts brain function & energy"
      ],
      howToEat: "Add to smoothies, yogurt, or oatmeal."
    },
    {
      title: "Leafy Greens (Spinach, Kale, Swiss Chard)",
      icon: "🥗",
      why: "Loaded with iron, vitamin C, and folate",
      benefits: [
        "Boosts red blood cell production (prevents fatigue)",
        "Enhances immune function",
        "Supports detoxification"
      ],
      howToEat: "Blend into smoothies, make salads, or sauté with garlic."
    },

    {
        title: " Nuts & Seeds (Almonds, Chia, Flaxseeds, Walnuts)",
        icon: "🥜",
        why: "High in healthy fats, protein, and magnesium",
        benefits: [
          " Provides long-lasting energy",
          "Supports brain & heart health",
          "Strengthens immune response with omega-3s"
        ],
        howToEat: " Sprinkle on oatmeal, yogurt, or snack on a handful"
      },
      {
        title: "  Citrus Fruits (Oranges, Lemons, Grapefruit)",
        icon: "🍊",
        why: "Rich in vitamin C & antioxidants",
        benefits: [
          "Strengthens immune defenses",
          "Fights colds & flu",
          "Increases iron absorption (important for energy levels)"
        ],
        howToEat: "Drink fresh orange juice or add lemon to water."
      },
      {
        title: "Fatty Fish (Salmon, Mackerel, Sardines)",
        icon: "🐟",
        why: " Loaded with omega-3 fatty acids, protein, and vitamin D",
        benefits: [
          "Reduces inflammation (important for immunity)",
          "Improves brain function & energy levels",
          "Supports heart health"
        ],
        howToEat: "Grill or bake for a healthy protein source."
      },
      {
        title: " Garlic & Ginger",
        icon: "🧄",
        why: "Natural antibacterial & antiviral properties",
        benefits: [
          " Strengthens immune response",
          "Reduces inflammation & risk of infections",
          " Improves digestion & circulation"
        ],
        howToEat: "Add to soups, teas, or stir-fries."
      },
       {
        title: " Quinoa",
        icon: "🍚",
        why: "A complete protein with all 9 essential amino acids",
        benefits: [
          " Provides long-lasting energy",
          " High in fiber (supports digestion)",
          "Packed with magnesium (helps reduce fatigue)"
        ],
        howToEat: "Use as a base for grain bowls or salads."
      },
      {
        title: " Green Tea & Matcha",
        icon: "🍵",
        why: "High in antioxidants & L-theanine",
        benefits: [
          "  Boosts energy & focus without the crash of coffee",
          "  Supports metabolism & fat burning",
          " Strengthens immune function"
        ],
        howToEat: "Brew hot or iced green tea, or add matcha powder to smoothies."
      },
      {
        title: "Greek Yogurt & Kefir",
        icon: "🥄",
        why: " Rich in probiotics & protein",
        benefits: [
          "  Supports gut health (which boosts immunity)",
          "   Provides energy & muscle recovery",
          "Contains calcium & vitamin B12 for overall health"
        ],
        howToEat: "Enjoy plain or mix with honey & fruit."
      },
      {
        title: "Dark Chocolate (70% Cocoa & Above)",
        icon: "🍫",
        why: " High in antioxidants & iron",
        benefits: [
          " Increases blood flow & brain function",
          "   Boosts mood & reduces stress",
          "Provides a quick, natural energy boost"
        ],
        howToEat: "Eat a small piece (1-2 squares) as a treat."
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

      <h1 className="text-3xl font-bold text-center mt-5 mb-6 text-gray-400">
        Best Superfoods to Boost Energy & Immunity
      </h1>
      <p className="text-gray-100 text-center mb-8">
        These nutrient-dense superfoods will help keep you energized and
        strengthen your immune system.
      </p>

      <img
        src="/public/Nutrition/nutrition3.png"
        alt="Workout"
        className="w-96 rounded-lg mt-5 flex mx-auto items-center shadow-lg mb-6"
      />

      <div className=" p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-yellow-400">
          This guide will cover:
        </h3>
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li>✔ The best superfoods for energy & immunity</li>
          <li>✔ How they work in the body</li>
          <li>✔ Easy ways to include them in your diet</li>
        </ul>
      </div>

      <h2 className="text-2xl text-blue-400 ml-3 font-bold mb-3">
        Why Superfoods Matter for Energy & Immunity
      </h2>
      <p className="text-gray-300 ml-3 mb-4">
        Superfoods contain high levels of nutrients that support:
        <ul className="list-disc list-inside text-gray-300 mt-2">
          <li> ✔ Energy production (by fueling cells & metabolism)</li>
          <li>
            ✔ Immune system function (by fighting infections & inflammation)
          </li>
          <li>✔ Overall health & disease prevention</li>
        </ul>
      </p>
      <p className="text-red-400">
        📌 Fact: Studies show that diets rich in superfoods help reduce the risk
        of chronic diseases, fatigue, and immune deficiencies (Harvard T.H. Chan
        School of Public Health).
      </p>

      <div className="p-6 mt-5 max-w-8xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-400 text-center mb-6">Top 10 Superfoods for Energy & Immunity</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {superfoods.map((food, index) => (
          <div key={index} className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">{food.icon} {food.title}</h3>
              <p className="text-sm text-gray-300 mt-2">🔹 <strong>Why They’re Super:</strong> {food.why}</p>
              <ul className="mt-2 space-y-1">
                {food.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} /> {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-yellow-400"><Info size={16} className="inline-block mr-1" /> <strong>How to Eat:</strong> {food.howToEat}</p>
            </div>
          </div>
        ))}
      </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">🥗 How to Include These Superfoods in Your Daily Diet</h2>
      <div className="grid gap-4">
        {/* Breakfast */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="text-yellow-400" /> Breakfast
            </h3>
            <p><CheckCircle className="inline text-green-400" /> Greek yogurt with blueberries, chia seeds, & walnuts</p>
            <p><CheckCircle className="inline text-green-400" /> Green tea</p>
          </div>
        </div>

        {/* Lunch */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="text-yellow-400" /> Lunch
            </h3>
            <p><CheckCircle className="inline text-green-400" /> Quinoa bowl with spinach, salmon, & avocado</p>
            <p><CheckCircle className="inline text-green-400" /> Citrus-infused water</p>
          </div>
        </div>

        {/* Snack */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="text-yellow-400" /> Snack
            </h3>
            <p><CheckCircle className="inline text-green-400" /> A handful of almonds & dark chocolate</p>
          </div>
        </div>

        {/* Dinner */}
        <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UtensilsCrossed className="text-yellow-400" /> Dinner
            </h3>
            <p><CheckCircle className="inline text-green-400" /> Grilled chicken with garlic-roasted sweet potatoes & steamed kale</p>
          </div>
        </div>

        {/* Tip Section */}
        <div className="bg-blue-900 border border-blue-700 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-yellow-300" />
            <p className="text-white">📌 <strong>Tip:</strong> Start by adding 1-2 superfoods per meal—small changes make a big difference!</p>
          </div>
        </div>


      <h2 className="text-2xl font-bold text-center mb-4">
        Superfoods for a Supercharged Life
      </h2>
      <p className="text-lg text-gray-300 text-center mb-6">
        Balancing energy & immunity starts with nutrient-dense foods. These superfoods provide vitamins, minerals, and antioxidants to keep you strong & energized.
      </p>
      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">🎯 Key Takeaways:</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Berries & citrus for immune-boosting vitamin C
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Leafy greens & quinoa for long-lasting energy
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Nuts, seeds, & fatty fish for brain & heart health
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-green-400" /> Garlic & ginger to fight infections naturally
          </li>
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg mt-4 text-center">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <div className="text-red-500" /> Challenge:
        </h3>
        <p className="mt-2 text-gray-300">
          Try adding at least <span className="text-yellow-400 font-semibold">3 superfoods</span> to your meals every day this week!
        </p>
      </div>
      <p className="text-center mt-6 text-lg text-gray-300">
        💬 Which superfood do you eat daily?
      </p>


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
