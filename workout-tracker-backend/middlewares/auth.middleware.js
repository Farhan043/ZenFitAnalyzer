const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};