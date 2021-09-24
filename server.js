require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port
const methodOverride = require('method-override')
const session = require('express-session')
const Beer = require('./models/beer')
const mongoose = require('mongoose')

db.on('error', (err)=>{console.log('ERROR', err)})
db.on('connected', (err)=>{console.log('mongo connected')})
db.on('disconnected', (err)=>{console.log('mongo disconnected')})

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}))

//Controllers
const beerController = require('./controllers/beerController')
app.use('/beer', beerController)

// const userController = require('./controllers/userController')
// app.use('/user', userController)
