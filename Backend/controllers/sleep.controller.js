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
  
  exports.getTodaySchedule = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const userId = req.user._id || req.query.userId;
      
      // Find the most recent sleep schedule that includes today
      const todaySchedule = await Sleep.findOne({
        userId: userId,
        bedTime: { $lte: tomorrow },
        alarmTime: { $gte: today }
      }).sort({ bedTime: -1 });
      
      // If no schedule found, create a default
      if (!todaySchedule) {
        return res.status(200).json({
          bedTime: null,
          alarmTime: null,
          sleepDuration: "--",
          isDefault: true
        });
      }
      
      res.status(200).json(todaySchedule);
    } catch (error) {
      console.error("Error fetching today's schedule:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.updateSchedule = async (req, res) => {
    try {
      const { bedTime, alarmTime, userId } = req.body;
      
      if (!bedTime || !alarmTime) {
        return res.status(400).json({ error: "Bedtime and alarm time are required" });
      }
      
      const bedTimeDate = new Date(bedTime);
      const alarmTimeDate = new Date(alarmTime);
      
      if (alarmTimeDate <= bedTimeDate) {
        alarmTimeDate.setDate(bedTimeDate.getDate() + 1);
      }
      
      const sleepDuration = calculateSleepDuration(bedTimeDate, alarmTimeDate);
      
      // Find if a schedule exists for today or create a new one
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      let sleepEntry = await Sleep.findOne({
        userId: req.user._id,
        bedTime: { $lte: tomorrow },
        alarmTime: { $gte: today }
      });
      
      if (sleepEntry) {
        // Update existing entry
        sleepEntry.bedTime = bedTimeDate;
        sleepEntry.alarmTime = alarmTimeDate;
        sleepEntry.sleepDuration = sleepDuration;
        await sleepEntry.save();
      } else {
        // Create new entry
        sleepEntry = new Sleep({
          userId: req.user._id,
          bedTime: bedTimeDate,
          alarmTime: alarmTimeDate,
          sleepDuration,
        });
        await sleepEntry.save();
      }
      
      res.status(200).json(sleepEntry);
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.getSleepInsights = async (req, res) => {
    try {
      const userId = req.user._id;
      
      // Get last 30 days of sleep data
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const sleepData = await Sleep.find({
        userId: userId,
        bedTime: { $gte: thirtyDaysAgo }
      }).sort({ bedTime: 1 });
      
      if (!sleepData.length) {
        return res.status(200).json({
          averageSleep: "--",
          bestDay: "--",
          sleepGoal: "8 hrs",
          consistency: "--",
          sleepTrend: "neutral",
          recentEntries: []
        });
      }
      
      // Calculate average sleep time
      const sleepHours = sleepData.map(entry => {
        const duration = entry.sleepDuration;
        const hourMatch = duration.match(/(\d+)h/);
        const minuteMatch = duration.match(/(\d+)m/);
        
        const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
        const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
        
        return hours + (minutes / 60);
      });
      
      const averageSleep = sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length;
      
      // Determine best day (day with most sleep)
      const sleepByDay = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
      const sleepCountByDay = [0, 0, 0, 0, 0, 0, 0];
      
      sleepData.forEach(entry => {
        const day = new Date(entry.bedTime).getDay();
        const hours = parseFloat(entry.sleepDuration.split('h')[0]);
        sleepByDay[day] += hours;
        sleepCountByDay[day]++;
      });
      
      // Calculate average sleep by day
      const avgSleepByDay = sleepByDay.map((total, i) => 
        sleepCountByDay[i] > 0 ? total / sleepCountByDay[i] : 0
      );
      
      const bestDayIndex = avgSleepByDay.indexOf(Math.max(...avgSleepByDay));
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const bestDay = days[bestDayIndex];
      
      // Calculate consistency (percentage of days within 30 min of average)
      const daysWithinThreshold = sleepHours.filter(hours => 
        Math.abs(hours - averageSleep) <= 0.5
      ).length;
      
      const consistency = Math.round((daysWithinThreshold / sleepHours.length) * 100);
      
      // Determine sleep trend
      const recentAvg = sleepHours.slice(-7).reduce((a, b) => a + b, 0) / Math.min(7, sleepHours.length);
      const prevAvg = sleepHours.slice(-14, -7).length > 0 
        ? sleepHours.slice(-14, -7).reduce((a, b) => a + b, 0) / sleepHours.slice(-14, -7).length
        : recentAvg;
      
      let sleepTrend;
      if (recentAvg > prevAvg + 0.5) {
        sleepTrend = "improving";
      } else if (recentAvg < prevAvg - 0.5) {
        sleepTrend = "declining";
      } else {
        sleepTrend = "stable";
      }
      
      // Get 5 most recent entries
      const recentEntries = sleepData.slice(-5).map(entry => ({
        date: entry.bedTime,
        duration: entry.sleepDuration,
        hours: parseFloat(entry.sleepDuration.split('h')[0])
      })).reverse();
      
      res.status(200).json({
        averageSleep: averageSleep.toFixed(1),
        bestDay,
        sleepGoal: "8 hrs",
        consistency: `${consistency}%`,
        sleepTrend,
        recentEntries
      });
    } catch (error) {
      console.error("Error getting sleep insights:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  function calculateSleepDuration(bedTime, alarmTime) {
    let diff = (alarmTime - bedTime) / (1000 * 60);
    return `${Math.floor(diff / 60)}h ${Math.round(diff % 60)}m`;
  }