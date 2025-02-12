const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  prepTime: String,
  cookTime: String,
  servings: Number,
  calories: Number,
  image: String,
  category: String,
  cuisine: String,
  dietType: String,
  healthConditions: [String],
  nutritionalInfo: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  },
  ingredients: [String],
  rating: Number,
  reviews: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;