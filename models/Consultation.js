const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const ConsultationSchema = new Schema({
  doctorId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
});

module.exports = Consultation = mongoose.model(
  "Consultation",
  ConsultationSchema,
  "consultations"
);
