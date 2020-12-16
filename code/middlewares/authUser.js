const jwt = require('jsonwebtoken')
const User = require('../models/users')

async function authUser(req, res, next) {
  let token
  try {
    token = jwt.verify(req.headers['x-authorization'], process.env.SECRET)
  } catch (error) {
    next(new Error('Permission denied'))
    return
  }
  let user = await User.findOne({
    email: token.email,
    role: token.role
  })
  if(!user) {
    next(new Error('Permission denied'))
    return
  }
  
  if(!user.active) {
    next(new Error('Your account is blocked'))
    return
  }
  req.user = user  
  next()
}
async function authAdmin(req, res, next) {
  if(req.user.role !== 'admin') next(new Error('Permission denied'))
  else next()
}
module.exports = {authUser, authAdmin}