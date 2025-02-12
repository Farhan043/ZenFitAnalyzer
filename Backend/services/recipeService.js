const Recipe = require('../models/recipeModel');

const getAllRecipes = async () => {
  return await Recipe.find();
};

const getRecipeById = async (id) => {
  return await Recipe.findById(id);
};

const createRecipe = async (recipeData) => {
  const recipe = new Recipe(recipeData);
  return await recipe.save();
};

const updateRecipe = async (id, recipeData) => {
  return await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
};

const deleteRecipe = async (id) => {
  return await Recipe.findByIdAndDelete(id);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};