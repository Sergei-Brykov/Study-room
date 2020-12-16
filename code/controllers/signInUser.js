const sendRes = require('../utils/sendResponse')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const oAuth = require('../models/oauth')
const configEnv = require('../config/config')

const signInUser = async (req, res, next) => {
  try {
    const candidate = await User.findOne({
      email: req.body.email,
      password: req.user.password
    })
    if(!candidate.active) throw new Error('Your account is blocked')
    if(!candidate) throw new Error('Email or Password invalide')
    let token = jwt.sign({
      email: candidate.email,
      role: candidate.role,
    }, configEnv.SECRET)
    const oauth = await oAuth.findOne({
      user_id: candidate._id
    })
    let responseData = { token }
    if (oauth) {
      responseData.oauthId = oauth.oauthId
    } 
    sendRes(res, responseData)
  } catch (error) {
    console.log(error)
    next(error)
  } 
}

module.exports = signInUser