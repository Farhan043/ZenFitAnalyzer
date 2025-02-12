var express = require('express');
var router = express.Router();
var { body } = require('express-validator');
var userController = require('../controllers/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
  body('name').isLength({ min: 4 }).withMessage('Name must be at least 4 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
  userController.registerUser
);

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
  userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);
router.post('/bmi', authMiddleware.authUser, userController.getBMI);
router.get('/bmi', authMiddleware.authUser, userController.getBMI);
router.post('/water-intake', authMiddleware.authUser, userController.updateWaterIntake);
router.get('/water-intake', authMiddleware.authUser, userController.getWaterIntake);
router.get('/water-intake-weekly', authMiddleware.authUser, userController.getWeeklyWaterIntake);
router.post('/sleep-data', authMiddleware.authUser, userController.updateSleepData);
router.get('/sleep-data', authMiddleware.authUser, userController.getSleepData);
router.post("/alarm", authMiddleware.authUser, userController.setAlarmAndBedtime);
router.get("/alarm", authMiddleware.authUser, userController.getAlarmAndBedtime);
router.post("/setTarget", authMiddleware.authUser, userController.setTarget);
router.get("/getTarget", authMiddleware.authUser, userController.getTarget);
router.post('/contact', authMiddleware.authUser, userController.createContactMessage);
router.get('/contact', authMiddleware.authUser, userController.getAllContactMessages);
router.put('/update-profile', authMiddleware.authUser, userController.updateUserProfile);
router.put('/change-password', authMiddleware.authUser, userController.changeUserPassword);

module.exports = router;