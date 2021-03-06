const mongoose = require('../db/connection')


const reservationSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    date: {type: Date, default: Date.now},
    time: {type: String, required: true},
    partySize: {type: String, required: true},
    table: {type: Number, required: true},
    phoneNumber: {type: String}
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation