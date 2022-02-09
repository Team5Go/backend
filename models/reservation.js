const mongoose = require('../db/connection')


const reservationSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, default: Date.now},
    time: {type: String, required: true},
    partySize: {type: Number, default: 1, required: true},
    table: {type: Number, required: true},
    phoneNumber: {type: String, required: true}
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation