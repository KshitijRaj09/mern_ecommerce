const Cart = require('../models/Cart');
const { cart_fetch_error, server_error } = require('../constants/constantMsg');
const Item = require('../models/Item');
const { deleteOne } = require('../models/Cart');

const getCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const cartDetails = await Cart.findOne({ userId });
    if (cartDetails?.items.length >= 1) {
      return res.json(cartDetails);
    } else {
      res.json(null);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: cart_fetch_error,
    });
  }
};

const addCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    let item = await Item.findById(productId);
    const { productName, price, imageURL, category } = item;
    //check if any item present in cart
    if (cart) {
      //fetch actual product from cart
      const product = cart.items.find((p) => p.productId === productId);

      //check if product present in cart then update the quantity
      if (product) {
        product.quantity = quantity;
      } else {
        cart.items.push({
          productId,
          productName,
          quantity,
          imageURL,
          category,
          price,
        });
      }
      cart.bill = cart.items.reduce((sum, p) => p.price * p.quantity + sum, 0);
      cart = await cart.save();
      return res.status(201).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [
          { productId, productName, quantity, imageURL, category, price },
        ],
        bill: quantity * price,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: cart_fetch_error,
    });
  }
};

//To delete cart items
const deleteCartItem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ userId });
    const product = cart.items.find((p) => p.productId === productId);
    if (product) {
      cart.bill -= product.quantity * product.price;
      cart.items = cart.items.filter((p) => p.productId !== product.productId);
    } else {
      return res.send('Product not in cart');
    }
    cart = await cart.save();
    if (cart?.items.length < 1) {
      await cart.deleteOne({ userId });
    }
    return res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: server_error,
    });
  }
};

const cartLocalToDB = async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  let cart = await Cart.findOne({ userId });
  let updateCart = [];
  try {
    for (let itemId in body) {
      let item = await Item.findById(itemId);
      const quantity = body[itemId];
      const { productName, price, imageURL, category } = item;
      if (cart) {
        //fetch actual product from cart
        const product = cart.items.find((p) => p.productId === itemId);

        //check if product present in cart then update the quantity
        if (product) {
          product.quantity = quantity;
        } else {
          cart.items.push({
            itemId,
            productName,
            quantity,
            category,
            imageURL,
            price,
          });
        }
        cart.bill = cart.items.reduce(
          (sum, p) => p.price * p.quantity + sum,
          0
        );
        cart = await cart.save();
        return res.status(201).json(cart);
      } else {
        const newCart = await Cart.create({
          userId,
          items: [{ itemId, productName, quantity, imageURL, price }],
          bill: quantity * price,
        });
        updateCart.push(newCart);
      }
    }
    return res.status(201).json(updateCart);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: cart_fetch_error,
    });
  }
};

module.exports = { getCart, addCart, deleteCartItem, cartLocalToDB };
