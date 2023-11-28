const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/environment')

mongoose.connect(DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))