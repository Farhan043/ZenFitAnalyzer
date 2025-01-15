var userModel = require('../models/user.model');


module.exports.createUser = async ({ name, email, password, gender, dob, weight, height }) => {
  if (!name || !email || !password || !gender || !dob || !weight || !height) {
    throw new Error(' all fields are required')
  }
  const user = await userModel.create({
    name,
    email,
    password,
    gender,
    dob,
    weight,
    height,
  })
  return user
}






