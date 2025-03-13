

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
import { Calendar, Save, ChevronDown, Check, Filter } from "lucide-react";
import { mealsData, getUniqueValues } from "../../assets/meals";
// import settings from "../../Pages/Theme/Settings";
import { useNavigate } from "react-router-dom";
import axios from "axios";
 

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
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();



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


  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Retrieve token from storage
  //       const response = await axios.get('http://localhost:4000/api', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setMeals(response.data);
  //     } catch (err) {
  //       console.error('Failed to fetch meals', err);
  //     }
  //   };
  //   fetchMeals();
  // }, []);
  

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


  return (
    <div className="min-h-screen bg-black bg-opacity-0 pb-20">
      <div className="">
        <settings />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center ">
            <i
              className="ri-arrow-left-s-line text-4xl cursor-pointer"
              onClick={() => navigate("/home")}
            ></i>
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
        <div className="bg-black bg-opacity-20 p-6 rounded-xl">
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
        <div className="bg-black bg-opacity-20 p-6 rounded-xl ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Region
              </label>
              <select
                className="w-full p-3 bg-black bg-opacity-20 rounded-lg appearance-none cursor-pointer transition-colors duration-200  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">AllRegions</option>
                {getUniqueValues("region").map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                DietaryCondition
              </label>
              <select
                className="w-full p-3 bg-black bg-opacity-20 rounded-lg appearance-none cursor-pointer transition-colors duration-200 hover: focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedDietaryCondition}
                onChange={(e) => setSelectedDietaryCondition(e.target.value)}
              >
                <option value="">AllDietaryConditions</option>
                {getUniqueValues("dietaryCondition").map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
               MealType
              </label>
              <select
                className="w-full p-3 bg-black bg-opacity-20 rounded-lg appearance-none cursor-pointer transition-colors duration-200 hover: focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
              >
                <option value="">AllMealTypes</option>
                {getUniqueValues("mealType").map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
              Preference
              </label>
              <select
                className="w-full p-3 bg-black bg-opacity-20 rounded-lg appearance-none cursor-pointer transition-colors duration-200 hover: focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Available Meals</h2>
            {unsavedChanges && (
              <button
                onClick={handleSaveChanges}
                className="flex items-center px-4 py-2 bg-black bg-opacity-20 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Today's Meals
              </button>
            )}
          </div>

          {getFilteredMeals().map((meal, index) => {
            const mealId = `${meal.dishName}-${meal.mealType}`;
            const isExpanded = expandedMeal === mealId;

            return (
              <div
                key={index}
                className="bg-black bg-opacity-20 rounded-xl  transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {meal.dishName}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            meal.vegNonVeg === "Veg"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {meal.vegNonVeg}
                        </span>
                      </div>
                      <p className="text-sm text-gray-100">
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
                        className="p-2 text-gray-100 hover:bg-gray-100 rounded-full transition-colors duration-200"
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
                            className="transition-colors duration-200 hover:text-gray-900"
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
                            className="transition-colors duration-200 hover:text-gray-900"
                          >
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily Progress */}
        <div className="bg-black bg-opacity-20 p-6 rounded-xl ">
          <h2 className="text-xl font-semibold mb-6">Today's Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-black bg-opacity-50 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600 mb-2">
                Calories
              </h3>
              <p className="text-2xl font-bold text-purple-700">
                {dailyStats.calories}
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-50 rounded-lg">
              <h3 className="text-sm font-medium text-red-600 mb-2">Protein</h3>
              <p className="text-2xl font-bold text-red-700">
                {dailyStats.protein}g
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-400 mb-2">Carbs</h3>
              <p className="text-2xl font-bold text-blue-500">
                {dailyStats.carbs}g
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-600 mb-2">Fats</h3>
              <p className="text-2xl font-bold text-green-700">
                {dailyStats.fats}g
              </p>
            </div>
          </div>
        </div>

        {/* Meal History */}
        <div className="bg-black bg-opacity-50 p-6 rounded-xl ">
          <h2 className="text-xl font-semibold mb-6">Meal History</h2>
          <div className="space-y-4">
            {Object.entries(mealHistory)
              .sort((a, b) => new Date(b[0]) - new Date(a[0]))
              .map(([date, data]) => (
                <div key={date} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-lg">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <div className="flex space-x-4">
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
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(data.eatenMeals).map(([mealId, eaten]) => {
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
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meal;














































































