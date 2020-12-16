const sendRes = require('../utils/sendResponse')
const User = require('../models/users')


const blockUser = async (req, res, next) => {
  try {
    await User.updateOne(
      {email: req.body.email},
      {active: false})
    sendRes(res, null)
  } catch (error) {
    next(error)
  }
}
const unblockUser = async (req, res, next) => {
  try {
    await User.updateOne(
      {email: req.body.email},
      {active: true})
    sendRes(res, null)
  } catch (error) {
    next(error)
  }
}
module.exports = {blockUser , unblockUser} 