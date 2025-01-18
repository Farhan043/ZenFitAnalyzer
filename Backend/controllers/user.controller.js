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

  const { name, email, password, gender, dob, weight, height } = req.body;

  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) {
    return res.status(400).json({ message: 'User already exist' });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const User = await userService.createUser({
    name,
    email,
    password: hashedPassword,
    gender,
    dob,
    weight,
    height
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
  res.status(200).json({ message: `Welcome ${user.name}`, token, user });
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


//BMI
module.exports.getBMI = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const heightInMeters = user.height / 100; // Assuming height is in cm
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);

    let status = '';
    if (bmi < 18.5) status = 'underweight';
    else if (bmi >= 18.5 && bmi < 24.9) status = 'normal weight';
    else if (bmi >= 25 && bmi < 29.9) status = 'overweight';
    else status = 'obesity';

    res.status(200).json({ bmi, status });
  } catch (error) {
    next(error);
  }
};


module.exports.updateWaterIntake = async (req, res, next) => {
  try {
    console.log('Incoming request body:', req.body); // Debug log
    const user = await userModel.findById(req.user._id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const { amount } = req.body;
    console.log('Amount received:', amount); // Debug log

    if (!amount || isNaN(amount) || parseInt(amount, 10) <= 0) {
      return res.status(400).json({ message: 'Invalid water intake amount' });
    }

    const currentDate = new Date().toISOString().split('T')[0];
    let dailyLog = user.waterIntake.find((log) =>
      new Date(log.date).toISOString().startsWith(currentDate)
    );

    if (!dailyLog) {
      console.log('Creating new daily log');
      dailyLog = { date: new Date(), logs: [], total: 0 };
      user.waterIntake.push(dailyLog);
    }

    if (dailyLog.total >= 4000) {
      return res.status(400).json({ message: 'You have already consumed 4 liters of water today.' });
    }

    const currentTime = new Date().toTimeString().split(' ')[0];
    console.log('Adding water intake log:', { time: currentTime, amount }); // Debug log
    dailyLog.logs.push({ time: currentTime, amount: parseInt(amount, 10) });
    dailyLog.total += parseInt(amount, 10);

    console.log('Updated daily log:', dailyLog); // Debug log
    await user.save();

    res.status(200).json({
      message: 'Water intake updated successfully',
      dailyLog,
    });
  } catch (error) {
    console.error('Error in updateWaterIntake:', error); // Debug log
    next(error);
  }
};



// Get Daily Water Intake
module.exports.getWaterIntake = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const dailyLog = user.waterIntake.find((log) =>
      log.date.toISOString().startsWith(currentDate)
    );

    res.status(200).json(dailyLog || { logs: [], total: 0 });
  } catch (error) {
    next(error);
  }
};


//Heart Rate
// module.exports.getHeartRateData = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Mock heart rate data (replace with real data retrieval logic if available)
//     const heartRateData = [
//       { time: '10:00', heartRate: 72 },
//       { time: '10:05', heartRate: 78 },
//       { time: '10:10', heartRate: 75 },
//       { time: '10:15', heartRate: 80 },
//       { time: '10:20', heartRate: 74 },
//     ];

//     res.status(200).json(heartRateData);
//   } catch (error) {
//     next(error);
//   }
// };