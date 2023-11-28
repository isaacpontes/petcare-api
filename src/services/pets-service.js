const Pet = require("../database/models/Pet")

module.exports = {
  findByOwnerId: async function (_id) {
    const pets = await Pet.find({ owner: _id })
    return pets
  },

  create: async function (name, owner) {
    const pet = new Pet({ name, owner })
    await pet.save()
    return pet
  },

  update: async function (_id, name, ownerId) {
    const pet = await Pet.findById(_id)
    if (!pet.owner._id.equals(ownerId)) throw new Error('Forbidden')
    pet.name = name
    await pet.save()
    return pet
  },

  delete: async function (_id, ownerId) {
    const pet = await Pet.findById(_id)
    if (!pet.owner._id.equals(ownerId)) throw new Error('Forbidden')
    await pet.deleteOne()
  }
}