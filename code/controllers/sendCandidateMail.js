const sendRes = require('../utils/sendResponse')

const sendCandidateEmail = async (req, res) => {
  sendRes(res, {
    email: req.user.email
  })
}



module.exports = sendCandidateEmail