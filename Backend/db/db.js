const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('database Connected...')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = connectDb