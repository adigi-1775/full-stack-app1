// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   img: String,
//   price: Number,
//   qty: Number
// })

const beerSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  qty: Number
})


const Beer = model('Beer', beerSchema)
module.exports = Beer
