const { Router } = require('express');
const router = Router();
const { addCart, getCart, deleteCartItem, cartLocalToDB } = require("../controllers/cartController");

router.post("/cart/:id", addCart);
router.get("/cart/:id", getCart);
router.delete("/cart/:userId/:productId", deleteCartItem);
router.post("/cartLocalToDB/:id", cartLocalToDB);
module.exports = router;