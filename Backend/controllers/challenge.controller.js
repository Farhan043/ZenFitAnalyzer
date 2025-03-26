const challengeModel = require("../models/challenge.model");
const mongoose = require("mongoose");

// Create a New Challenge
exports.createChallenge = async (req, res) => {
  try {
    const { title, description, category, duration, startDate, invitees } = req.body;

    // Validate required fields
    if (!title || !category || !duration || !startDate) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Create the challenge without auto-joining the creator
    const challenge = await challengeModel.create({
      title,
      description,
      category,
      duration,
      startDate,
      invitees,
      createdBy: req.user._id,
      joinedUsers: [], // Empty array - creator isn't auto-joined
      participants: 0, // Start with 0 participants
    });

    // Populate creator details for response
    const populatedChallenge = await challengeModel
      .findById(challenge._id)
      .populate("createdBy", "name email profileImage");

    res.status(201).json({
      message: "Challenge created successfully",
      challenge: populatedChallenge,
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ error: "Server error creating challenge" });
  }
};

// Get All Challenges Created by User
exports.getUserChallenges = async (req, res) => {
  try {
    const challenges = await challengeModel
      .find({ createdBy: req.user._id })
      .populate("createdBy", "name email profileImage")
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching user challenges:", error);
    res.status(500).json({ error: "Server error fetching user challenges" });
  }
};

// Get All Challenges Joined by User
exports.getJoinedChallenges = async (req, res) => {
  try {
    const challenges = await challengeModel
      .find({ joinedUsers: req.user._id })
      .populate("createdBy", "name email profileImage")
      .sort({ startDate: 1 }); // Sort by start date (upcoming first)
    
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching joined challenges:", error);
    res.status(500).json({ error: "Server error fetching joined challenges" });
  }
};

// Get All Challenges (Discover)
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await challengeModel
      .find({})
      .populate("createdBy", "name email profileImage")
      .sort({ createdAt: -1 }); // Sort by newest first
    
    // Add isJoined field for the current user
    const enhancedChallenges = challenges.map(challenge => {
      const challengeObj = challenge.toObject();
      challengeObj.isJoined = challenge.joinedUsers.includes(req.user._id);
      return challengeObj;
    });
    
    res.status(200).json(enhancedChallenges);
  } catch (error) {
    console.error("Error fetching all challenges:", error);
    res.status(500).json({ error: "Server error fetching challenges" });
  }
};

// Get Challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate challenge ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid challenge ID format" });
    }
    
    const challenge = await challengeModel
      .findById(id)
      .populate("createdBy", "name email profileImage")
      .populate("joinedUsers", "name email profileImage");
    
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    
    // Add isJoined field for the current user
    const challengeObj = challenge.toObject();
    challengeObj.isJoined = challenge.joinedUsers.some(
      user => user._id.toString() === req.user._id.toString()
    );
    
    res.status(200).json(challengeObj);
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ error: "Server error fetching challenge details" });
  }
};

// Join a Challenge
exports.joinChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate challenge ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid challenge ID format" });
    }
    
    const challenge = await challengeModel.findById(id);
    
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    
    // Check if user has already joined
    if (challenge.joinedUsers.includes(req.user._id)) {
      return res.status(400).json({ error: "You've already joined this challenge" });
    }
    
    // Add user to joinedUsers and increment participant count
    challenge.joinedUsers.push(req.user._id);
    challenge.participants += 1;
    await challenge.save();
    
    // Get updated challenge with populated fields
    const updatedChallenge = await challengeModel
      .findById(id)
      .populate("createdBy", "name email profileImage");
    
    res.status(200).json({
      message: "Successfully joined the challenge",
      challenge: updatedChallenge
    });
  } catch (error) {
    console.error("Error joining challenge:", error);
    res.status(500).json({ error: "Server error joining challenge" });
  }
};

// Leave a Challenge
exports.leaveChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate challenge ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid challenge ID format" });
    }
    
    const challenge = await challengeModel.findById(id);
    
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    
    // Cannot leave if you're the creator
    if (challenge.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: "Challenge creator cannot leave the challenge" });
    }
    
    // Check if user has joined the challenge
    if (!challenge.joinedUsers.includes(req.user._id)) {
      return res.status(400).json({ error: "You haven't joined this challenge" });
    }
    
    // Remove user from joinedUsers and decrement participant count
    challenge.joinedUsers = challenge.joinedUsers.filter(
      userId => userId.toString() !== req.user._id.toString()
    );
    challenge.participants = Math.max(0, challenge.participants - 1);
    await challenge.save();
    
    res.status(200).json({
      message: "Successfully left the challenge"
    });
  } catch (error) {
    console.error("Error leaving challenge:", error);
    res.status(500).json({ error: "Server error leaving challenge" });
  }
};

// Delete a Challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate challenge ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid challenge ID format" });
    }
    
    // Find the challenge
    const challenge = await challengeModel.findById(id);
    
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    
    // Check if the current user is the creator of the challenge
    if (challenge.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete challenges that you created" });
    }
    
    // Delete the challenge
    await challengeModel.findByIdAndDelete(id);
    
    res.status(200).json({
      message: "Challenge deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting challenge:", error);
    res.status(500).json({ error: "Server error deleting challenge" });
  }
};
