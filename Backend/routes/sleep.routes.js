const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleep.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/sleep', authMiddleware.authUser, sleepController.saveSleepData);
router.get('/alarms', authMiddleware.authUser, sleepController.getAlarms);

module.exports = router;