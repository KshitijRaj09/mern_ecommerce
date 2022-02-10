const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
            type: Number,
            min: [1, "Order quality shouldn't less than 1"],
            required: true,
            default: 1
        },
        price: {
            type: Number,
            default: 0
        }
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;