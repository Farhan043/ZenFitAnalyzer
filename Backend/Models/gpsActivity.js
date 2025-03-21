const mongoose = require("mongoose");

const GPSActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activityType: { type: String, enum: ["walking", "running", "cycling"], required: true },
  distance: { type: Number, required: true }, // in meters
  caloriesBurned: { type: Number, required: true }, // in kcal
  duration: { type: Number, required: true }, // in minutes
  timestamps: [{ latitude: Number, longitude: Number }], // Store GPS points
}, { timestamps: true });

module.exports = mongoose.model("GPSActivity", GPSActivitySchema);
