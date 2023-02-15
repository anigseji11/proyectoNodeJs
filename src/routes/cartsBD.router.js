const { Router } = require('express');
const router = Router();
const cartsController = require('../controller/carts.controller')

router.get("/:cid", cartsController.getCartById);
router.post('/', cartsController.createCart);
router.delete("/:cid/products/:pid", cartsController.deleteProductCart);
router.put("/:cid", cartsController.updateCart);
router.post("/:cid/product/:pid", cartsController.addProductToCart);



module.exports = router; 