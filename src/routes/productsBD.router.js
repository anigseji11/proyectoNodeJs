const { Router } = require('express');
const router = Router();
const productController = require('../controller/products.controller')


router.get("/", productController.getProducts);
router.post('/', productController.addProduct);
router.delete("/", productController.deleteproduct);

module.exports = router; 