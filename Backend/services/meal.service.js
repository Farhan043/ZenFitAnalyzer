const Meal = require('../models/meal.model');

module.exports.createMeal = async (mealData) => {
  return await Meal.create(mealData);
};

module.exports.getUserMeals = async (userId) => {
  return await Meal.find({ userId });
};

module.exports.getMealById = async (mealId) => {
  return await Meal.findById(mealId);
};

module.exports.updateMeal = async (mealId, mealData) => {
  return await Meal.findByIdAndUpdate(mealId, mealData, { new: true });
};

module.exports.deleteMeal = async (mealId) => {
  return await Meal.findByIdAndDelete(mealId);
};
