const express = require("express");
const router = express.Router();
const Stripe = require("stripe")


// Load Order model
const Order = require("../../models/Order");
const stripe = new Stripe("sk_test_Mk9avksL3EnUDYsISBUcgggL00AhQwjn0P");

router.post('/', (req, res) => {
    console.log(req)
    const user = req.body.user;
    const orderTotal = req.body.total;
    const deliveryStatus = req.body.status;
    const dateCreated = Date.now();
    const items = [];

    for (var i=0;i< req.body.items.length;i++) {
        const item = {
            productID: req.body.items[i].productID,
            productName: req.body.items[i].productName,
            productPrice: req.body.items[i].productPrice,
            quantity: req.body.items[i].quantity
        }
        items.push(item);
    };
    console.log(items);
    Order.create({
        user: user,
        orderTotal: orderTotal,
        dateCreated: dateCreated,
        deliveryStatus: deliveryStatus,
        items: items
    })
        .then(() => res.end());
});

router.get('/', (req, resu) => {
    Order.find({ user: req.query.id }, function (err, result) {
        if (err) throw err;
        console.log(result);
        return (resu.send(result));
    })
});

router.delete('/', (req, res) => {
    Order.findByIdAndRemove(req.query.id)
        .then(() => res.end())
        .catch((err) => res.send(err));
});

// router.post('/test1', async (req, res) => {
//     console.log('test')
//     const {id, amount} = req.body;
//     try {
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency: "USD",
//             description: "Delicious empanadas",
//             payment_method: id,
//             confirm: true
//         });
//
//         console.log(payment);
//
//         return res.status(200).json({
//             confirm: "abc123"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// });

module.exports = router;