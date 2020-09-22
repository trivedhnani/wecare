const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");
// Load User model
const Products = require("../../models/ProductsData");

router.post("/submitProducts", (req, res) => {
    // Form validation
        const newProducts = new Products({
          title: req.body.title,
          image1: req.body.image1,
          image2: req.body.image2,
          image3: req.body.image3,
          image4: req.body.image4,
          price: req.body.price,
          desc1: req.body.desc1,
          desc2: req.body.desc2,
          desc3: req.body.desc3,
          desc4: req.body.desc4,
          rating:req.body.rating,
          seller:req.body.seller
        });
        console.log(newProducts);   
        newProducts.save().then(res.json({
          success: true
        }))
        });

router.get("/submitProducts", (req, res) => {
    // Form validation
    Products.find({}, function(err, result) {
    if (err) throw err;
    console.log(res);
    return res
      .status(200)
      .json(result)
    
    })
});
module.exports = router;