require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 4000;
const cors = require('cors')
const reservationController = require('./controllers/reservations')
const menuController = require('./controllers/menu')






app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', reservationController);
app.use('/items', menuController);

app.listen(PORT, () => console.log(`Running on Port ${PORT}`))

