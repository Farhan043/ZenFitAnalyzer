const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Challenge title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Running", "Cycling", "Walking", "Yoga", "Strength", "Wellness"],
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
    enum: ["7 Days", "14 Days", "30 Days", "60 Days", "90 Days"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  invitees: {
    type: String,
    trim: true,
  },
  participants: {
    type: Number,
    default: 0,
  },
  joinedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add virtual field for endDate
challengeSchema.virtual('endDate').get(function() {
  if (!this.startDate || !this.duration) return null;
  
  const startDate = new Date(this.startDate);
  const durationDays = parseInt(this.duration.split(' ')[0]);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);
  
  return endDate;
});

// Add virtual field for status
challengeSchema.virtual('status').get(function() {
  if (!this.startDate || !this.duration) return 'Unknown';
  
  const now = new Date();
  const startDate = new Date(this.startDate);
  const durationDays = parseInt(this.duration.split(' ')[0]);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);
  
  if (now < startDate) {
    return 'Upcoming';
  } else if (now >= startDate && now <= endDate) {
    return 'Active';
  } else {
    return 'Completed';
  }
});

// Ensure virtuals are included when converting to JSON
challengeSchema.set('toJSON', { virtuals: true });
challengeSchema.set('toObject', { virtuals: true });

const challengeModel = mongoose.models.challenge || mongoose.model("challenge", challengeSchema);

module.exports = challengeModel;
