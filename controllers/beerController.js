const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

//Seed route
router.get('/seed', async (req, res)=>{
  const newBeer = [
    {name: 'Whirlpool', brewry: 'Night Shift', description: 'Fresh, and crisp. Perfect for any season.', img: 'https://nightshiftbrewing.com/wp-content/uploads/elementor/thumbs/341-NS-Whirlpool-98-edit-copy-scaled-oxu5kp0z4u1ow55v3gmm6n67e61usakh8qxmjeeg1w.jpg', style: 'NEIPA', abv: 4.5},
    {name: 'Northern Heights', brewery: 'Ten Bends', description: 'Tasty New England Double IPA with Citra, Warrior, Mosaic and Amarillo hops. ', img: 'https://i1.wp.com/weirs.com/wp-content/uploads/2020/03/TenBend-NorthernHeights.jpg?fit=576%2C464&ssl=1', style: 'DNEIPA', abv: 8},
    {name: 'Arizona Sun', brewery: 'Mast Landing', description: '', img: 'https://www.portlandoldport.com/wp-content/uploads/2021/01/140565296_1392268131122725_899512648042853735_o-1.jpg', style: 'DIPA', abv: 8.1},
    {name: 'Ecstasy of Gold', brewery: 'Widowmaker', description: '', img: 'https://www.widowmakerbrewing.com/uploads/b/4c668d0ad02771728b34aad71852228dd4a9d61cbc0d2e023db2282ec975adda/Ecstasy%20of%20Gold_1596224624.JPG', style: 'IPA', abv: 7.2},
    {name: 'Ninja vs Unicorn', brewery: 'Pipeworks', description: '', img: 'https://www.beeroftheday.com/photos/ninja-vs-unicorn-2813_0.jpg', style: 'DIPA', abv: 8},
    {name: '52 Fatal Strikes', brewery: 'Widowmaker', description: '', img: 'https://untappd.akamaized.net/photos/2021_05_28/85113f07e15b7e300edd92d5abdb6413_640x640.jpg', style: 'NEIPA', abv: 5.8},
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
    // {name: '', brewery: '', description: '', img: '', style: '', abv: },
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
