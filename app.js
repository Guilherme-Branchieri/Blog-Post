//Load modules
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
//const mongoose = require('mongoose')

//Config
    // Body Parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set("views", "./views")

    // Mongoose

    // Public
    app.use(express.static(path.join(__dirname, 'public')));

// Routes
    app.use('/admin', admin)

// Listen
const PORT = 8081

app.listen(PORT, () => {
    console.log('Server running')
});
