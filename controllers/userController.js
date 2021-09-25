const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const User = require('../models/users')

router.get('/register', (req, res)=>{
  console.log(req.body)

  const salt = bcrypt.genSaltSync(10)
  req.body.password = bcrypt.hashSync(req.body.password, salt)
  User.findOne({username: req.body.username}, (error, userExists)=>{
    if(userExists){
      res.send('That username is already in use.')
    }else{
      User.create(req.body, (error, createdUser)=>{
        req.session.currentUser = createdUser
      })
    }
  })
})

router.get('/signin', (req, res)=>{
  res.render('users/signin.ejs')
})

router.post('/signin', (req, res)=>{
  User.findOne({username: req.body.username}, (error, foundUser)=>{
    if(foundUser){
      const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
      if(validLogin){
        req.session.currentUser = foundUser
        res.send('user signed in')
      }else{
        res.send('Invalid username or password')
      }
    }else{
      res.send('username or password does not exist')
    }
  })
})

module.exports = router
