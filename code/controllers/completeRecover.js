const sendRes = require('../utils/sendResponse')
const User = require('../models/users')
const oAuth = require('../models/oauth')
const jwt = require('jsonwebtoken')
const configEnv = require('../config/config')
const Recover = require('../models/recover')

const completeRecover = async (req, res, next) => {
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
    let responseData = { token }
    const oauth = await oAuth.findOne({
      user_id: req.user._id,
    })
    if (oauth) responseData.oauthId = oauth.oauthId
    await Recover.findOneAndDelete({user_id: req.user._id})
    sendRes(res, responseData)
  } catch (error) {
    next(error)
  }
  
}

module.exports = completeRecover 