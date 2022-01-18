const User = require("../models/User");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const config = require("config");
const stripe = require("stripe");
const { payment_fail, server_error } = require("../constants/constantMsg");

config.get("stripeSecretKey");

const getOrder = async (req, res) => {
    const userId = req.params.id;
    const orders = await Order.find({ userId }).sort({ date: -1 });
    return res.json(orders);
}

const checkout = async (req, res) => {
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
        res.status(500).json({
            "success": false,
            "error": true,
            "message": server_error
        })
    }
}