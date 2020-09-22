const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amountSchema = new Schema({
    user: {
        required: true,
        type: String
    },
    amount:
        {
            // required: true,
            type: Number
        }

});

module.exports = Amount = mongoose.model('Amount', amountSchema,"amount");