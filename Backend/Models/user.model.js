// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: [4, 'name must be atlest 4 characters']
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: [5, 'email must be atlest 5 characters']
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true,
//   },
//   dob: {
//     type: Date,
//     required: true,
//   },
//   weight: {
//     type: Number,
//     required: true,
//   },
//   height: {
//     type: Number,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });



// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//   return token;
// }

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// }

// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// }
// const userModel = mongoose.model('user', userSchema);

// module.exports = userModel;


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
});

userSchema.add({
  waterIntake: [waterSchema]
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

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
