const { Router } = require("express");
const router = Router();
const { getOrder, checkout } = require('../controllers/orderController');

router.get("/order/:id", getOrder);
router.post("/order/:id", checkout);

module.exports = router;