const mongoose = require("mongoose");

const bodyProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number, required: true },
  chest: { type: Number },
  waist: { type: Number },
  hips: { type: Number },
  thighs: { type: Number },
  arms: { type: Number },
  photo: { type: String }, // Stores the image URL
  notes: { type: String },
});

const BodyProgress = mongoose.model("BodyProgress", bodyProgressSchema);
module.exports = BodyProgress;