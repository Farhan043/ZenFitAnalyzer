const express = require("express");
const router = express.Router();
const challengeController = require("../controllers/challenge.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const challengeModel = require("../models/challenge.model");

// Apply auth middleware to all routes
router.use(authMiddleware.authUser);

// Challenge creation and management routes
router.post("/create", challengeController.createChallenge);
router.get("/my-challenges", challengeController.getUserChallenges);
router.get("/joined", challengeController.getJoinedChallenges);
router.get("/", async (req, res) => {
  try {
    const challenges = await challengeModel
      .find({})
      .populate("createdBy", "name email profileImage")
      .sort({ createdAt: -1 });
    
    // Add isJoined flag for each challenge
    const enhancedChallenges = challenges.map(challenge => {
      const challengeObj = challenge.toObject();
      challengeObj.isJoined = challenge.joinedUsers.includes(req.user._id);
      return challengeObj;
    });
    
    res.status(200).json(enhancedChallenges);
  } catch (error) {
    console.error("Error fetching all challenges:", error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:id", challengeController.getChallengeById);
router.post("/:id/join", challengeController.joinChallenge);
router.post("/:id/leave", challengeController.leaveChallenge);

// Challenge deletion route
router.delete("/:id", challengeController.deleteChallenge);

module.exports = router;
