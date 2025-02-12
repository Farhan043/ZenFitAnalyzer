// import React, { useState } from 'react';
// import { ChevronDown, Timer, Users, Heart, Share2, Printer, Star, Search, Droplets, ShoppingBag, Clock, Utensils, Dumbbell, Activity, Trophy, Scale } from 'lucide-react';

// const recipes = [
//   {
//     id: 1,
//     name: "High-Protein Methi Thepla",
//     description: "Protein-packed Gujarati flatbread perfect for post-workout meals",
//     prepTime: "20 mins",
//     cookTime: "15 mins",
//     servings: 4,
//     calories: 120,
//     image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
//     category: "Post-Workout",
//     cuisine: "Gujarati",
//     dietType: "Vegetarian",
//     healthConditions: ["High-Protein", "Weight Loss"],
//     nutritionalInfo: {
//       protein: 8,
//       carbs: 18,
//       fat: 3,
//       fiber: 4
//     },
//     ingredients: ["Protein-Fortified Wheat Flour", "Fenugreek Leaves", "Greek Yogurt", "Spices"],
//     rating: 4.8,
//     reviews: 156
//   },
//   {
//     id: 2,
//     name: "Lean Macher Jhol",
//     description: "High-protein Bengali fish curry ideal for muscle recovery",
//     prepTime: "25 mins",
//     cookTime: "30 mins",
//     servings: 4,
//     calories: 280,
//     image: "https://images.unsplash.com/photo-1626500155537-99daec8b2f9f?auto=format&fit=crop&w=800&q=80",
//     category: "Muscle Gain",
//     cuisine: "Bengali",
//     dietType: "Non-Vegetarian",
//     healthConditions: ["High-Protein", "Weight Loss"],
//     nutritionalInfo: {
//       protein: 28,
//       carbs: 8,
//       fat: 12,
//       fiber: 2
//     },
//     ingredients: ["Lean Fish", "Mustard Oil", "Tomatoes", "Bengali Spices"],
//     rating: 4.9,
//     reviews: 203
//   },
//   {
//     id: 3,
//     name: "Protein Ragi Dosa",
//     description: "Protein-enriched millet crepe for pre-workout energy",
//     prepTime: "30 mins",
//     cookTime: "20 mins",
//     servings: 4,
//     calories: 180,
//     image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
//     category: "Pre-Workout",
//     cuisine: "South Indian",
//     dietType: "Vegetarian",
//     healthConditions: ["High-Protein", "Weight Loss", "Heart-Healthy"],
//     nutritionalInfo: {
//       protein: 12,
//       carbs: 25,
//       fat: 2,
//       fiber: 6
//     },
//     ingredients: ["Ragi Flour", "Protein Powder", "Urad Dal", "Fenugreek Seeds"],
//     rating: 4.7,
//     reviews: 178
//   }
// ];

// const Meal = () => {
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedDietType, setSelectedDietType] = useState("All");
//   const [selectedHealthCondition, setSelectedHealthCondition] = useState("All");
//   const [favorites, setFavorites] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [shoppingList, setShoppingList] = useState([]);
//   const [dailyCalories, setDailyCalories] = useState(0);
//   const [dailyProtein, setDailyProtein] = useState(0);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
//     );
//   };

//   const addToShoppingList = (recipe) => {
//     setShoppingList((prev) => [...new Set([...prev, ...recipe.ingredients])]);
//   };

//   const shareRecipe = (recipe) => {
//     if (navigator.share) {
//       navigator.share({
//         title: recipe.name,
//         text: `Check out this healthy ${recipe.name} recipe!`,
//         url: window.location.href,
//       });
//     } else {
//       alert("Web Share API is not supported on this browser.");
//     }
//   };

//   const trackNutrition = (recipe) => {
//     setDailyCalories((prev) => prev + recipe.calories);
//     setDailyProtein((prev) => prev + recipe.nutritionalInfo.protein);
//   };

//   const handleWaterIntakeChange = (e) => {
//     setWaterIntake(e.target.value);
//   };

