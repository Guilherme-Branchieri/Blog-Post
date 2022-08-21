const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('This is the home page!!')
})

router.get('/posts', (req, res) => {
    res.send('This is the post page!')
})

router.get('/categories', (req, res) => {
    res.send('This is the categories page')
})

router.get('/test', (req, res) => {
    res.send('Testing page')
})



//Exporting
module.exports = router