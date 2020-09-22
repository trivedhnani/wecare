const express = require("express");
const router = express.Router();

// Load Doctor model
const Doctor = require("../../models/Doctor");
const Consultation = require("../../models/Consultation");

router.get("/", (req, res) => {
  const speciality = req.query.speciality;
  console.log(speciality);

  Doctor.find({ speciality: speciality }).then((foundDoctors) => {
    res.send(foundDoctors);
  });
});

router.post("/consult", (req, res) => {
  console.log(req.body);
  Consultation.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/consultations", (req, res) => {
  const userId = req.query.userId;
  Consultation.find({ userId: userId }).then((response) => {
    res.send(response);
  });
});

module.exports = router;
