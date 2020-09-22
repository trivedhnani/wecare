const express = require("express");
const router = express.Router();

// Load Cart model
const Amount = require("../../models/Amount");
router.post("/", async (req, res) => {
    const UserId = req.body.UserId
    const amount = req.body.amount
    console.log(amount)
    Amount.findOne({ user: UserId }).then(amountExists => {
        if (amountExists) {
            Amount.updateOne(
                { user: UserId },
                {
                    $inc: {
                        amount: amount
                    }
                }
            )
                .exec()
                .then(docs => {
                    console.log(docs);
                    res.status(204).send(docs);
                })
                .catch(err => {
                    console.log(err);
                    res.status(401).json({
                        error: err
                    });
                });
        } else {
            const user = new Amount({
                user: UserId,
                amount: req.body.amount
            });
            try {
                const savedUser = user.save();
                res.status(200).send(savedUser);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    });
});

router.get("/", async (req, res) => {
    const UserId = req.query.id
    Amount.findOne({ user: UserId })
        .then(docs => {
                res.status(200).json({ message: docs });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                error: err
            });
        });
});

module.exports = router;
