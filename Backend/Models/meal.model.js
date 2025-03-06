const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  region: String,
  dietaryCondition: String,
  mealType: String,
  vegNonVeg: String,
  dishName: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  description: String,
  ingredients: [String],
  steps: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
