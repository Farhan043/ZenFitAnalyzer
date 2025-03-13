import {
  CheckCircle,
  Sun,
  Droplet,
  Utensils,
  List,
  Smartphone,
  Lightbulb,
  Music,
  Moon,
  BedDouble,
  Brain,
  Dumbbell,
  CheckCircle2,
   Users, HeartPulse , RefreshCw,  X,  XCircle,   Leaf
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaTint, FaRecycle, FaPumpSoap } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Selfcare7() {
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(false);
  

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

  const skincareRef = useRef(null);

  const scrollToSkincare = () => {
    skincareRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hydrationTips = [
    { icon: <Droplet />, title: "Drink Water Regularly", description: "Spread your intake throughout the day for consistent hydration." },
    { icon: <Leaf />, title: "Eat Water-Rich Foods", description: "Include hydrating foods like cucumbers, oranges, and watermelon." },
    { icon: <Sun />, title: "Use Hydrating Skincare Products", description: "Choose moisturizers with hyaluronic acid to lock in hydration." },
  ];
  
  const hydrationFoods = [
    { name: "Cucumber", image: "/public/Selfcare/cucumber.png" },
    { name: "Orange", image: "/public/Selfcare/orange.png" },
    { name: "Watermelon", image: "/public/Selfcare/watermelon.png" },
    { name: "Avocado", image: "/public/Selfcare/avocado.png" },
    { name: "Strawberries", image: "/public/Selfcare/strawberries.png" },
    { name: "Pineapple", image: "/public/Selfcare/pineapple.png" },
    { name: "Banana", image: "/public/Selfcare/banana.png" },
    { name: "Mango", image: "/public/Selfcare/mango.png" },
    { name: "Kiwi", image: "/public/Selfcare/kiwi.png" },
    { name: "Papaya", image: "/public/Selfcare/papaya.png" },
  ];
  
  const donts = [
    { icon: <XCircle />, text: "Avoid excessive caffeine & alcohol." },
    { icon: <XCircle />, text: "Reduce intake of salty and processed foods." },
    { icon: <XCircle />, text: "Don’t over-exfoliate your skin." },
  ];

  const skincareProducts = [
    {
      name: " Paula’s Choice Skin Balancing Cleanser",
      skinType: "✔ Great for Oily & Combination Skin",
      keyIngredients:  "Aloe Vera, Glycerin, Panthenol",
      whyUse: "✅ Controls excess oil while maintaining moisture balance , ✅ Removes dirt, oil, and makeup without over-drying,✅ Gentle formula that soothes the skin",
      comparison: "🔹 Vs. CeraVe Foaming Cleanser: Paula’s Choice provides a more lightweight feel and leaves skin softer,🔹 Vs. La Roche-Posay Effaclar Gel: Less drying and more suitable for combination skin",
      howToUse: "💧 Wet your face with lukewarm water,💆‍♀️ Apply a small amount and gently massage onto the skin,🚿 Rinse thoroughly and pat dry",
      bestTime: " Morning & Night",
      image: "/public/Selfcare/paula.png",
    },
    {
      name: "Eucerin DermatoClean Mild Cleansing Gel",
      skinType: "Sensitive, Normal to Dry Skin",
      keyIngredients:  "Hyaluronic Acid, APG Complex, Panthenol",
      whyUse: "✅ Ultra-mild formula for sensitive skin,✅ Hydrating & non-irritating while cleansing,✅ Free from fragrance  alcohol, and parabens",
      comparison: "🔹 Vs. Cetaphil Gentle Cleanser: Eucerin has a slightly deeper cleansing effect while remaining mild,🔹 Vs. Bioderma Sensibio H2O: More hydrating and does not require a cotton pad",
      howToUse: "💧 Apply to damp skin and gently lather,🧴 Massage in circular motions,🚿 Rinse thoroughly",
      bestTime: " Morning & Night",
      image: "/public/Selfcare/eucerin.png",
    },
    {
      name: " Kiehl’s Ultra Facial Cleanser",
      skinType: "Normal, Dry, Combination Skin",
      keyIngredients:  "Squalane, Apricot Kernel Oil, Avocado Oil, Vitamin E",
      whyUse: "✅ Provides a deep cleanse without stripping moisture,✅ pH-balanced formula maintains skin’s natural barrier,✅ Removes dirt, oil, and makeup while keeping skin hydrated",
      comparison: "🔹 Vs. CeraVe Hydrating Cleanser: Kiehl’s provides a more thorough cleanse while keeping skin moisturized,🔹 Vs. La Roche-Posay Toleriane Hydrating Cleanser: Kiehl’s has a richer lather and includes nourishing oils",
      howToUse: "💧 Wet your face with lukewarm water,🧴 Take a small amount and massage onto damp skin,🚿 Rinse thoroughly with water and pat dry",
      bestTime: " Morning & Night",
      image: "/public/Selfcare/ultra.png",
    },
    {
      name: "CeraVe Hydrating Facial Cleanser",
      image: "public/Selfcare/facewash-oily.png",
      skinType: "Dry & Sensitive Skin",
      keyIngredients: 'Hyaluronic Acid, Ceramides',
      whyUse: "Provides intense hydration while cleansing, maintains skin barrier with ceramides and hyaluronic acid.",
      comparison: "Unlike foaming cleansers, it doesn’t strip moisture and is dermatologist-recommended for dry skin.",
      howToUse: "Massage onto wet skin in circular motions, then rinse with lukewarm water.",
      bestTime: "Morning and night for optimal hydration."
    },
    {
      name: "Neutrogena Oil-Free Acne Wash",
      image: "/public/Selfcare/oil.png",
      skinType: "Oily & Acne-Prone Skin",
      keyIngredients: 'Hyaluronic Acid',
      whyUse: "Contains salicylic acid to deeply cleanse pores and reduce breakouts.",
      comparison: "More effective than cream-based cleansers for oil control, without over-drying like alcohol-based cleansers.",
      howToUse: "Apply a dime-sized amount, massage gently, rinse thoroughly.",
      bestTime: "Morning and evening to control excess oil."
    },
    {
      name: "La Roche-Posay Toleriane Purifying Foaming Cleanser",
      image: "/public/Selfcare/La.png",
      skinType: "Combination & Normal Skin",
      keyIngredients: 'Salicylic Acid, Zinc',
      whyUse: "Balances oil production while keeping skin hydrated, enriched with niacinamide.",
      comparison: "Unlike harsh soaps, it maintains skin’s natural pH balance.",
      howToUse: "Lather with water, apply to face, then rinse well.",
      bestTime: "Twice daily for best results."
    },
    {
      name: "The Ordinary Squalane Cleanser",
      skinType: "All Skin Types",
      keyIngredients: "Squalane, Glycerin",
      whyUse: "Gently removes makeup and dirt without stripping moisture.",
      comparison: "Better for double cleansing compared to foaming cleansers.",
      howToUse: "Rub in palms until oil-like, massage onto dry face, rinse.",
      bestTime: "Night",
      image: "/public/Selfcare/ordinary.png",
    },
    {
      name: "Innisfree Green Tea Foam Cleanser",
      skinType: "Combination & Oily Skin",
      keyIngredients: "Green Tea Extract, Amino Acids",
      whyUse: " Hydrates while controlling excess oil, soothes inflammation.",
      comparison: " More soothing than The Face Shop Rice Water Cleanser",
      howToUse: "Lather onto damp face, massage, and rinse",
      bestTime: " Morning & After workouts",
      image: "/public/Selfcare/greentea.png",
    },
    {
      name: " Aveeno Calm + Restore Nourishing Oat Cleanser",
      skinType: " Sensitive & Dry Skin",
      keyIngredients:  "Oat Extract, Feverfew",
      whyUse: " Soothes irritated skin & restores moisture barrier.",
      comparison: " More calming than Cetaphil Daily Cleanser",
      howToUse: "Apply to wet skin, gently rub, and rinse",
      bestTime: "  Morning & Night",
      image: "/public/Selfcare/calm.png",
    },
    {
      name: " Youth to the People Superfood Antioxidant Cleanser",
      skinType: "Normal, Oily, Combination Skin",
      keyIngredients:  " Kale, Spinach, Green Tea",
      whyUse: "Packed with antioxidants for skin health, nourishes skin barrier.",
      comparison: "  More natural than La Roche-Posay Toleriane Cleanser",
      howToUse: "Apply to damp skin, massage, and rinse",
      bestTime: " Morning & After sun exposure",
      image: "/public/Selfcare/youth.png",
    },
    {
      name: "Cetaphil Gentle Skin Cleanser",
      skinType: "Dry & Sensitive Skin",
      keyIngredients:  " Glycerin, Niacinamide",
      whyUse: "Non-irritating, fragrance-free formula, maintains skin’s natural pH.",
      comparison: "Gentler than Neutrogena Daily Cleanser",
      howToUse: "Apply to skin, wipe or rinse off.",
      bestTime: " Morning & Night",
      image: "/public/Selfcare/cetaphil.png",
    },
   
    {
      name: "Simple Kind to Skin Refreshing Facial Wash",
      skinType: " Sensitive Skin",
      keyIngredients:  "Pro-Vitamin B5, Bisabolol",
      whyUse: " Gentle cleanse with no harsh chemicals",
      comparison: " Milder than Nivea Face Wash",
      howToUse: "Lather, massage, and rinse",
      bestTime: " Morning & Night",
      image: "/public/Selfcare/simple.png",
    },

  ];


  const products = [
    {
      name: "Hydrating Serum",
      description: "Instantly plumps skin with Hyaluronic Acid.",
      image: "/public/Selfcare/vitalc.png",
    },
    {
      name: "Moisturizing Cream",
      description: "Locks in hydration with Ceramides & Aloe.",
      image: "/public/Selfcare/cream.png",
    },
    {
      name: "Overnight Mask",
      description: "Repairs skin barrier while you sleep.",
      image: "/public/Selfcare/mask.png",
    },
    {
      name: "Gentle Cleanser",
      description: "Won’t strip natural moisture, cream & gel-based.",
      image: "/public/Selfcare/cleanser.png",
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


      <div className="bg-slate-900 mt-6 text-gray-800 p-6 rounded-xl shadow-lg max-w-8xl mx-auto">
      <motion.h1 
        className="text-2xl font-bold text-center text-blue-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💧 Hydration & Skincare: The Glow-Up Combo
      </motion.h1>
      
      <motion.p 
        className="text-gray-200 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        How Staying Hydrated Improves Skin Health and Overall Wellness
      </motion.p>
      
      <motion.img 
        src="/public/Selfcare/Selfcare7.png" 
        alt="Hydrated Skin" 
        className="w-80 mx-auto flex items-center rounded-lg mb-6 " 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-100 leading-relaxed">
          Hydration is one of the most underrated but powerful tools for achieving glowing skin and overall well-being. While many people focus on external skincare products, the real secret to a healthy, radiant complexion starts from within.
        </p>
        
        <p className="text-gray-100 leading-relaxed">
          Drinking enough water not only supports skin hydration but also plays a critical role in detoxification, nutrient transport, and maintaining skin elasticity. Proper hydration helps flush out toxins, reduce breakouts, and keep your skin plump and youthful.
        </p>
      </motion.div>
      
      <motion.div className="mt-6 text-center">
        <button onClick={scrollToSkincare}
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Stay Hydrated & Glow ✨
        </button>
      </motion.div>



      <h1 className="text-3xl font-bold mt-9 text-center mb-5 text-blue-600">💧 Why Hydration Matters for Skin Health</h1>
      <p className="text-gray-200 text-center">
        When your body lacks hydration, your skin suffers! Dehydration can lead to dryness, wrinkles, and irritation.
      </p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div>
              <div className="text-gray-100 mt-5">💦 Internal Hydration (Water Intake)</div>
              <p className="text-gray-200">
                Drinking water supports **nutrient delivery**, improves circulation, and flushes out toxins.
              </p>
            </div>
          </div>
          <div>
            <div>
              <div className="text-gray-100 mt-5">🌿 External Hydration (Skincare)</div>
              <p className="text-gray-200">
                Hydrating serums, moisturizers, and gentle cleansers help lock in moisture and repair the skin barrier.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center mt-5">
      <button  className="bg-blue-500 text-white px-6 py-4 rounded-lg" onClick={() => setShowProducts(!showProducts)}>
        💦 View Hydrating Skincare Products
      </button>
      </div>
      {showProducts && (
        <motion.div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {products.map((product, index) => (
            <div key={index} className="p-4 shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} width={150} height={150} className="mx-auto" />
              <div className="mt-2 text-blue-400 text-lg font-semibold">{product.name}</div>
              <p className="text-gray-100">{product.description}</p>
            </div>
          ))}
        </motion.div>
      )}

<h2 className="text-2xl font-bold mt-9 text-center text-blue-600 mb-6">
        Scientific Insights on Hydration & Skin
      </h2>
      
      <div className="grid gap-6">
        {/* Skin Elasticity & Aging */}
        <div className="shadow-lg p-5 border-l-4 border-blue-500">
          <div className="flex items-start gap-4">
            <FaTint className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-blue-400">Skin Elasticity & Aging</h3>
              <p className="text-gray-300">
                Collagen, the protein responsible for firm and youthful skin, depends on hydration. 
                Dehydrated skin appears wrinkled and saggy, while well-hydrated skin maintains plumpness.
              </p>
              <span className="text-sm text-gray-500">Source: DARWYNHEALTH.COM</span>
            </div>
          </div>
        </div>

        {/* Detoxification & Clear Skin */}
        <div className="shadow-lg p-5 border-l-4 border-green-500">
          <div className="flex items-start gap-4">
            <FaRecycle className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-blue-400">Detoxification & Clear Skin</h3>
              <p className="text-gray-300">
                Water flushes toxins from the body, helping reduce acne breakouts and promoting a natural, healthy glow.
              </p>
              <span className="text-sm text-gray-500">Source: CREDO.HEALTH</span>
            </div>
          </div>
        </div>

        {/* Internal vs. External Hydration */}
        <div className="shadow-lg p-5 border-l-4 border-purple-500">
          <div className="flex items-start gap-4">
            <FaPumpSoap className="text-purple-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-blue-400">Internal vs. External Hydration</h3>
              <p className="text-gray-300">
                While drinking water is essential, applying moisturizers with glycerin and ceramides locks in hydration 
                and strengthens the skin barrier.
              </p>
              <span className="text-sm text-gray-500">Source: CREDO.HEALTH</span>
            </div>
          </div>
        </div>
      </div>


      <h1 className="text-3xl font-bold text-blue-400 mt-9 text-center mb-3">How Much Water Should You Drink for Healthy Skin?</h1>
      <p className="text-center text-gray-100 text-lg mb-6">The recommended intake is about 2 liters per day, but it varies based on activity, climate, and health conditions.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {hydrationTips.map((tip, index) => (
          <div key={index} className="p-4 text-center shadow-lg">
            <div className="flex justify-center text-blue-500 text-4xl mb-2">{tip.icon}</div>
            <h3 className="font-semibold text-blue-400 text-lg">{tip.title}</h3>
            <p className="text-sm text-gray-100">{tip.description}</p>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold text-blue-400 text-center mb-4">
  Hydrating Foods
</h2>

<div className="flex flex-wrap justify-center gap-4 mb-8">
  {hydrationFoods.map((food, index) => (
    <div key={index} className="text-center w-16 sm:w-28 md:w-32 lg:w-36">
      <img
        src={food.image}
        width={100}
        height={100}
        alt={food.name}
        className="w-full h-auto rounded-full shadow-md"
      />
      <p className="mt-2 font-semibold text-gray-200 text-sm sm:text-base">
        {food.name}
      </p>
    </div>
  ))}
</div>


      <h2 className="text-2xl font-bold text-blue-400 text-center mb-4">What to Avoid</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {donts.map((item, index) => (
          <div key={index} className="p-4 text-center shadow-lg bg-red-100">
            <div className="flex justify-center text-red-600 text-4xl mb-2">{item.icon}</div>
            <p className="text-sm text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
  
      <div ref={skincareRef} className="mt-12 text-ray-100">
        <h2 className="text-4xl  text-center text-blue-400 font-semibold mb-12">Best Face Washes for Your Skin Type</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skincareProducts.map((product, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <div className="p-4 shadow-md text-gray-100 border rounded-xl">
                <img src={product.image} alt={product.name} className="w-full rounded-lg mb-4" />
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-200 text-sm">{product.skinType}</p>
                  <p><strong>Key Ingredients:</strong> {product.keyIngredients}</p>
                  <p className="mt-2"><strong>Why Use:</strong> {product.whyUse}</p>
                  <p className="mt-2"><strong>Comparison:</strong> {product.comparison}</p>
                  <p className="mt-2"><strong>How to Use:</strong> {product.howToUse}</p>
                  <p className="mt-2"><strong>Best Time to Use:</strong> {product.bestTime}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  

      <h2 className="text-3xl font-bold text-center mt-12 text-blue-700 mb-4">✨ Hydration & Glow: The Ultimate Takeaway ✨</h2>
      
      <p className="text-lg text-center text-gray-300 mb-6">
        Hydration plays a key role in both skin health and overall wellness. While drinking water supports
        <strong> internal hydration</strong>, pairing it with a proper <strong>skincare routine</strong> ensures your skin
        stays <span className="text-blue-600">soft, youthful, and glowing</span>.
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-600 mb-3">🌿 The Real Glow-Up Secret</h3>
        <ul className="list-disc pl-5 text-lg">
          <li><strong>Drink Enough Water</strong> – Keep your body & skin hydrated throughout the day.</li>
          <li><strong>Use Hydrating Skincare</strong> – Choose products with <span className="text-blue-500">hyaluronic acid & ceramides</span>.</li>
          <li><strong>Eat Water-Rich Foods</strong> – Add cucumbers, oranges, and watermelon to your diet.</li>
          <li><strong>Protect Your Skin Barrier</strong> – Use sunscreen & avoid excessive exfoliation.</li>
        </ul>
        
        <p className="mt-4 text-lg text-red-500">🛑 Avoid dehydration triggers like excess caffeine, alcohol, and salty foods.</p>
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
      
        <button  onClick={scrollToSkincare} className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition">
          🛍️ Explore Hydrating Products
        </button>
      </div>


        <div className="mt-6">
          <Link
            to="/home"
            className="text-blue-100 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
  </div>
  </div>

  );
}

// Reusable div Component

