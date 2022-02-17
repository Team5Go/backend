const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// email confirmation setup
const nodemailer = require('nodemailer');


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
router.post('/', async(req, res)=> {
    // res.header('Content-Type', 'application/json')
    Reservation.create(req.body, (error, createdReservation) => {
        if(error){
            res.status(400).json({error: error.messgae});
        } else {

            //create reservation once the form has been submitted
            res.status(200).json(createdReservation);

            // twilio text message once form is submitted by user
            const destinationNumber = req.body.phoneNumber
            client.messages
            .create({
                to: destinationNumber,
                from: process.env.BUSINESS_PHONE_NUMBER,
                body: `Hello ${req.body.firstName}. Your reservation at TeamFive's has been confirmed for ${req.body.date} at ${req.body.time}. For reservation changes or cancellation, please visit the link inside your confirmation email sent to ${req.body.email}.`
            })
            .then((err, message) => {
                if (err){
                    console.log(err)
                } else if (message.sid) {
                    console.log(message.sid)
                }
            });

            // send confirmation email to user once reservation form is submitted by user.
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



            // production or local env access

            const url = process.env.NODE_ENV === "production" ? process.env.APP_URL : process.env.ENV_LOCAL;

            // user email details section
            
                
                let info =  transporter.sendMail({
                    from: '"TeamFive Team" <teamfiveconfirmation@gmail.com>', // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: "Reservation Confirmation ✅", // Subject line
                    text: "Hello", // plain text body
                    html: `<b>Hello ${req.body.firstName}</b> <br> <p>Your reservation at TeamFive's eatery has been confirmed! We are looking forward to seeing you on <b>${req.body.date}</b> at <b>${req.body.time}</b><br> Please <a href="${url}/reservation/${createdReservation._id}">click here</a> to change or cancel your reservation. This email will be your only record of your upcoming reservation. 
                    </p><br> Thank you,<br> <b>TeamFive Eatery</b>`, // html body
                });


                console.log("Message sent: %s", info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                
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
router.put('/edit/:id', (req, res)=> {
    Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatereservation)=> {
        if(error){
            res.status(400).send({error: error.message})
        } else {
            res.status(200).send(updatereservation);
        }
    })
})






module.exports = router