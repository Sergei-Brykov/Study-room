const jwt = require('jsonwebtoken')
const querystring = require('querystring')
const axios = require('axios')
const configEnv = require('../config/config')
const oAuth = require('../models/oauth')
const User = require('../models/users')
const sendRes = require('../utils/sendResponse')

const FACEBOOK_TOKEN_URL = 'https://graph.facebook.com/v9.0/oauth/access_token';
const GOOGLE_TOKEN_URL = `https://oauth2.googleapis.com/token`

const setFacebookAuth = async (req, res, next) => {
  try {
    const access_token = await getFbAccessTokenFromCode(req.body.code, '/oauth-redirect-f')
    const userInfo = await getFacebookUserInfo(access_token)
    if (!(access_token && userInfo)) {
      next(new Error('Facebook did not allow you to log in on your own behalf'))
      return
    }
    const isOauth = await oAuth.findOne({
      oauthId: userInfo.id,
    })
    if (isOauth) {
      next(new Error('You have already linked your facebook account'))
      return
    }
    const oauth = new oAuth({
      user_id: req.user._id,
      type: 'Facebook',
      oauthId: userInfo.id
    })
    await oauth.save()
    sendRes(res, {
      oauthId: oauth.oauthId
    })
  } catch (error) {
    next(error)
  }
}
async function getFbAccessTokenFromCode(code, url) {
  const body = {
    redirect_uri: `http://localhost:3000${url}`,
    code,
    client_id: configEnv.FACEBOOK_CLIENT_ID,
    client_secret: configEnv.FACEBOOK_CLIENT_SECRET,
  }
  const {
    data
  } = await axios({
    url: `${FACEBOOK_TOKEN_URL}?${querystring.encode(body)}`,
    method: 'get',
  })
  return data.access_token
}

async function getFacebookUserInfo(access_token) {
  const {
    data
  } = await axios({
    url: `https://graph.facebook.com/v9.0/me?fields=email&access_token=${access_token}`,
    method: 'get',
  })
  return data
}

const setGoogleAuth = async (req, res, next) => {
  try {
    const access_token = await getGoogleAccessTokenFromCode(req.body.code, '/oauth-redirect-g')
    const userInfo = await getGoogleUserInfo(access_token)
    if (!(access_token && userInfo)) {
      next(new Error('Google did not allow you to log in on your own behalf'))
      return
    }
    const isOauth = await oAuth.findOne({
      oauthId: userInfo.id,
    })
    if (isOauth) {
      next(new Error('You have already linked your google account'))
      return
    }
    const oauth = new oAuth({
      user_id: req.user._id,
      type: 'Google',
      oauthId: userInfo.id,
    })
    await oauth.save()
    sendRes(res, {
      oauthId: oauth.oauthId
    })
  } catch (e) {
    next(e)
  }

}

async function getGoogleAccessTokenFromCode(code, url) {
  const {
    data
  } = await axios({
    url: GOOGLE_TOKEN_URL,
    method: 'post',
    data: {
      code: code,
      client_id: configEnv.GOOGLE_CLIENT_ID,
      client_secret: configEnv.GOOGLE_CLIENT_SECRET,
      redirect_uri: `http://localhost:3000${url}`,
      grant_type: 'authorization_code',
    },
  })
  return data.access_token
}

async function getGoogleUserInfo(accesstoken) {
  const {data} = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  })
  return data
}

const googleSingIn = async (req, res, next) => {
  try {
    const access_token = await getGoogleAccessTokenFromCode(req.body.code, '/oauth-google-login')
    const userInfo = await getGoogleUserInfo(access_token)
    let responseData = await checkUserAndGetToken(userInfo)
    if (!responseData) {
      next(new Error('Your account is not linked'))
      return
    }
    sendRes(res, responseData)
  } catch (e) {
    next(e)
  }
}

async function checkUserAndGetToken(userInfo) {
  const oauth = await oAuth.findOne({
    oauthId: userInfo.id,
  })
  if (!oauth) return
  const user = await User.findOne({
    _id: oauth.user_id
  })
  if(!user.active) throw new Error('Your account is blocked')
  if (!user) return
  let token = jwt.sign({
    email: user.email,
    role: user.role
  }, configEnv.SECRET)
  return {
    token,
    oauthId: oauth.oauthId
  }
}

const facebookSingIn = async (req, res, next) => {
  try {
    const access_token = await getFbAccessTokenFromCode(req.body.code, '/oauth-facebook-login')
    const userInfo = await getFacebookUserInfo(access_token)
    let responseData = await checkUserAndGetToken(userInfo)
    console.log()
    if (!responseData) {
      next(new Error('Your account is not linked'))
      return
    }
    sendRes(res, responseData)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  setGoogleAuth,
  setFacebookAuth,
  googleSingIn,
  facebookSingIn
}