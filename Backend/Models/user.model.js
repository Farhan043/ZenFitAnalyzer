const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const waterSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  logs: [
    {
      time: String,
      amount: Number,
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});






//TargetSchema
const TargetSchema = new mongoose.Schema({
  date: { type: String, required: true },
  waterIntake: { type: Number, required: true },
  footSteps: { type: Number, required: true },
});


// Schema and Model
const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});







// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [4, 'Name must be at least 4 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  profilePicture: {
    type: String,
    default: ''
  },
});

userSchema.add({
  waterIntake: [waterSchema],
  // alarmData: [alarmSchema],
  targetData: [TargetSchema],
  contactData: [contactSchema],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// const userModel = mongoose.model('user', userSchema);
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = userModel;


