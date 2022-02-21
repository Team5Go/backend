const mongoose = require('../db/connection')
const idPlagin = require('mongoose-id')

const cartSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    totalUniqueItems: Number,
    totalItems: Number,
    cartTotal: Number,
    items: [mongoose.Schema.Types.Mixed], //items details
})
cartSchema.plugin(idPlagin)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
