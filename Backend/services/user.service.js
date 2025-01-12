var userModel = require('../models/user.model');

module.exports.createUser = async ({ name, email, password, age }) => {
  if (!name || !email || !password || !age) {
    throw new Error(' all fields are required')
  }
  const user = await userModel.create({
    name,
    email,
    password,
    age
  })
  return user
}