const BodyProgress = require("../Models/bodyProgress.model");
const upload = require("../middlewares/multer.config");
const cloudinary = require("../middlewares/multer.config"); // Import Cloudinary utility
exports.addBodyProgress = async (req, res) => {
    try {
      const { weight, chest, waist, hips, thighs, arms, notes } = req.body;
      const photo = req.file ? req.file.path : null; // Cloudinary URL
  
      const progress = new BodyProgress({
        user: req.user._id,
        weight,
        chest,
        waist,
        hips,
        thighs,
        arms,
        photo, // Stores Cloudinary image URL
        notes,
      });
  
      await progress.save();
      res.status(201).json({ message: "Progress added", progress });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  exports.getUserProgress = async (req, res) => {
    try {
      const progress = await BodyProgress.find({ user: req.user._id }).sort({ date: -1 });
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await BodyProgress.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getProgressByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user._id;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required." });
    }

    const progressData = await BodyProgress.find({
      user: userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ date: 1 }); // Sort by ascending order

    if (progressData.length < 2) {
      return res.status(404).json({ message: "Insufficient progress data for graph." });
    }

    const initialEntry = progressData[0];
    const finalEntry = progressData[progressData.length - 1];

    // Calculate weight change
    const weightChange = finalEntry.weight - initialEntry.weight;

    // Calculate body composition changes
    const measurementFields = ["chest", "waist", "hips", "thighs", "arms"];
    const bodyCompositionChanges = measurementFields.map((field) => {
      const change = (finalEntry[field] || 0) - (initialEntry[field] || 0);
      return { part: field, initial: initialEntry[field] || 0, final: finalEntry[field] || 0, change };
    });

    // Prepare weight progress data for chart
    const weightProgressData = progressData.map((entry) => ({
      date: entry.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      weight: entry.weight,
    }));

    res.status(200).json({
      progressData,
      weightChange,
      bodyCompositionChanges,
      weightProgressData, // Send data for chart update
    });
  } catch (error) {
    console.error("Error fetching progress data:", error);
    res.status(500).json({ error: "Server error while fetching progress data." });
  }
};





  



exports.deleteBodyProgress = async (req, res) => {
    try {
      const { id } = req.params;
  
      const entry = await BodyProgress.findById(id);
      if (!entry) return res.status(404).json({ message: "Entry not found" });
  
      // Delete from Cloudinary
      if (entry.cloudinaryId) {
        await cloudinary.uploader.destroy(entry.cloudinaryId);
      }
  
      // Delete from MongoDB
      await BodyProgress.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ message: "Error deleting photo" });
    }
  };


  