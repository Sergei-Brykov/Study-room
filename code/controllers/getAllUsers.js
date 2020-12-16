const sendRes = require('../utils/sendResponse')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const configEnv = require('../config/config')

const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find({})
    sendRes(res, data)
  } catch (error) {
    next(error)
  }
}
module.exports = getAllUsers 