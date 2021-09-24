const beerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  img: String,
  style: String,
  abv: Number
})
const Beer = model('Beer', beerSchema)
module.exports = Beer
