const sgMail = require('@sendgrid/mail')
const Invitation = require('../models/invitations')
const User = require('../models/users')
const Recover = require('../models/recover')
const sendRes = require('../utils/sendResponse')
const configEnv = require('../config/config')
sgMail.setApiKey(configEnv.SQ_MAIL_KEY)

const inviteUser = async (req, res , next) => {
  try {
    if (req.user.role !== 'admin') {
      next(new Error('You a not ADMIN MAZAFAKA!'))
      return
    }
    let user = await User.findOne({
      email: req.body.email
    })
    let invite
    if (user) {
      await Invitation.findOneAndDelete({
        user_id: user._id
      })
      invite = new Invitation({
        user_id: user._id,
      })
      invite.save()
    } else {
      user = new User({
        email: req.body.email,
        name: req.body.email.split('@')[0]
      })
      await user.save()
      console.log(user)
      invite = new Invitation({
        user_id: user._id,
      })
      await invite.save()
    }
    const hash = invite.uuid
    const link = `http://localhost:3000/complete-invitation/${hash}`

    const msg = {
      to: req.body.email,
      from: configEnv.EMAIL_SENDER,
      subject: 'Invitations to Node.js Study Board',
      text: `Hello! We invite you to our Node.js Study Board
    
        email: ${req.body.email}
    
        Click on this link to complete registration:

        ${link}      
        
        If you don't want - just ignore this message!`,
      html: `<h6>Hello! We invite you to our Node.js Study Board</h6>
        <br/>
        <br/>
        email: ${req.body.email}
        <br/>
        <br/>
        Click on this link to complete registration:
        <br/>
        <br/>
        <a href=${link}> ${link}</a>    
        <br/>
        <br/>
        If you don't want - just ignore this message!`
    }
    sendEmail(msg)
    sendRes(res, { message: `Invite link send to ${req.body.email}` })
  } catch (e) {
    next(e)
  }
}
const sendLinkToRecoverPassword = async (req, res, next) => {
  try {
    let user = await User.findOne({
      email: req.body.email
    })
    if(!user) {
      next(new Error('!!! Wrong Email !!!'))
      return
    }
    let recover = new Recover({
      user_id: user._id
    })
    const hash = recover.uuid
    const link = `http://localhost:3000/complete-recover/${hash}`
    
    const msg = {
      to: req.body.email,
      from: configEnv.EMAIL_SENDER,
      subject: 'Password recovery for Study Board',
      text: `Hello! If you fogot your password for Node.js Study Board
    
        Click on this link:

        ${link}`,
      html: `<h6>Hello! If you fogot your password for Node.js Study Board</h6>
        <br/>
        <br/>
        Click on this link:
        <br/>
        <br/>
        <a href=${link}> ${link}</a>`
    }
    sendEmail(msg)
    await recover.save()
    sendRes(res, { message: `Recover link send to ${req.body.email}` })
    console.log(`Recover link send to ${req.body.email}`)
  } catch (e) {
    next(e)
  }
}

function sendEmail(msg) {
  sgMail
    .send(msg)
    .then(() => {
      console.log('done!')
    }, error => {
      console.error(error);
    });
}

module.exports = { inviteUser, sendLinkToRecoverPassword }