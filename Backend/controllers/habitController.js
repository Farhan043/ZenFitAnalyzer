const Habit = require("../Models/habit");

// const createHabit = async (req, res) => {
//   try {
//     const { name, frequency } = req.body;
//     const habit = new Habit({ userId: req.user.id, name, frequency });
//     await habit.save();
//     res.status(201).json(habit);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const createHabit = async (req, res) => {
    try {
      const { name, frequency } = req.body;
      
      if (!frequency) {
        return res.status(400).json({ message: "Frequency is required" });
      }
  
      const habit = new Habit({ 
        userId: req.user.id, 
        name, 
        frequency: frequency.toLowerCase(),  // ✅ Ensure it's always stored in lowercase
        lastCompleted: null,
        streak: 0 
      });
      await habit.save();
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const today = new Date().setHours(0, 0, 0, 0);
    const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted).setHours(0, 0, 0, 0) : null;

    // if (lastCompleted === today) {
    //   return res.status(400).json({ message: "Habit already completed today" });
    // }

    // if (lastCompleted && today - lastCompleted > 86400000) {
    //   habit.streak = 1;
    // } else {
    //   habit.streak += 1;
    // }

    if (lastCompleted === today) {
        return res.status(400).json({ message: "Habit already completed today" });
      }
  
      if (habit.frequency === "weekly") {
        habit.lastCompleted = today;
        habit.streak += 1;
      } else if (lastCompleted && today - lastCompleted > 86400000) {
        habit.streak = 1; // Reset streak if a daily habit is missed
      } else {
        habit.streak += 1;
      }

    habit.lastCompleted = new Date();
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHabit = async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
  
      if (!habit) {
        return res.status(404).json({ message: "Habit not found" });
      }
  
      if (habit.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this habit" });
      }
  
      await habit.deleteOne();
      res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
      console.error("Error deleting habit:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { createHabit, completeHabit, getHabits, deleteHabit };