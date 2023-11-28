const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Pet', petSchema)