const express = require('express')
const authController = require('../controllers/auth-controller')
const { ensureAuth } = require('../middlewares/auth')
const petsController = require('../controllers/pets-controller')

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/pets', ensureAuth, petsController.index)
router.post('/pets', ensureAuth, petsController.save)
router.put('/pets/:_id', ensureAuth, petsController.update)
router.delete('/pets/:_id', ensureAuth, petsController.delete)

module.exports = router