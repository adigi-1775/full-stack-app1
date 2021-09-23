const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

router.get('/', (req, res)=>{
  Beer.find({}, (err, allBeers)=>{
    res.render('index.ejs', {
      beers: allBeers
    })
  })
})

router.get('/new', (req, res)=>{
  res.render('new.ejs')
})

router.get('/seed', (req, res)=>{
  Beer.create([
    {name: 'Whirlpool', style: NEIPA, }
  ], (err, data)=>{
    if(err){
    console.log(err)
    }
    res.redirect('/beer')
  })
})
