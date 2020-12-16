const sendRes = require('../utils/sendResponse')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const configEnv = require('../config/config')
const Invitation = require('../models/invitations')


const completeInvitation = async (req, res, next) => {
  try {
    await User.updateOne({
      _id: req.user._id,
      email: req.user.email
    }, {
      password: req.user.password
    })
    let token = jwt.sign({
      email: req.user.email,
      role: req.user.role
    }, configEnv.SECRET)
    await Invitation.findOneAndDelete({user_id: req.user._id})
    sendRes(res, { token })
  } catch (error) {
    next(error)
  }
  
}
module.exports = completeInvitation 