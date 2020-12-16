const hashPassword = require('../utils/hashPassword')

async function validatePassword(req, res, next) {
  if (req.body.password.length < 6) {
    next(new Error('Email or Password invalide'))
    return
  } else {
    if (!req.user) req.user = {}
    req.user.password = await hashPassword(req.body.password)
    next()

  }
}

module.exports = validatePassword