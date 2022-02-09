const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const reservationController = require('./controllers/reservations')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', reservationController);

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))

