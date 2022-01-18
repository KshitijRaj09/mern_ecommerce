const { Router } = require('express');
const router = Router();
const { updateProduct, deleteProduct, addProduct, getProduct } = require("../controllers/itemController");

router.post("/items", addProduct);
router.put("/items/:id", updateProduct);
router.get("/items", getProduct);
router.delete("/items/:id", deleteProduct);

module.exports = router;