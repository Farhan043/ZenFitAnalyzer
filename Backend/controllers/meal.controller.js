const mealService = require('../services/meal.service');

// Create a Meal
module.exports.createMeal = async (req, res) => {
  try {
    const meal = await mealService.createMeal({ ...req.body, userId: req.user._id });
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Meals
module.exports.getUserMeals = async (req, res) => {
  try {
    const meals = await mealService.getUserMeals(req.user._id);
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Meal by ID
module.exports.getMealById = async (req, res) => {
  try {
    const meal = await mealService.getMealById(req.params.mealId);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Meal
module.exports.updateMeal = async (req, res) => {
  try {
    const meal = await mealService.updateMeal(req.params.mealId, req.body);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Meal
module.exports.deleteMeal = async (req, res) => {
  try {
    const meal = await mealService.deleteMeal(req.params.mealId);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
