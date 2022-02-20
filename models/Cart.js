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
            required: true,
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