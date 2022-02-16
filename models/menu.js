const mongoose = require('../db/connection')

const menuSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    description: String
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu