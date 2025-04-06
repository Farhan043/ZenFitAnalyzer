
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use latest Gemini model and correct API version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const result = await model.generateContent(message);

    // Extract AI response safely
    const botReply = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};




