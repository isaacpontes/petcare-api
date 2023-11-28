const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String }
})

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err)
      } else {
        this.password = hashedPassword;
        next()
      }
    })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema)