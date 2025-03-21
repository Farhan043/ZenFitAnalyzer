const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  streak: { type: Number, default: 0 },
  lastCompleted: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Habit", HabitSchema);