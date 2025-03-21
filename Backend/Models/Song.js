const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  file: { type: String, required: true }, // Song URL
  image: { type: String, required: true }, // Album cover
});

module.exports = mongoose.model("Song", SongSchema);
