// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Ensure 'uploads/' directory exists
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir); // Save in 'uploads/' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, JPG, and PNG images are allowed!'), false);
//   }
// };

// // Configure Multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: fileFilter
// });

// module.exports = upload;








const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with error handling
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error("Cloudinary configuration error:", error);
}

// Configure Cloudinary Storage with error handling
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-pictures",
    allowed_formats: ["jpg", "jpeg", "png", "PNG"], // Added PNG format
    format: 'png', // This ensures PNG format is preserved
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Update file filter to explicitly allow PNG
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed!'), false);
  }
};

// Configure multer with error handling
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

module.exports = upload;
