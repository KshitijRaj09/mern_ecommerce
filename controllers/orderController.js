const User = require("../models/User");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const config = require("config");
const stripe = require("stripe")(config.get("stripeSecretKey"));
const { payment_fail, server_error } = require("../constants/constantMsg");

const getOrder = async (req, res) => {
    console.log("inside getorder")
    const userId = req.params.id;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    return res.json(orders);
}

const checkout = async (req, res) => {
    console.log("inside checkout");
    try {
        const userId = req.params.id;
        const { source } = req.body;
        const user = await User.find({ _id: userId });
        let cart = await Cart.find({ userId });
        const { emailID } = user;
        if (cart) {
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source,
                emailID,
            })
            if (charge) {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill
                })
            }
            else {
                return res.status(503).json({
                    success: false,
                    error: true,
                    "message": payment_fail
                })
            }
            await Cart.deleteOne({ userId });
            return res.status(201).json(order);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "error": true,
            "message": server_error
        })
    }
}

module.exports = {
    getOrder,
    checkout
}