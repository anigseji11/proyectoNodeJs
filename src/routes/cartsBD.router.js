const { Router } = require('express');
const router = Router();
const cartsController = require('../controller/carts.controller')

router.post('/', cartsController.createCart);
router.get("/:cid", cartsController.getCartById); 
router.delete("/:cid/products/:pid", cartsController.deleteProductCart);
router.delete("/:cid", cartsController.deleteAllProductCart);
router.put("/:cid", cartsController.updateCart);
router.put("/:cid/product/:pid", cartsController.updateProductQuantity);
router.post("/:cid/product/:pid", cartsController.addProductToCart);



module.exports = router; 