const petsService = require("../services/pets-service")

module.exports = {
  index: async function (req, res) {
    try {
      const pets = await petsService.findByOwnerId(req.user._id)
      return res.json(pets)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  save: async function (req, res) {
    const { name } = req.body
    try {
      const pet = await petsService.create(name, req.user._id)
      return res.status(201).json(pet)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  update: async function (req, res) {
    const { _id } = req.params
    const { name } = req.body
    try {
      const pet = await petsService.update(_id, name, req.user._id)
      return res.json(pet)
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  },

  delete: async function (req, res) {
    const { _id } = req.params
    try {
      await petsService.delete(_id, req.user._id)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  }
}