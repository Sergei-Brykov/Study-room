const Invitation = require('../models/invitations')
const User = require('../models/users')
const Recover = require('../models/recover')

async function checkHash(req, res, next) {
  const hash = req.body.hash
  let candidate
  if (req.url == '/invitation' || req.url == '/complete-invitation') {
    candidate = await Invitation.findOne({
      uuid: hash
    })
  } else if (req.url == '/recover' || req.url == '/complete-recover') {
    candidate = await Recover.findOne({
      uuid: hash
    })
  }
  if(!candidate) {
    next(new Error(`Invalide ${req.url.slice(1)}`))
    return
  }
  if(!(candidate.expiredAt > new Date)) {
    next(new Error(`${req.url.slice(1)} timed out`))
    return
  }
  req.user = await User.findOne({
    _id: candidate.user_id
  })
  
  next()
}
module.exports = checkHash