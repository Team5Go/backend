const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// index route
router.get('/', (req, res) => {
    Reservation.find({}, (error, reservations) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(reservations)
        }
    })
})

// create/POST route 
router.post('/', (req, res)=> {
    res.header('Content-Type', 'application/json')
    Reservation.create(req.body, (error, createdReservation) => {
        if(error){
            res.status(400).json({error: error.messgae});
        } else {
            // twilio message once form is submitted by user
            client.messages
            .create({
                to: req.body.phoneNumber,
                from: process.env.BUSINESS_PHONE_NUMBER,
                body: 'Thank you for your reservation Guest!'
            })
            .then((message) => console.log(message.sid));
            
            res.status(200).json(createdReservation);
            
        }
    })
})

// show route
router.get('/:id', (req, res) => {
    Reservation.findById(req.params.id, (error, reservation) => {
        if(error){
            res.status(400).json({error: error.message});
        } else {
            res.status(200).json(reservation)
        }
    })
})

// delete route

router.delete('/:id', (req, res)=> {
    Reservation.findByIdAndDelete(req.params.id, (error, reservation) => {
        if(error){
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(reservation)
        }
    })
})

// update route 

router.put('/:id', (req, res)=> {
    Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatereservation)=> {
        if(error){
            res.status(400).send({error: error.message})
        } else {
            res.status(200).send(updatereservation);
        }
    })
})






module.exports = router