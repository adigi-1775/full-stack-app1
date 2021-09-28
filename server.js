require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, ()=>{
  // console.log('database connected')
})
db.on('error', (err)=>{console.log('ERROR', err)})
db.on('connected', (err)=>{console.log('mongo connected')})
db.on('disconnected', (err)=>{console.log('mongo disconnected')})

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.json())

//Sessions
const SESSION_SECRET = process.env.SESSION_SECRET
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}))

//Controllers
const beerController = require('./controllers/beerController')
app.use('/beer', beerController)

const userController = require('./controllers/userController')
app.use('/users', userController)

//Register/Sign in
app.get('/', (req, res)=>{
  res.render('welcome.ejs')
})

//Listen
app.listen(port, ()=>{
  console.log('server listening')
})
