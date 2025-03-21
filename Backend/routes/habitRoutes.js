const express = require("express");
const habitController = require("../controllers/habitController");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", authMiddleware.authUser, habitController.createHabit);
router.put("/:id/complete", authMiddleware.authUser, habitController.completeHabit);
router.get("/", authMiddleware.authUser, habitController.getHabits);
router.delete("/:id", authMiddleware.authUser, habitController.deleteHabit);

module.exports = router;