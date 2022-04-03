const { Router } = require('express');
const router = Router();
const {
  updateProduct,
  deleteProduct,
  addProduct,
  getProduct,
  getProductsOnScroll,
} = require('../controllers/itemController');

router.post('/items', addProduct);
router.put('/items/:id', updateProduct);
router.get('/items', getProduct);
router.get('/itemsOnScroll', getProductsOnScroll);
router.delete('/items/:id', deleteProduct);

module.exports = router;
