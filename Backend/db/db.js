const mongoose = require('mongoose')


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      family: 4, // Ye Node ko force karega ki sirf IPv4 use kare (fixes ECONNREFUSED)
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};


module.exports = connectDb