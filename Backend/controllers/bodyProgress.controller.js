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

    // Convert string dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    // Set time to beginning and end of day for accurate range
    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(23, 59, 59, 999);

    // Find all entries within the date range
    const progressData = await BodyProgress.find({
      user: userId,
      date: { $gte: startDateObj, $lte: endDateObj },
    }).sort({ date: 1 }); // Sort by ascending order

    if (progressData.length === 0) {
      return res.status(404).json({ message: "No progress data found for the selected date range." });
    }

    // Find the closest entries to the start and end dates
    let startEntry, endEntry;
    
    if (progressData.length === 1) {
      // If only one entry, use it for both start and end
      startEntry = progressData[0];
      endEntry = progressData[0];
    } else {
      // Find entries closest to the selected start and end dates
      startEntry = progressData[0];
      endEntry = progressData[progressData.length - 1];
      
      // If the first entry is after the start date, find the closest entry before it
      if (startEntry.date > startDateObj) {
        const beforeStartEntry = await BodyProgress.findOne({
          user: userId,
          date: { $lt: startDateObj }
        }).sort({ date: -1 });
        
        if (beforeStartEntry) {
          startEntry = beforeStartEntry;
        }
      }
      
      // If the last entry is before the end date, find the closest entry after it
      if (endEntry.date < endDateObj) {
        const afterEndEntry = await BodyProgress.findOne({
          user: userId,
          date: { $gt: endDateObj }
        }).sort({ date: 1 });
        
        if (afterEndEntry) {
          endEntry = afterEndEntry;
        }
      }
    }

    // Calculate weight change
    const weightChange = endEntry.weight - startEntry.weight;
    
    // Calculate percentage change
    const weightPercentageChange = startEntry.weight > 0 
      ? ((weightChange / startEntry.weight) * 100).toFixed(1) 
      : 0;

    // Calculate body composition changes
    const measurementFields = ["chest", "waist", "hips", "thighs", "arms"];
    const bodyCompositionChanges = measurementFields.map((field) => {
      const initialValue = startEntry[field] || 0;
      const finalValue = endEntry[field] || 0;
      const change = finalValue - initialValue;
      
      // Calculate percentage change
      const percentageChange = initialValue > 0 
        ? ((change / initialValue) * 100).toFixed(1) 
        : 0;
      
      return { 
        part: field, 
        initial: initialValue, 
        final: finalValue, 
        change,
        percentageChange
      };
    });

    // Prepare weight progress data for chart
    const weightProgressData = progressData.map((entry) => ({
      date: entry.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      weight: entry.weight,
    }));

    // Add start and end entries if they're not already in the progressData
    if (startEntry._id.toString() !== progressData[0]._id.toString()) {
      weightProgressData.unshift({
        date: startEntry.date.toISOString().split("T")[0],
        weight: startEntry.weight,
      });
    }
    
    if (endEntry._id.toString() !== progressData[progressData.length - 1]._id.toString()) {
      weightProgressData.push({
        date: endEntry.date.toISOString().split("T")[0],
        weight: endEntry.weight,
      });
    }

    // Prepare image analysis data - include ALL images within the date range
    const imageAnalysisData = progressData
      .filter(entry => entry.photo) // Only include entries with photos
      .map(entry => ({
        id: entry._id,
        date: entry.date.toISOString().split("T")[0],
        photo: entry.photo,
        weight: entry.weight,
        measurements: {
          chest: entry.chest,
          waist: entry.waist,
          hips: entry.hips,
          thighs: entry.thighs,
          arms: entry.arms
        },
        notes: entry.notes
      }));

    // Calculate image statistics
    const imageStats = {
      totalImages: imageAnalysisData.length,
      dateRange: {
        start: startDateObj.toISOString().split("T")[0],
        end: endDateObj.toISOString().split("T")[0]
      },
      imagesPerWeek: imageAnalysisData.length > 0 
        ? (imageAnalysisData.length / ((endDateObj - startDateObj) / (1000 * 60 * 60 * 24 * 7))).toFixed(1)
        : 0
    };

    // Calculate progress between consecutive images
    const imageProgressAnalysis = [];
    if (imageAnalysisData.length > 1) {
      for (let i = 0; i < imageAnalysisData.length - 1; i++) {
        const currentImage = imageAnalysisData[i];
        const nextImage = imageAnalysisData[i + 1];
        
        // Calculate weight change between consecutive images
        const weightDiff = nextImage.weight - currentImage.weight;
        const weightPercentChange = currentImage.weight > 0 
          ? ((weightDiff / currentImage.weight) * 100).toFixed(1) 
          : 0;
        
        // Calculate measurement changes
        const measurementChanges = {};
        Object.keys(currentImage.measurements).forEach(measurement => {
          const currentValue = currentImage.measurements[measurement] || 0;
          const nextValue = nextImage.measurements[measurement] || 0;
          const change = nextValue - currentValue;
          
          measurementChanges[measurement] = {
            change,
            percentageChange: currentValue > 0 
              ? ((change / currentValue) * 100).toFixed(1) 
              : 0
          };
        });
        
        // Calculate days between images
        const daysBetween = Math.round(
          (new Date(nextImage.date) - new Date(currentImage.date)) / (1000 * 60 * 60 * 24)
        );
        
        imageProgressAnalysis.push({
          fromDate: currentImage.date,
          toDate: nextImage.date,
          daysBetween,
          weightChange: {
            value: weightDiff,
            percentage: weightPercentChange
          },
          measurementChanges,
          fromImage: currentImage.photo,
          toImage: nextImage.photo
        });
      }
    }

    // Calculate cumulative weight changes for all images
    const cumulativeWeightChanges = [];
    if (imageAnalysisData.length > 0) {
      // Start with the first image
      let firstImage = imageAnalysisData[0];
      let lastImage = imageAnalysisData[imageAnalysisData.length - 1];
      
      // Calculate total weight change from first to last image
      const totalWeightChange = lastImage.weight - firstImage.weight;
      const totalWeightPercentChange = firstImage.weight > 0 
        ? ((totalWeightChange / firstImage.weight) * 100).toFixed(1) 
        : 0;
      
      cumulativeWeightChanges.push({
        fromDate: firstImage.date,
        toDate: lastImage.date,
        daysBetween: Math.round(
          (new Date(lastImage.date) - new Date(firstImage.date)) / (1000 * 60 * 60 * 24)
        ),
        weightChange: {
          value: totalWeightChange,
          percentage: totalWeightPercentChange
        },
        fromImage: firstImage.photo,
        toImage: lastImage.photo
      });
      
      // If there are more than 2 images, calculate changes for each intermediate image
      if (imageAnalysisData.length > 2) {
        for (let i = 1; i < imageAnalysisData.length - 1; i++) {
          const currentImage = imageAnalysisData[i];
          
          // Calculate weight change from first image to current image
          const weightDiffFromStart = currentImage.weight - firstImage.weight;
          const weightPercentChangeFromStart = firstImage.weight > 0 
            ? ((weightDiffFromStart / firstImage.weight) * 100).toFixed(1) 
            : 0;
          
          // Calculate days between first and current image
          const daysFromStart = Math.round(
            (new Date(currentImage.date) - new Date(firstImage.date)) / (1000 * 60 * 60 * 24)
          );
          
          cumulativeWeightChanges.push({
            fromDate: firstImage.date,
            toDate: currentImage.date,
            daysBetween: daysFromStart,
            weightChange: {
              value: weightDiffFromStart,
              percentage: weightPercentChangeFromStart
            },
            fromImage: firstImage.photo,
            toImage: currentImage.photo
          });
        }
      }
    }

    res.status(200).json({
      progressData,
      startEntry,
      endEntry,
      weightChange,
      weightPercentageChange,
      bodyCompositionChanges,
      weightProgressData,
      imageAnalysisData,
      imageStats,
      imageProgressAnalysis,
      cumulativeWeightChanges
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


  