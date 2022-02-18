const express = require('express')
const router = express.Router()
const Menu = require('../models/menu')

// Index Route
router.get('/menu', (req, res) => {
    Menu.find({}, (error, menus) =>{
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(200).json(menus)
        }
   
    })
})

router.get('/menu/add-to-cart/:id', (req, res)=> {
    
})


module.exports = router