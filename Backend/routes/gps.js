const express = require("express");
const GPSActivity = require("../Models/gpsActivity");
const router = express.Router();

// Save GPS Activity
router.post("/", async (req, res) => {
  try {
    const { userId, activityType, distance, caloriesBurned, duration, timestamps } = req.body;
    const newActivity = new GPSActivity({ userId, activityType, distance, caloriesBurned, duration, timestamps });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: "Error saving GPS activity" });
  }
});

// Get User's GPS Activities
router.get("/:userId", async (req, res) => {
  try {
    const activities = await GPSActivity.find({ userId: req.params.userId });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching activities" });
  }
});

module.exports = router;
