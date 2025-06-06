var userModel = require('../Models/user.model');

const { validationResult } = require('express-validator');
var userService = require('../services/user.service');
var blackListTokenModel = require('../models/blackListToken.model');


//Register
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, gender, dob, weight, height} = req.body;

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

  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.status(401).json({ message: 'Invalid Email or Password' });
  // }

  const token = user.generateAuthToken();
  res.cookie('token', token)
  res.status(200).json({ message: `Welcome ${user.name}`, token, user });
}


// Update User Profile
module.exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, gender, dob, height, weight } = req.body;
    
    // Input validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it's already in use
    if (email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    user.name = name;
    user.email = email;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.height = height || user.height;
    user.weight = weight || user.weight;

    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// Change User Password
module.exports.changeUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.password = await userModel.hashPassword(password);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
};

// Create a new contact message
module.exports.createContactMessage = async (req, res) => {
  try {
    const { email, message  } = req.body;
    if (!email || !message ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the logged-in user
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Push contact message to user's contactData array
    user.contactData.push({ email, message, date: new Date() });
    await user.save();

    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Fetch only the logged-in user's contact messages
module.exports.getAllContactMessages = async (req, res) => {
  try {
    // Find the logged-in user
    const user = await userModel.findById(req.user._id, { email: 1, contactData: 1 });

    if (!user || !user.contactData.length) {
      return res.status(404).json({ error: "No contact messages found for this user" });
    }

    // Extract only email, message, and date
    const userMessages = user.contactData.map(message => ({
      email: message.email,
      message: message.message,
      date: message.date,
    }));

    res.status(200).json(userMessages);
  } catch (error) {
    console.error("Error fetching user's contact messages:", error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user; // `req.user` is set by the `authUser` middleware
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Logout
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListTokenModel.create({ token });
  res.status(200).json({ message: 'Logout Successfully' });
}


// Updated BMI Calculation
module.exports.getBMI = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get weight and height from request body or fallback to stored values
    const weight = parseFloat(req.body.weight) || parseFloat(user.weight);
    const feet = parseFloat(req.body.feet) || parseFloat(user.feet);
    const inches = parseFloat(req.body.inches) || parseFloat(user.inches);

    // Ensure weight and height are valid
    if (isNaN(weight) || isNaN(feet) || isNaN(inches) || weight <= 0 || feet < 0 || inches < 0) {
      return res.status(400).json({ message: 'Invalid weight or height data' });
    }

    // Convert height from feet and inches to meters
    const heightInMeters = ((feet * 12) + inches) * 0.0254;

    // Calculate BMI
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // Determine BMI status
    let status = '';
    if (bmi < 18.5) {
      status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      status = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      status = 'Overweight';
    } else {
      status = 'Obesity';
    }

    res.status(200).json({ bmi: parseFloat(bmi), status });
  } catch (error) {
    console.error('Error in getBMI:', error);
    next(error);
  }
};

//Water Intake
module.exports.updateWaterIntake = async (req, res, next) => {
  try {
    // console.log('Incoming request body:', req.body); 
    const user = await userModel.findById(req.user._id);
    if (!user) {
      // console.log('User not found');
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

// Get Weekly Water Intake
module.exports.getWeeklyWaterIntake = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(dayDate.getDate() + i);
      const log = user.waterIntake.find(
        (entry) => new Date(entry.date).toDateString() === dayDate.toDateString()
      );
      return {
        day: dayDate.toLocaleDateString("en-US", { weekday: "short" }),
        // total: log ? log.total : 0,
         total: log ? (log.total / 1000).toFixed(1) + "L" : "0L"
      };
    });
    res.status(200).json(weeklyData); // Ensure this is an array
  } catch (error) {
    console.error("Error in getWeeklyWaterIntake:", error);
    next(error);
  }
};


// Save water & footstep target
module.exports.setTarget = async (req, res) => {
  try {
    const { waterIntake, footSteps } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date().toDateString();
    let target = user.targetData.find(t => t.date === today);

    if (target) {
      target.waterIntake = waterIntake;
      target.footSteps = footSteps;
    } else {
      target = { date: today, waterIntake, footSteps };
      user.targetData.push(target);
    }

    await user.save();
    res.status(200).json({ message: "Target set successfully!", target });
  } catch (error) {
    res.status(500).json({ message: "Error saving target", error });
  }
};

// Get today's target data for a user
module.exports.getTarget = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const today = new Date().toDateString();
    const target = user.targetData.find(t => t.date === today);
    if (!target) {
      // If no target data for today, reset the target data
      target = { date: today, waterIntake: 0, footSteps: 0 };
      user.targetData.push(target);
      await user.save();
    }
    res.status(200).json(target);
  } catch (error) {
    res.status(500).json({ message: "Error fetching target", error });
  }
};


// Add this new controller method
module.exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update only the current user's profile picture
    user.profilePicture = req.file.path;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      profilePicture: req.file.path
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Error uploading profile picture'
    });
  }
};