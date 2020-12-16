const jwt = require('jsonwebtoken')
const User = require('../models/users')

async function authUser(req, res, next) {
  
  let user = await User.findOne({
    email: token.email,
    role: token.role
  })
  if(!user) {
    next(new Error('Permission denied'))
    return
  }
  console.log(user)
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