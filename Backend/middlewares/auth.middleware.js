var userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
      return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

// Added admin authorization middleware
module.exports.authorizeAdmin = async (req, res, next) => {
  try {
    // This middleware should be used after authenticate
    // so we can assume req.user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Authentication required' });
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();
  } catch (error) {
    console.error("Error in authorizeAdmin middleware:", error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};