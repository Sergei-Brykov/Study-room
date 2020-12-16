const sendRes = require('../utils/sendResponse')
const Invitation = require('../models/invitations')
const jwt = require('jsonwebtoken')
const configEnv = require('../config/config')

const getAllInvintation = async (req, res, next) => {
  try {
    const data = await Invitation.find({}).populate('user_id')
    sendRes(res, data)
  } catch (error) {
    next(error)
  }
  
}
module.exports = getAllInvintation 