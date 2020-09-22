const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: Array,
    required: true,
  },
  procedure: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = Doctors = mongoose.model("productsData", DoctorSchema);
