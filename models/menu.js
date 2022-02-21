const mongoose = require('../db/connection')
const idPlagin = require('mongoose-id')

const menuSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String
})

menuSchema.plugin(idPlagin)

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu