const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    required: true,
    type: String
  },
  items: [
    {
      productID: String,
      productName: String,
      productPrice: Number,
      quantity: Number
    }
  ]
});

module.exports = Cart = mongoose.model('Cart', cartSchema,"cart");