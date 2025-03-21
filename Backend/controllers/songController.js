const Song = require("../Models/Song");

// Fetch all songs
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new song
const addSong = async (req, res) => {
    try {
      const { name, artist } = req.body;
  
      // Check if file and image were uploaded
      if (!req.files || !req.files.file || !req.files.image) {
        return res.status(400).json({ message: "Both file and image are required" });
      }
  
      const file = `/uploads/${req.files.file[0].filename}`;
      const image = `/uploads/${req.files.image[0].filename}`;
  
      if (!name || !artist) {
        return res.status(400).json({ message: "Song name and artist are required" });
      }
  
      const newSong = new Song({ name, artist, file, image });
      await newSong.save();
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ message: "Failed to add song" });
    }
  };


  const getSongById = async (req, res) => {
    try {
        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid song ID format" });
        }

        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        res.status(200).json(song);
    } catch (error) {
        console.error("Error fetching song by ID:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { getSongs, addSong, getSongById };
  

