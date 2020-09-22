const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    required: true,
    type: String
  },
  orderTotal: Number, 
  dateCreated: Date,
  deliveryStatus: String,
  items: [
    {
      productID: String,
      productName: String,
      productPrice: Number,     
      quantity: Number
    }
  ]
});

module.exports = Order = mongoose.model('Order', orderSchema,'order');