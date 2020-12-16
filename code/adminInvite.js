require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const mongoose = require('mongoose')

const User = require('./models/users')
const Invitation = require('./models/invitations')

sgMail.setApiKey(process.env.SQ_MAIL_KEY);
(async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch(e) {
    process.stderr.write('DB dont up')
    process.stderr.write(err.message);
    process.exit(1);
  }
  
  let user = await User.findOne({ email: process.env.ADMIN })
  let invite
  if (user) {
    console.log(`!!!WORN!!!:you have already sent the message, 
      the admin has not accepted it yet, we will send it again 
      but don’t fuck people!`)
    // console.log(user._id)
    await Invitation.findOneAndDelete({ user_id:user._id})
    invite = new Invitation({
      user_id: user._id,
    })
    invite.save()
  } else {
    user = new User({
      email: process.env.ADMIN,
      role: 'admin'
    })
    await user.save()
  
    invite = new Invitation({
      user_id: user._id,
    })
    await invite.save()
  }
  
  const hash = invite.uuid
  const link =`http://localhost:3000/complete-invitation/${hash}`
  
  const msg = {
    to: process.env.ADMIN,
    from: process.env.EMAIL_SENDER, 
    subject: 'Invitations to Node.js Study Board',
    text: `Hello Admin we invite you to our Node.js Study Board
  
      email: ${process.env.ADMIN}
  
      Click on this link to complete registration:

      ${link}      
      
      If you don't want - just ignore this message!`,
    html: `<h6>Hello Admin we invite you to our Node.js Study Board</h6>
    <br/>
    <br/>
    email: ${process.env.ADMIN}
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
  sgMail
    .send(msg)
    .then(() => {
      console.log('done!')
      process.exit(0)
    }, error => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
})()
