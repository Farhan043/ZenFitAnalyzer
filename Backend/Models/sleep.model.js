const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bedTime: { type: Date, required: true },
  alarmTime: { type: Date, required: true },
  sleepDuration: { type: String, required: true },
});

const Sleep = mongoose.model('Sleep', sleepSchema);
module.exports = Sleep;