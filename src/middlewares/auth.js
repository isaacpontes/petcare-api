const jwt = require("../helpers/jwt")
const usersService = require("../services/users-service")

module.exports = {
  ensureAuth: async function (req, res, next) {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'unauthorized: no token provided' })
    }
  
    const token = authorizationHeader.replace(/Bearer /, '')
    
    try {
      const payload = await jwt.verify(token)
      const user = await usersService.findByEmail(payload.email)
      req.user = user
      next()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}