const Cart = require('../models/Cart');
const { cart_fetch_error, server_error } = require("../constants/constantMsg");
const Item = require('../models/Item');

const getCart = async (req, res) => {
    const userId = req.params.id;
    try {
        const cartDetails = await Cart.find({ userId });
        if (cartDetails?.items?.length >= 1) {
            return res.json(cartDetails);
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        return res.status(500).json({
            "success": false,
            "error": true,
            "message": cart_fetch_error
        })
    }
}

const addCart = async (req, res) => {
    const { productId, quanity } = req.body;
    const userId = req.params.id;
    try {
        let cart = await Cart.find({ userId });
        let item = await Item.find({ _id: productId });
        const { productName, price } = item;
        //check if any item present in cart
        if (cart.length >= 1) {
            //fetch actual product from cart
            const product = cart.items.find(p => p.productId === productId);

            //check if product present in cart then update the quanity
            if (product) {
                product?.quanity += quanity;
            }
            else {
                cart.items.push({ productId, productName, quantity, price });
            }
            cart.bill += quanity * price;
            cart = await cart.save();
            return res.status(201).json(cart);
        }

        else {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, productName, quanity, price }],
                bill: quanity * price
            })
            return res.status(201).json(newCart);
        }
    }

    catch (error) {
        return res.staus(500).json({
            "success": false,
            "error": true,
            "message": cart_fetch_error
        })
    }
}

//To delete cart items
const deleteCartItem = (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        let cart = await Cart.find({ userId });
        const product = cart.items.find(p => p.productId === productId);

        if (product) {
            cart.bill -= product.quanity * product.price;
            cart.items = cart.items.filter(p => p.productId !== product.productId);
        }

        cart = await cart.save();
        return res.status(201).json(cart);
    }

    catch (error) {
        res.status(500).json({
            "success": false,
            "error": true,
            "message": server_error
        })
    }
}

module.exports = { getCart, addCart, deleteCartItem };