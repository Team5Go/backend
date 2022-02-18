const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')

// Index Route
router.get('/cart', (req, res) => {
    Cart.find({}).populate({path: 'order', populate:{path:'menuItem', module:'Menu'}}).exec((error, cart) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
                res.status(200).json(cart)
            
        }
    })
})

// create/POST route 
router.post('/cart', async(req, res)=> {
    Cart.create(req.body, (error, createdOrder) => {
        if(error){
            res.status(400).json({error: error.messgae});
        } else {

            //create order once the form has been submitted
            res.status(200).json(createdOrder);
            console.log(createdOrder)
                
        }
    })
})



//show route
router.get('/cart/:id', (req, res) => {
    Cart.findById(req.params.id).populate({path: 'order', populate:{path:'menuItem', module:'Menu'}}).exec((error, cart) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
                res.status(200).json(cart)
            
        }
    })
})



module.exports = router