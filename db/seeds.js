const mongoose = require('./connection')
const Menu = require('../models/menu')
const menuSeeds = require('./menuSeeds')

Menu.deleteMany({})
.then(() => {
})
.then(() => {
    return Menu.insertMany(menuSeeds)
})
.then(data => console.log(data))
.catch(err => console.log(err))
.finally(() => {
    process.exit()
})