const mongoose = require('mongoose')
const {Schema, model} = mongoose
const beerSchema = mongoose.Schema({
  name: {type: String, required: true},
  brewery: String,
  description: String,
  img: String,
  style: String,
  abv: Number
})
const Beer = mongoose.model('Beer', beerSchema)
module.exports = Beer
