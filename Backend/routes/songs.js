const express = require("express");
const { getSongs, addSong, getSongById } = require("../controllers/songController");
const multer = require("multer");

const router = express.Router();

// Set up file storage for song uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Accept both MP3 and Image files
const upload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

// ✅ Route Order: Fetch All Songs Before Dynamic Routes
router.get("/", getSongs);
router.post("/", upload, addSong);
router.get("/:id", getSongById);

module.exports = router;