//   const filteredRecipes = recipes.filter((recipe) => {
//     const matchesRegion = selectedRegion === "All" || recipe.cuisine === selectedRegion;
//     const matchesDietType = selectedDietType === "All" || recipe.dietType === selectedDietType;
//     const matchesHealth = selectedHealthCondition === "All" || recipe.healthConditions.includes(selectedHealthCondition);
//     const matchesSearch =
//       recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesRegion && matchesDietType && matchesHealth && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg p-6 text-center">
//         <h1 className="text-3xl font-bold">ZenFit Nutrition</h1>
//         <p className="mt-2 text-purple-100">Fuel your fitness journey with healthy Indian cuisine</p>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <input
//           type="text"
//           placeholder="Search recipes..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div className="mb-4">
//           <input
//             type="number"
//             value={waterIntake}
//             onChange={handleWaterIntakeChange}
//             placeholder="Enter water intake (in liters)"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRecipes.map((recipe) => (
//             <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{recipe.name}</h3>
//                 <p className="text-gray-600">{recipe.description}</p>
//                 <p className="text-gray-800 mt-2">
//                   <strong>Calories:</strong> {recipe.calories}
//                 </p>
//                 <button
//                   onClick={() => trackNutrition(recipe)}
//                   className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Track Nutrition
//                 </button>
//                 <button
//                   onClick={() => toggleFavorite(recipe.id)}
//                   className="mt-4 ml-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
//                 >
//                   {favorites.includes(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6">
//           <h2 className="text-2xl font-bold">Shopping List</h2>
//           <ul className="list-disc pl-6">
//             {shoppingList.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Meal;






















// import React, { useState, useEffect } from 'react';
// import { Heart, Star, Search, ShoppingBag, Trash2 } from 'lucide-react';
// import axios from 'axios';

// const Meal = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedDietType, setSelectedDietType] = useState("All");
//   const [selectedHealthCondition, setSelectedHealthCondition] = useState("All");
//   const [favorites, setFavorites] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [shoppingList, setShoppingList] = useState([]);
  
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/recipes');
//         setRecipes(response.data || []);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setRecipes([]);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   const toggleFavorite = (recipe) => {
//     setFavorites((prev) =>
//       prev.includes(recipe) ? prev.filter((fav) => fav._id !== recipe._id) : [...prev, recipe]
//     );
//   };

//   const addToShoppingList = (recipe) => {
//     setShoppingList((prev) => [...new Set([...prev, ...recipe.ingredients])]);
//   };

//   const filteredRecipes = recipes.filter((recipe) => {
//     if (!recipe || !recipe.name || !recipe.description) return false;
//     const matchesRegion = selectedRegion === "All" || recipe.cuisine === selectedRegion;
//     const matchesDietType = selectedDietType === "All" || recipe.dietType === selectedDietType;
//     const matchesHealth = selectedHealthCondition === "All" || (recipe.healthConditions && recipe.healthConditions.includes(selectedHealthCondition));
//     const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesRegion && matchesDietType && matchesHealth && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg p-6 text-center">
//         <h1 className="text-3xl font-bold">ZenFit Nutrition</h1>
//         <p className="mt-2 text-purple-100">Fuel your fitness journey with healthy recipes</p>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <input
//           type="text"
//           placeholder="Search recipes..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRecipes.map((recipe) => (
//             <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{recipe.name}</h3>
//                 <p className="text-gray-600">{recipe.description}</p>
//                 <p className="text-gray-800 mt-2"><strong>Calories:</strong> {recipe.calories || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Prep Time:</strong> {recipe.prepTime || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Cook Time:</strong> {recipe.cookTime || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Servings:</strong> {recipe.servings || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Rating:</strong> {recipe.rating || 'N/A'} <Star className="inline text-yellow-500" /></p>
//                 <p className="text-gray-800"><strong>Reviews:</strong> {recipe.reviews || 0}</p>

//                 <button
//                   onClick={() => toggleFavorite(recipe)}
//                   className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
//                 >
//                   {favorites.includes(recipe) ? "Remove from Favorites" : "Add to Favorites"}
//                 </button>
//                 <button
//                   onClick={() => addToShoppingList(recipe)}
//                   className="mt-4 ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                 >
//                   <ShoppingBag className="inline mr-2" /> Add to Shopping List
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6">
//           <h2 className="text-2xl font-bold">Favorite Recipes</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favorites.map((recipe) => (
//               <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold">{recipe.name}</h3>
//                   <button
//                     onClick={() => toggleFavorite(recipe)}
//                     className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                   >
//                     <Trash2 className="inline mr-2" /> Remove from Favorites
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Meal;







// import React, { useState, useEffect } from 'react';
// import { Heart, Star, Search, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';
// import axios from 'axios';

