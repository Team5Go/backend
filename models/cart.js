const mongoose = require('../db/connection')

const cartSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    
    order: [
        {
            menuItem: {type:mongoose.Types.ObjectId, ref: 'Menu'},
            quantity: {type: Number, default: 1}
        }
        
    ],
    
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart