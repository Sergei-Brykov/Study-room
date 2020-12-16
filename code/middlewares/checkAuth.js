const bodyParser = require('./bodyParser')
const jwt = require('jsonwebtoken')

function checkAuth(req, res, heandler = () => {}) {
  bodyParser(req, res, () => {
    const token = jwt.verify(req.headers['x-authorization'], process.env.SECRET)
    const user = {
      email: token.email,
      role: token.role
    }
    heandler(req, res, user)
  })
}
module.exports = checkAuth