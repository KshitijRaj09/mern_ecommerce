const { Router } = require('express');
const router = Router();
const { addCart, getCart, deleteCartItem } = require("../controllers/cartController");

router.post("/cart/:id", addCart);
router.get("/cart/:id", getCart);
router.delete("/cart/:userId/:productId", deleteCartItem);
console.log("hello")
module.exports = router;