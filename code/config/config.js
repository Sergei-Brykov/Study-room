require('dotenv').config()
const configEnv = {
  ADMIN: process.env.ADMIN,
  EMAIL_SENDER: process.env.EMAIL_SENDER,

  PORT: process.env.PORT,

  SALT: process.env.SALT,

  MONGO_LINK: process.env.MONGO_LINK,

  SQ_MAIL_KEY: process.env.SQ_MAIL_KEY,

  SECRET: process.env.SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
}
module.exports = configEnv