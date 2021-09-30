const express = require('express')
const router = express.Router()
const Beer = require('../models/beer')

//Seed route
router.get('/seed', async (req, res)=>{
  const newBeer = [
    {name: 'Whirlpool', brewery: 'Night Shift', description: 'Soft and citrusy, Whirlpool is a hazy New England pale ale. Pours hazy blonde with a nose of ripe peach and grapefruit. Sips juicy, fruity, and crisp, with minimal bitterness and big clementine notes. A bright, vibrant beer that’s wonderfully drinkable and remarkably refreshing.', img: 'https://nightshiftbrewing.com/wp-content/uploads/elementor/thumbs/341-NS-Whirlpool-98-edit-copy-scaled-oxu5kp0z4u1ow55v3gmm6n67e61usakh8qxmjeeg1w.jpg', style: 'NEIPA', abv: 4.5},
    {name: 'Northern Heights', brewery: 'Ten Bends', description: 'Northern Heights is brewed with wheat and oats, then double dry-hopped with Mosaic and Citra hops. It is the result of an evolution of craft brewing that began in a shed in the northern woods of Vermont and has culminated in a definitive and well-balanced ale that will take your perception of a Double IPA to new heights.', img: 'https://i1.wp.com/weirs.com/wp-content/uploads/2020/03/TenBend-NorthernHeights.jpg?fit=576%2C464&ssl=1', style: 'DNEIPA', abv: 8},
    {name: 'Arizona Sun', brewery: 'Mast Landing', description: 'What better way to capture the power of big, warm Western skies than with a 100% Citra-hopped double IPA. Arizona Sun captures the shimmering joy of a beautiful day through two rounds of dry hopping; a solar burst of citrus notes with a balanced, hazy body to refresh your restless palate.', img: 'https://www.portlandoldport.com/wp-content/uploads/2021/01/140565296_1392268131122725_899512648042853735_o-1.jpg', style: 'DIPA', abv: 8.1},
    {name: 'Ecstasy of Gold', brewery: 'Widowmaker', description: 'Cloudy, light-copper coloring and a pungent fruit aroma when poured. A balanced fruit taste with a sweet, malty backbone.', img: 'https://www.widowmakerbrewing.com/uploads/b/4c668d0ad02771728b34aad71852228dd4a9d61cbc0d2e023db2282ec975adda/Ecstasy%20of%20Gold_1596224624.JPG', style: 'IPA', abv: 7.2},
    {name: 'Ninja vs Unicorn', brewery: 'Pipeworks', description: 'What better way to capture the power of big, warm Western skies than with a 100% Citra-hopped double IPA. Arizona Sun captures the shimmering joy of a beautiful day through two rounds of dry hopping; a solar burst of citrus notes with a balanced, hazy body to refresh your restless palate.', img: 'https://www.beeroftheday.com/photos/ninja-vs-unicorn-2813_0.jpg', style: 'DIPA', abv: 8},
    {name: '52 Fatal Strikes', brewery: 'Widowmaker', description: 'A NEIPA fermented with both house and sake yeast this beer is brewed with a base of barley, wheat, and rice and hopped with a deadly amount of Cashmere, Mosaic, and Topaz. In order to sharpen this beers edges we hand-zest a couple hundred limes to compliment the hops. Crisp and refreshing this beer has big notes of key lime pie, guava, and citrus rind but finished dry and light from the sake yeast. Duel of the iron mic, its 52 fatal strikes!', img: 'https://untappd.akamaized.net/photos/2021_05_28/85113f07e15b7e300edd92d5abdb6413_640x640.jpg', style: 'NEIPA', abv: 5.8},
    {name: 'Hopsmoker', brewery: 'Widowmaker', description: 'Pouring a golden, hazy yellow Hopsmoker is brimming with notes of pineapple gummies, bubblegum, and pine. This beer will hit you with a juicy burst of flavor and leave you with a resinous finish coating your tongue. Utilizes a hop blend of Galaxy, Simcoe, and CTZ and an addition of terpines post fermentation. Its the beer we dream of when the green clouds are wafting from our kettle. Follow the smoke!', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09JryHb6VEL4VZSkuZrA6c8EvqiwaFzsJHQ&usqp=CAU', style: 'Imperial IPA', abv: 8.8},
    {name: 'Cloud Candy', brewery: 'Mighty Squirrel', description: 'A hazy, deep golden-orange, medium bodied New England IPA double dry-hopped with Mosaic and Citra hops. True to its name, aromas of papaya, mango, and starfruit dominate this juicy IPA leading to a smooth and fluffy finish', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyXZYI-LBAFiJb7PHEXl7VbTtu6xLv1zEVA&usqp=CAU', style: 'NEIPA', abv: 6.5},
    {name: 'Windbreaker', brewery: 'Mast Landing', description: 'Windbreaker is the IPA everyone needs in their lineup. A bursting palate of Citra and Idaho 7 brings out tropical notes and a pleasant citrusy quality, with a modest 6.5% and a balanced, refreshing body that encourages sip after sip. Dont be surprised when your friends get jealous of your fridge fashion, just congratulate yourself on having impeccable taste.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGtbqUKK9TNkqmm1iKLg88M8mI2om5oLQjQ&usqp=CAU', style: 'DIPA', abv: 6.5},
    {name: 'Connect The Dots', brewery: 'Progression', description: 'We allowed this beer to free rise during primary fermentation with our whirlpool hops riding its currents. We heavily dry hopped this beer with Citra and a small smattering of Simcoe which we feel rounds out and exemplifies the heavy tropical qualities and characteristics associated with our Citra hops. Silky slick, clean and magical tropical citrus notes shine through and through. Different in every way.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPPIEqdaD1AR0SOSn6OoJYuAQd_hO7oKA-g&usqp=CAU', style: 'KVEIK NEIPA', abv: 7},
    {name: 'Cape Time', brewery: 'Progression', description: 'Smooth and refreshing New England IPA, CAPE TIME has everything you could want from a medium bodied New England IPA. Haze, intense tropical flavors and aromas and a pillowy mouthfeel. Its hopped with one of our favorite hops, Simcoe, imparting fantastic, melon, berry and fresh pineapple flavors that work perfectly well for a refreshing crushable New England style IPA.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrBqVTGQOO7URr9hOBcZR2oEnJrDfwihVJgA&usqp=CAU', style: 'NEIPA', abv: 5.2},
    {name: 'Solid Wall of Sound', brewery: 'Untold', description: 'This 6.7% IPA pours a hazy, golden straw color and greets you with sweet, slightly dank aromas on the nose. Citra and Moutere hops conjure up luscious, tropical notes of pineapple and papaya along with pomegranate, and the palate is balanced out on the finish by a mild citrus pith and subtle pine notes.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSmkBJCDW2YMXLz4BUma9DkoYLEKVLhV6Kw&usqp=CAU', style: 'NEIPA', abv: 6.7},
    {name: 'Push The Sky Away', brewery: 'Small Change', description: 'This New England IPA is packed with Citra, El Dorado, and Mosaic hops. Very juicy and easy drinking with a slight hint of bitterness. Notes of tropical fruit, orange peel, peach, grapefruit.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNWJb0sK7BboclNnoXKNFz5TZCYnFXZ9JE4g&usqp=CAU', style: 'NEIPA', abv: 6},
    {name: 'The 87', brewery: 'Night Shift', description: 'Lovingly named after our address in Everett, The 87 is a juicy, tropical New England DIPA. Pours hazy with a glowing shade of orange. A simple, clean malt bill allows the hops to shine. Aromas of sweet orange and guava lead into a stone fruit burst of candied peach and nectarine. Soft, pillowy mouthfeel. Very drinkable for 8% ABV.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhJ4H4sqdI6vr1h7C6cLe9Ux6_85PzCQxewA&usqp=CAU', style: 'ADIPA', abv: 8},
    {name: 'One Hop This Time SIMCOE', brewery: 'Night Shift', description: 'One Hop This Time is a series of hazy, single hop IPAs. Where most IPAs feature multiple hops, this beer was brewed with just one. By tasting a single hop in isolation, you can truly enjoy its unique range of delicious flavors. Crack it, sip it, and maybe dance a little.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCJBiyOMUMCus5HIMbJYB3DBTzZugin4kXQ&usqp=CAU', style: 'Single Hop IPA', abv: 6},
    {name: 'Haze of the Dead', brewery: 'Destihl', description: 'Our Deadhead IPA Series melds the strong vibe of our favorite music with the beer we love to drink, elevating both into a higher state of consciousness. Our Haze of the Dead reverberates with booming amounts of Citra and Simcoe hops piercing through the melodic mouthfeel of flaked oats, wheat & pils malts, concocting into a Juicy, Hazy Double IPA that will be sure to wake the dead.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMk5-yhy_CfD1B7rE2maMc7i_Hxi8m0VFltA&usqp=CAU', style: 'DIPA', abv: 8.5},
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
