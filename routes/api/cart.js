const express = require("express");
const router = express.Router();

// Load Cart model
const Cart = require("../../models/Cart");

router.post("/", (req, res) => {
  const user = req.body.user;
  const item = {
    productID: req.body.productID,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    quantity: req.body.quantity
  };

  Cart.findOne({ user: user }).then(foundCart => {
    if (foundCart) {
      let products = foundCart.items.map(item => item.productID + "");
      if (products.includes(item.productID)) {
        Cart.findOneAndUpdate(
            {
              user: user,
              items: {
                $elemMatch: { productID: item.productID }
              }
            },
            {
              $inc: { "items.$.quantity": item.quantity }
            }
        )
            .exec()
            .then(() => res.end());
      } else {
        foundCart.items.push(item);
        foundCart.save().then(() => res.end());
      }
    } else {
      Cart.create({
        user: user,
        dateCreated: Date.now(),
        items: [item]
      }).then(() => res.end());
    }
  });
});

router.get("/", (req, res) => {
  console.log(req.query.id);
  Cart.findOne({ user: req.query.id }, function(err, result) {
    if (err) throw err;
    console.log(req.query.id);
    return res.send(result);
  });
});

router.put("/", (req, res) => {
  Cart.findById(req.body.cartId).then(foundCart => {
    foundCart.items = foundCart.items.filter(
        item => item._id != req.body.itemId
    );
    foundCart.save(() => res.end());
  });
});

router.delete("/", (req, res) => {
  Cart.findByIdAndRemove(req.query.id)
      .then(() => res.end())
      .catch(err => res.send(err));
});

module.exports = router;
