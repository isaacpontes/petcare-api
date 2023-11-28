const jwt = require("../helpers/jwt")
const usersService = require("../services/users-service")

module.exports = {
  register: async function (req, res) {
    const { name, email, password } = req.body
    try {
      const user = await usersService.create(name, email, password)
      const token = jwt.sign({ _id: user._id, email: user.email })
      return res.status(201).json({
        user: { _id: user._id, name: user.name, email: user.email },
        token
      })
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body
    try {
      const user = await usersService.findByEmail(email)
      const isSame = user.checkPassword(password)
      if (!isSame) throw new Error('Invalid credentials!')
      const token = jwt.sign({ _id: user._id, email: user.email })
      return res.status(201).json({
        user: { _id: user._id, name: user.name, email: user.email },
        token
      })
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}