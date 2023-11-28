const User = require("../database/models/User")

module.exports = {
  create: async function (name, email, password) {
    const user = new User({ name, email, password })
    await user.save()
    return user
  },

  findByEmail: async function (email) {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found!')
    return user
  }
}