// const Meal = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [selectedRegion, setSelectedRegion] = useState("All");
//   const [selectedDietType, setSelectedDietType] = useState("All");
//   const [selectedHealthCondition, setSelectedHealthCondition] = useState("All");
//   const [favorites, setFavorites] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [shoppingList, setShoppingList] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
  
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/recipes');
//         setRecipes(response.data || []);
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setRecipes([]);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   const toggleFavorite = (recipe) => {
//     setFavorites((prev) =>
//       prev.includes(recipe) ? prev.filter((fav) => fav._id !== recipe._id) : [...prev, recipe]
//     );
//   };

//   const addToShoppingList = (recipe) => {
//     setShoppingList((prev) => [...new Set([...prev, ...recipe.ingredients])]);
//   };

//   const filteredRecipes = recipes.filter((recipe) => {
//     if (!recipe || !recipe.name || !recipe.description) return false;
//     const matchesRegion = selectedRegion === "All" || recipe.cuisine === selectedRegion;
//     const matchesDietType = selectedDietType === "All" || recipe.dietType === selectedDietType;
//     const matchesHealth = selectedHealthCondition === "All" || (recipe.healthConditions && recipe.healthConditions.includes(selectedHealthCondition));
//     const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesRegion && matchesDietType && matchesHealth && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
//       <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg p-6 flex justify-between items-center">
//         <h1 className="text-3xl font-bold">ZenFit Nutrition</h1>
//         <div className="relative cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
//           <ShoppingCart className="text-white w-8 h-8" />
//           {favorites.length > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
//               {favorites.length}
//             </span>
//           )}
//         </div>
//       </header>

//       {cartOpen && (
//         <div className="absolute top-16 right-4 bg-white p-4 shadow-lg rounded-lg w-80">
//           <h2 className="text-xl font-bold">Favorite Recipes</h2>
//           {favorites.length > 0 ? (
//             favorites.map((recipe) => (
//               <div key={recipe._id} className="flex items-center justify-between border-b py-2">
//                 <span>{recipe.name}</span>
//                 <button onClick={() => toggleFavorite(recipe)} className="text-red-500 hover:text-red-700">
//                   <Trash2 />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No favorite recipes</p>
//           )}
//         </div>
//       )}

//       <div className="container mx-auto px-4 py-8">
//         <input
//           type="text"
//           placeholder="Search recipes..."
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredRecipes.map((recipe) => (
//             <div key={recipe._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">{recipe.name}</h3>
//                 <p className="text-gray-600">{recipe.description}</p>
//                 <p className="text-gray-800 mt-2"><strong>Calories:</strong> {recipe.calories || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Prep Time:</strong> {recipe.prepTime || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Cook Time:</strong> {recipe.cookTime || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Servings:</strong> {recipe.servings || 'N/A'}</p>
//                 <p className="text-gray-800"><strong>Rating:</strong> {recipe.rating || 'N/A'} <Star className="inline text-yellow-500" /></p>
//                 <p className="text-gray-800"><strong>Reviews:</strong> {recipe.reviews || 0}</p>

//                 <button
//                   onClick={() => toggleFavorite(recipe)}
//                   className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
//                 >
//                   {favorites.includes(recipe) ? "Remove from Favorites" : "Add to Favorites"}
//                 </button>
//                 <button
//                   onClick={() => addToShoppingList(recipe)}
//                   className="mt-4 ml-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                 >
//                   <ShoppingBag className="inline mr-2" /> Add to Shopping List
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Meal;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foodData from "../../assets/FoodData";

const categories = [
  { name: "Breakfast", foods: "120+ Foods", color: "bg-blue-100", button: "bg-blue-500" },
  { name: "Lunch", foods: "130+ Foods", color: "bg-purple-100", button: "bg-purple-500" },
  { name: "Dinner", foods: "100+ Foods", color: "bg-green-100", button: "bg-green-500" },
  { name: "Snacks", foods: "80+ Foods", color: "bg-yellow-100", button: "bg-yellow-500" },
  { name: "Desserts", foods: "90+ Foods", color: "bg-pink-100", button: "bg-pink-500" },
  { name: "Drinks", foods: "70+ Foods", color: "bg-red-100", button: "bg-red-500" },
];


const Meal= () => {
  const navigate = useNavigate();
const [recipe, setRecipe] = useState(foodData);


  return (

    <>

<div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Breakfast Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipe.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
              <p className="text-gray-800 mt-2">
                <strong>Calories:</strong> {recipe.calories}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>




     <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <h1 className="text-3xl font-bold mb-6">Find Something to Eat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg ${category.color} text-center`}
          >
            <div className="text-2xl font-bold mb-2">{category.name}</div>
            <p className="text-gray-600 mb-4">{category.foods}</p>
            <button
              className={`px-4 py-2 text-white rounded-lg ${category.button} hover:opacity-80`}
              onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      </div> 
</>
      
  );
};
export default Meal;

