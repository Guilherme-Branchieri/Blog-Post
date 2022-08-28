//Load modules
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const { default: mongoose } = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//Config
    //Session
    app.use(session({
        secret: "appblogsecretpassword",
        resave:true,
        saveUninitialized:true
    }))
    app.use(flash())
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })


    // Body Parser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set("views", path.join(__dirname, 'views'));

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('We found some error: ' + err)
    })

    // Public
    app.use(express.static(path.join(__dirname, 'public')));

// Routes
    app.use('/admin', admin)
    
// Listen
const PORT = 8081

app.listen(PORT, () => {
    console.log('Server running')
});
