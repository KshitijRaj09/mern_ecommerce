const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    userId: {
        type: String
    },
    items: [{
        productId: {
            type: String
        },
        productName: {
            type: String
        },
        quantity: {
            type: String,
            min: [1, "Order quality shouldn't less than 1"],
            required: true,
            default: 1
        },
        price: {
            type: Number
        }
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    ordered_At: {
        type: Date,
        default: () => Date.now()
    }
});

const Order = mongoose.Schema("order", OrderSchema);
module.exports = Order;