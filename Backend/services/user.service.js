var userModel = require('../models/user.model');

module.exports.createUser = async ({ name, email, password, age }) => {
  if (!name || !email || !password) {
    throw new Error(' all fields are required')
  }
  const user = await userModel.create({
    name,
    email,
    password,
  })
  return user
}