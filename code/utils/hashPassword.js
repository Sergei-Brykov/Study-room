const util = require('util')
const crypto = require('crypto')

async function hashPassword(password) {
  const cryptPromise = util.promisify(crypto.pbkdf2)
  const cryptBuffer = await cryptPromise(password, "$2a$10$ynB/jL7DHD.J2.BTUPFZmO", 100000, 64, 'sha512')
  return cryptBuffer.toString('hex')
}

module.exports = hashPassword