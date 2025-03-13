const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/chat", authMiddleware.authUser, chatbotController.chatWithBot);

module.exports = router;
