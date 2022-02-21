const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')
// email confirmation setup
const nodemailer = require('nodemailer');


router.get('/cart', (req, res) => {
    Cart.find({}, (error, cart) =>{
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
        console.log(error);
        if(error){
            res.status(400).json({error: error.messgae});
        } else {

            //create order once the form has been submitted
            res.status(200).json(createdOrder);



             // send confirmation email to user once order form is submitted by user.
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "teamfiveconfirmation@gmail.com", 
                        pass: process.env.EMAIL_INFO, 
                    },
                    // ensure we can test email confirmation from local host
                    tls:{
                        rejectUnauthorized: false
                    }
                });

            //  user email details section
        
                let info =  transporter.sendMail({
                    from: '"TeamFive Team" <teamfiveconfirmation@gmail.com>', // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: "Reservation Confirmation ✅", // Subject line
                    text: "Hello", // plain text body
                    html: `<b>Hello ${req.body.firstName}</b> <br> <p>Your food order has been recieved and will be ready shortly!</b><br> Please <a href="http://localhost:4000/menu/cart/${createdOrder._id}">click here</a> to change or cancel your order. This email will be your only record of your order. 
                    </p><br> Thank you,<br> <b>TeamFive Eatery</b>`, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                
        }
    })
})


//Show route
router.get('/cart/:id', (req, res) => {
    Cart.findById(req.params.id, (error, cart) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
                res.status(200).json(cart)
            
        }
    })
})

//Delete route
router.delete('/cart/:id', (req, res) => {
    Cart.findByIdAndDelete(req.params.id, (error, cart) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
                res.status(200).json(cart)
                console.log('item was deleted');
        }
    })
})

//update route
router.put('/cart/:id', (req, res) => {
    Cart.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, cart) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
                res.status(200).json(cart)
            
        }
    })
})

// delete route
router.delete('/cart/:id', (req, res)=> {
    Cart.findByIdAndDelete(req.params.id, (error, order) => {
        if(error){
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(order)
        }
    })
})

// update route 
router.put('/cart/edit/:id', (req, res)=> {
    Cart.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updateOrder)=> {
        if(error){
            res.status(400).send({error: error.message})
        } else {
            res.status(200).send(updateOrder);
        }
    })
})



module.exports = router