const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/meals', authMiddleware.authUser, mealController.createMeal);
router.get('/', authMiddleware.authUser, mealController.getUserMeals);
router.get('/:mealId', authMiddleware.authUser, mealController.getMealById);
router.put('/:mealId', authMiddleware.authUser, mealController.updateMeal);
router.delete('/:mealId', authMiddleware.authUser, mealController.deleteMeal);

module.exports = router;
