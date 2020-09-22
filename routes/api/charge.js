const express = require("express");
const router = express.Router();
const Stripe = require("stripe")


// don't commit your real stripe secret key... use env variables!!
// https://www.leighhalliday.com/secrets-env-vars-nextjs-now
const stripe = new Stripe("sk_test_Mk9avksL3EnUDYsISBUcgggL00AhQwjn0P");
router.post('/', async (req, res) => {
    const {id, amount} = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount:amount,
            currency: "USD",
            description: "We Care",
            payment_method: id,
            confirm: true
        });
        return res.status(200).json({
            confirm: payment
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;