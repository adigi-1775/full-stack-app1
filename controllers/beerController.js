const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

//Seed route
router.get('/seed', async (req, res)=>{
  const newBeer = [
    {name: 'Whirlpool', brewry: 'Night Shift', description: 'Fresh, and crisp. Perfect for any season.', img: 'nightshiftbrewing.com/wp-content/uploads/elementor/thumbs/341-NS-Whirlpool-98-edit-copy-scaled-oxu5kp0z4u1ow55v3gmm6n67e61usakh8qxmjeeg1w.jpg', style: 'NEIPA', abv: 4.5},
    {name: 'Northern Heights', brewery: 'Ten Bends', description: 'Tasty New England Double IPA with Citra, Warrior, Mosaic and Amarillo hops. ', img: 'https://i1.wp.com/weirs.com/wp-content/uploads/2020/03/TenBend-NorthernHeights.jpg?fit=576%2C464&ssl=1', style: 'DNEIPA', abv: 8},
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
    const seedItems = await Beer.create(newBeer)
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
//New route
router.get('/new', (req, res)=>{
  try{
    res.render('new.ejs')
  }
    catch(err){
      res.send(err)
  }
})
//Show route
router.get('/:id', (req, res)=>{
  try{
    Beer.findById(req.params.id, (err, foundBeer)=>{
      err ? res.send(err)
      : res.render('show.ejs', {
        beer: foundBeer
      })
    })
  }
    catch(err){
      res.send(err)
  }
})
//Edit route
router.get('/:id/edit', (req, res)=>{
  try{
    Beer.findById(req.params.id, (err, foundBeer)=>{
      err ? res.send(err)
      : res.render('edit.ejs', {
        beer: foundBeer
      })
    })
  }
    catch(err){
      res.send(err)
    }
})
//Update route
router.put('/:id', (req, res)=>{
  // console.log(req.body)
  try{
    Beer.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBeer)=>{
    err ? res.send(err)
    : res.redirect('/beer/' + req.params.id)
    })
  }
  catch(err){
    res.send(err)
  }
})
//Post route
router.post('/', (req, res) => {
	try{
		Beer.create(req.body, (err, createdBeer) => {
			err ? res.send(err)
			: res.redirect('/beer')
		})
	}
	catch (err) {
		res.send(err.message)
	}
})
//Delete route
router.delete('/:id', (req, res) => {
	try{
		Beer.findByIdAndDelete(req.params.id, (err, deletedBeer) => {
			err ? res.send(err)
			: res.redirect('/beer')
		})
	}
	catch (err) {
		res.send(err.message)
	}
})

module.exports = router
