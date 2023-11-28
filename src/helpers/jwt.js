const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/environment')

module.exports = {
  sign: function (payload) {
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '7d' })
    return token
  },
  verify: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_KEY, (err, payload) => {
        if (err) {
          reject(err)
        } else {
          resolve(payload)
        }
      })
    })
  }
}