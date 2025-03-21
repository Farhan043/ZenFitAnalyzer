import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar, Save, ChevronDown, Check, Trash2, Globe, Leaf, Utensils, Heart, Eye, Flame, Drumstick, Egg, Droplet, History
} from "lucide-react";
import { mealsData, getUniqueValues } from "../../assets/meals";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Footer from "../../Components/Footer";
import FloatingButton from "../FloatingButton";

// Initialize chart data with zeros
const initialChartData = [
  { day: "Mon", calories: 0, fats: 0, protein: 0 },
  { day: "Tue", calories: 0, fats: 0, protein: 0 },
  { day: "Wed", calories: 0, fats: 0, protein: 0 },
  { day: "Thu", calories: 0, fats: 0, protein: 0 },
  { day: "Fri", calories: 0, fats: 0, protein: 0 },
  { day: "Sat", calories: 0, fats: 0, protein: 0 },
  { day: "Sun", calories: 0, fats: 0, protein: 0 },
];

const Meal = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDietaryCondition, setSelectedDietaryCondition] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedVegNonVeg, setSelectedVegNonVeg] = useState("");
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [eatenMeals, setEatenMeals] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [chartData, setChartData] = useState(initialChartData);
  const [dailyStats, setDailyStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [mealHistory, setMealHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  // const [meals, setMeals] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const [showAllMeals, setShowAllMeals] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
    setSelectedDate(formattedDate);
    setCurrentDay(date.toLocaleDateString("en-US", { weekday: "long" }));

    // Load meal history from localStorage
    const savedHistory = localStorage.getItem("mealHistory");
    if (savedHistory) {
      setMealHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDeleteMealHistory = (date) => {
    const updatedHistory = { ...mealHistory };
    delete updatedHistory[date];
    setMealHistory(updatedHistory);
    localStorage.setItem("mealHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    // Load saved meals for selected date
    if (selectedDate && mealHistory[selectedDate]) {
      const savedData = mealHistory[selectedDate];
      setEatenMeals(savedData.eatenMeals);
      setDailyStats(savedData.dailyStats);
      setChartData((prevData) => {
        return prevData.map((dayData) => {
          if (
            dayData.day ===
            new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "short",
            })
          ) {
            return {
              ...dayData,
              calories: savedData.dailyStats.calories,
              fats: savedData.dailyStats.fats,
              protein: savedData.dailyStats.protein,
            };
          }
          return dayData;
        });
      });
    } else {
      setEatenMeals({});
      setDailyStats({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      });
    }
  }, [selectedDate]);

  const handleMealEaten = (meal) => {
    const mealId = `${meal.dishName}-${meal.mealType}`;
    setEatenMeals((prev) => {
      const wasEaten = prev[mealId];
      const newEatenMeals = { ...prev, [mealId]: !wasEaten };

      setDailyStats((prev) => ({
        calories: prev.calories + (wasEaten ? -meal.calories : meal.calories),
        protein: prev.protein + (wasEaten ? -meal.protein : meal.protein),
        carbs: prev.carbs + (wasEaten ? -meal.carbs : meal.carbs),
        fats: prev.fats + (wasEaten ? -meal.fat : meal.fat),
      }));

      setUnsavedChanges(true);
      return newEatenMeals;
    });
  };

  const handleSaveChanges = () => {
    const newHistory = {
      ...mealHistory,
      [selectedDate]: {
        eatenMeals,
        dailyStats,
        date: selectedDate,
      },
    };

    setMealHistory(newHistory);
    localStorage.setItem("mealHistory", JSON.stringify(newHistory));

    setChartData((prevData) => {
      return prevData.map((dayData) => {
        if (
          dayData.day ===
          new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "short",
          })
        ) {
          return {
            ...dayData,
            calories: dailyStats.calories,
            fats: dailyStats.fats,
            protein: dailyStats.protein,
          };
        }
        return dayData;
      });
    });
    setUnsavedChanges(false);
  };

  const getFilteredMeals = () => {
    let filteredMeals = [];

    mealsData.forEach((region) => {
      if (!selectedRegion || region.region === selectedRegion) {
        if (
          !selectedDietaryCondition ||
          region.dietaryCondition === selectedDietaryCondition
        ) {
          region.meals.forEach((meal) => {
            if (
              (!selectedMealType || meal.mealType === selectedMealType) &&
              (!selectedVegNonVeg || meal.vegNonVeg === selectedVegNonVeg)
            ) {
              filteredMeals.push({
                ...meal,
                region: region.region,
                dietaryCondition: region.dietaryCondition,
              });
            }
          });
        }
      }
    });

    return filteredMeals;
  };

  const meals = getFilteredMeals();
  const displayedMeals = showAllMeals ? meals : meals.slice(0, 3);

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
    <>
      <div className="p-3 bg-slate-900 min-h-screen">
        {/* //Navbar */}
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

            {isOpen && (
              <div className="bg-gray-900 md:hidden flex flex-col border border-blue-500 text-gray-200 mt-7 p-4 absolute top-16 left-0 w-96 mx-4 my-4 rounded-lg shadow-lg z-50">
                <Link
                  to="/home"
                  className="py-2 px-4 mt-2 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/meal"
                  className="py-2 px-4 mt-2 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                >
                  Meal
                </Link>
                <Link
                  to="/workout"
                  className="py-2 mt-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                >
                  Workout
                </Link>
                <Link
                  to="/profile"
                  className="py-2 mt-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                >
                  Profile
                </Link>

                <div className="flex flex-col mt-3">
                  <button className="py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded-md transition duration-200">
                    Advice
                  </button>
                  <div className="ml-4 space-y-2 mt-2">
                    <Link
                      to="/fitness"
                      className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                    >
                      Fitness
                    </Link>
                    <Link
                      to="/nutrition"
                      className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                    >
                      Nutrition
                    </Link>
                    <Link
                      to="/selfcare"
                      className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                    >
                      Self-Care
                    </Link>
                    <Link
                      to="/wellness"
                      className="block py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition duration-200"
                    >
                      Wellness
                    </Link>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 mt-4 bg-gray-900 hover:bg-gray-800 rounded-md text-blue-400 text-lg w-full transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-screen bg-black bg-opacity-0 pb-20">
          {/* //Date */}
          <div className="">
            <settings />
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex justify-self-end items-center ">
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="flex items-center text-gray-100">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm">
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
            {/* Nutrition Chart */}
            <div className="bg-blue-900 bg-opacity-50 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">MealNutrition</h2>
                <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
                  Weekly
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="fats"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="protein"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-white text-center">
                Filter Meals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className=" text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" /> Region
                  </label>
                  <select
                    className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg appearance-none cursor-pointer transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">All Regions</option>
                    {getUniqueValues("region").map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-400" /> Dietary
                    Condition
                  </label>
                  <select
                    className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg appearance-none cursor-pointer transition duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    value={selectedDietaryCondition}
                    onChange={(e) =>
                      setSelectedDietaryCondition(e.target.value)
                    }
                  >
                    <option value="">All Dietary Conditions</option>
                    {getUniqueValues("dietaryCondition").map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-yellow-400" /> Meal Type
                  </label>
                  <select
                    className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg appearance-none cursor-pointer transition duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value)}
                  >
                    <option value="">All Meal Types</option>
                    {getUniqueValues("mealType").map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" /> Preference
                  </label>
                  <select
                    className="w-full p-3 bg-gray-900 text-gray-200 rounded-lg appearance-none cursor-pointer transition duration-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={selectedVegNonVeg}
                    onChange={(e) => setSelectedVegNonVeg(e.target.value)}
                  >
                    <option value="">All</option>
                    {getUniqueValues("vegNonVeg").map((pref) => (
                      <option key={pref} value={pref}>
                        {pref}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Meals List */}
            <div className="bg-blue-800 bg-opacity-30 p-6 rounded-xl ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-yellow-400" /> Available
                  Meals
                </h2>
                {unsavedChanges && (
                  <button
                    onClick={handleSaveChanges}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
                  >
                    <Save className="w-5 h-5 mr-2" /> Save Today's Meals
                  </button>
                )}
              </div>

              {displayedMeals.map((meal, index) => {
                const mealId = `${meal.dishName}-${meal.mealType}`;
                const isExpanded = expandedMeal === mealId;
                return (
                  <div
                    key={index}
                    className="bg-gray-900 p-6 rounded-xl shadow-md transition duration-300 border border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg text-white">
                            {meal.dishName}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              meal.vegNonVeg === "Veg"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {meal.vegNonVeg}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">
                          {meal.calories} cal | P: {meal.protein}g | C:{" "}
                          {meal.carbs}g | F: {meal.fat}g
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-100">
                            {meal.mealType}
                          </span>
                          <span className="text-gray-100">•</span>
                          <span className="text-sm text-gray-100">
                            {meal.region}
                          </span>
                          <span className="text-gray-100">•</span>
                          <span className="text-sm text-blue-400">
                            {meal.dietaryCondition}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            setExpandedMeal(isExpanded ? null : mealId)
                          }
                          className="p-2 text-gray-100  rounded-full transition-colors duration-200"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleMealEaten(meal)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            eatenMeals[mealId]
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <Check
                            className={`w-5 h-5 transition-transform duration-300 ${
                              eatenMeals[mealId] ? "transform scale-110" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t animate-fade-in">
                        <p className="text-gray-100 mb-4">{meal.description}</p>

                        <h4 className="font-semibold mb-2">Ingredients:</h4>
                        <ul className="list-disc list-inside mb-4 text-gray-100 space-y-1">
                          {meal.ingredients?.map((ingredient, idx) => (
                            <li
                              key={idx}
                              className="transition-colors duration-200 hover:text-blue-400"
                            >
                              {ingredient}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-semibold mb-2">Steps:</h4>
                        <ol className="list-decimal list-inside text-gray-100 space-y-2">
                          {meal.steps?.map((step, idx) => (
                            <li
                              key={idx}
                              className="transition-colors duration-200 hover:text-blue-400"
                            >
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}

              {meals.length > 3 && (
                <button
                  onClick={() => setShowAllMeals(!showAllMeals)}
                  className="mt-4 flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  <Eye className="w-5 h-5 mr-2" />{" "}
                  {showAllMeals ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Daily Progress */}
            <div className="bg-blue-800 bg-opacity-30 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" /> Today's Progress
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg flex flex-col items-center shadow-md">
                  <Flame className="w-8 h-8 text-purple-500" />
                  <h3 className="text-sm font-medium text-purple-400 mt-2">
                    Calories
                  </h3>
                  <p className="text-2xl font-bold text-purple-500">
                    {dailyStats.calories}
                  </p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg flex flex-col items-center shadow-md">
                  <Drumstick className="w-8 h-8 text-red-500" />
                  <h3 className="text-sm font-medium text-red-400 mt-2">
                    Protein
                  </h3>
                  <p className="text-2xl font-bold text-red-500">
                    {dailyStats.protein}g
                  </p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg flex flex-col items-center shadow-md">
                  <Egg className="w-8 h-8 text-blue-500" />
                  <h3 className="text-sm font-medium text-blue-400 mt-2">
                    Carbs
                  </h3>
                  <p className="text-2xl font-bold text-blue-500">
                    {dailyStats.carbs}g
                  </p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg flex flex-col items-center shadow-md">
                  <Droplet className="w-8 h-8 text-green-500" />
                  <h3 className="text-sm font-medium text-green-400 mt-2">
                    Fats
                  </h3>
                  <p className="text-2xl font-bold text-green-500">
                    {dailyStats.fats}g
                  </p>
                </div>
              </div>
            </div>

            {/* Meal History */}
            <div className="max-w-7xl mx-auto py-6 space-y-8">
              <div className="bg-blue-800  bg-opacity-30 p-6 rounded-xl w-full">
                <h2 className="text-xl font-semibold mb-6 text-center flex items-center gap-2 md:text-left">
                <History className="w-6 h-6 text-yellow-400" /> Meal History
                </h2>
                <div className="space-y-4">
                  {Object.entries(mealHistory)
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, data]) => (
                      <div key={date} className="border rounded-lg p-4 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <h3 className="font-medium text-lg text-center md:text-left">
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-end mt-2 md:mt-0">
                            <span className="text-purple-600">
                              {data.dailyStats.calories} calories
                            </span>
                            <span className="text-red-600">
                              {data.dailyStats.protein}g protein
                            </span>
                            <span className="text-blue-600">
                              {data.dailyStats.carbs}g carbs
                            </span>
                            <span className="text-green-600">
                              {data.dailyStats.fats}g fats
                            </span>
                            <button
                              onClick={() => handleDeleteMealHistory(date)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(data.eatenMeals).map(
                            ([mealId, eaten]) => {
                              if (!eaten) return null;
                              const [dishName] = mealId.split("-");
                              return (
                                <div
                                  key={mealId}
                                  className="flex items-center space-x-2"
                                >
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span>{dishName}</span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
       <Footer/>
       <FloatingButton/>
    </>
  );
};

export default Meal;
