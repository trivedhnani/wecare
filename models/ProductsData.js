const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const ProductsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type:String,
    required: true
  },
  image3: {
    type:String,
    required:true
  },
  image4: {
    type:String,
    required:true
  },
  price: {
    type: Number,
    required: true
  },
  desc1: {
    type: String,
    required: true
  },
  desc2:{
      type: String,
      required:true
  },
  desc3:{
      type:String,
      required:true
  },
  desc4:{
      type:String,
      required:true
  },
  rating:{
      type:Number,
      required:true
  },
  seller:{
      type:String,
      required:true
  }
});

module.exports = Products = mongoose.model("productsData", ProductsSchema);