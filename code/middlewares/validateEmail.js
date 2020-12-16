var emailCheck = require('email-check');

async function validateEmail(req, res, next) {
  
  try {
    const isEmail = await emailCheck(req.body.email)
    if(!isEmail) {
      
      next(new Error('Email is invalide'))
      return
    } else next()
  } catch (error) {

    next(new Error('yooooooo'))
  }
}

module.exports = validateEmail