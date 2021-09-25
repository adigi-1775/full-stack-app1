const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

router.get('/', (req, res)=>{
  Beer.find({}, (err, allBeers)=>{
    res.render('index.ejs', {
      beer: allBeers
    })
  })
})
//New route
router.get('/new', (req, res)=>{
  res.render('new.ejs')
})
//Seed route
router.get('/seed', async (req, res)=>{
  const newBeer = [
    {name: 'Whirlpool', description: 'Fresh, and crisp. Perfect for any season.', img: 'nightshiftbrewing.com/wp-content/uploads/elementor/thumbs/341-NS-Whirlpool-98-edit-copy-scaled-oxu5kp0z4u1ow55v3gmm6n67e61usakh8qxmjeeg1w.jpg', style: 'NEIPA', abv: 4.5},
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
    // {name: , description: , img: , style: , abv: },
  ]
  try {
    const seedItems = await Beer.create(newBroducts)
    res.send(seedItems)
  }  catch (err) {
    res.send(err.message)
  }
})
//index
router.get('/', (req, res)=>{
  try{
    Beer.find({}, (err, allBeers)=>{
      err ? res.send(err)
      : res.render('index.ejs', {
        beer: allBeers
      })
    })
  }
  catch (err){
    res.send(err)
  }
})
//Show route
router.get('/:id', (req, res)=>{
  Beer.findById(req.params.id, (error, foundBeer)=>{
    // console.log(foundBeer)
    res.render('show.ejs', {beer: foundBeer})
  })
})
//Post route
// router.post('/', (req, res)=>{
//   if(req.session.currentUser)
//   if(req.body.)
// })
//Delete route
router.delete('/:id', (req, res)=>{
  Beer.findByIdAndDelete(req.params.id, (error, deletedBeer)=>{
    if(error){
      res.send(error)
    }else{
      res.redirect('/beer')
    }
  })
})
//Edit route
router.get('/:id/edit', (req, res)=>{
  Beer.findById(req.params.id, (error, foundBeer)=>{
    if(error){
      res.send(error)
    }else{
      res.render('edit.ejs',{
        beer: foundBeer,
      })
    }
  })
})
//Update route
router.put('/:id', (req, res)=>{
  Beer.findByIdAndUpdate(req.params.id, req.body, {new: true,}, (error, updatedBeer)=>{
    if(error){
      res.send(error)
    }else{
      res.redirect('/beer')
    }
  })
})
module.exports = router
