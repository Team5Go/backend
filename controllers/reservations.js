const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')

// route testing

router.get('/', (req, res) => {
    res.send('Hello')
})






module.exports = router