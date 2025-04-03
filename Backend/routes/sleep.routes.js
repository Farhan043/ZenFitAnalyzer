const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleep.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/sleep', authMiddleware.authUser, sleepController.saveSleepData);
router.get('/alarms', authMiddleware.authUser, sleepController.getAlarms);
router.get('/today-schedule', authMiddleware.authUser, sleepController.getTodaySchedule);
router.put('/update-schedule', authMiddleware.authUser, sleepController.updateSchedule);
router.get('/sleep-insights', authMiddleware.authUser, sleepController.getSleepInsights);

module.exports = router;