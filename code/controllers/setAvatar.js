const sendRes = require('../utils/sendResponse')
const User = require('../models/users')


const setAvatar = async (req, res, next) => {
  try {
    await User.updateOne(
      {email: req.user.email},
      {avatar: req.file.path.slice(12)}
    )
    sendRes(res, null)
  } catch (error) {
    next(error)
  }
}
const getAvatar = async (req, res, next) => {
  try {
    const data = {avatar: req.user.avatar}
    sendRes(res, data)
  } catch (error) {
    next(error)
  }
}
const setName = async (req, res, next) => {
  try {
    await User.updateOne(
      {email: req.user.email},
      {name: req.body.name})    
    sendRes(res, null)
  } catch (error) {
    next(error)
  }
}
const getName = async (req, res, next) => {
  try {
    const data = {name: req.user.name}
    sendRes(res, data)
  } catch (error) {
    next(error)
  }
}
module.exports = {setAvatar, setName, getAvatar, getName} 