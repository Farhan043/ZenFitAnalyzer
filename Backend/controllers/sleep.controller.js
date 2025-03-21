const Sleep = require('../Models/sleep.model');
const userModel = require('../Models/user.model');

exports.saveSleepData = async (req, res) => {
    try {
      console.log("Incoming sleep data:", req.body); // Debugging log
      
      const { bedTime, alarmTime } = req.body;
      if (!bedTime || !alarmTime) {
        return res.status(400).json({ error: "Bedtime and alarm time are required." });
      }
      
      const bedTimeDate = new Date(bedTime);
      const alarmTimeDate = new Date(alarmTime);
      
      if (alarmTimeDate <= bedTimeDate) {
        alarmTimeDate.setDate(bedTimeDate.getDate() + 1);
      }
      
      const sleepDuration = calculateSleepDuration(bedTimeDate, alarmTimeDate);
      
      const sleepEntry = new Sleep({
        userId: req.user._id, // Ensure userId exists
        bedTime: bedTimeDate,
        alarmTime: alarmTimeDate,
        sleepDuration,
      });
      
      await sleepEntry.save();
      res.status(201).json({ message: "Sleep data saved successfully", sleepEntry });
    } catch (error) {
      console.error("Error saving sleep data:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.getAlarms = async (req, res) => {
    try {
      const upcomingAlarms = await Sleep.find({
        userId: req.user._id,
        alarmTime: { $gte: new Date() },
      });
      res.status(200).json(upcomingAlarms);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  function calculateSleepDuration(bedTime, alarmTime) {
    let diff = (alarmTime - bedTime) / (1000 * 60);
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  }