var userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
var userService = require('../services/user.service');
var blackListTokenModel = require('../models/blackListToken.model');



//Register
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, age } = req.body;

  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) {
    return res.status(400).json({ message: 'User already exist' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const User = await userService.createUser({
    name,
    email,
    password: hashedPassword,
    age
  });

  const token = User.generateAuthToken();
  res.status(201).json({ token, User });
}


//Login
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid Email or Password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Email or Password' });
  }

  const token = user.generateAuthToken();
  res.cookie('token', token)
  res.status(200).json({ token, user });
}

//Profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
}

//Logout
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListTokenModel.create({ token });
  res.status(200).json({ message: 'Logout Successfully' });
}