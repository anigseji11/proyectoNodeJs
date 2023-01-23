const { Router } = require('express');

const router = Router();
const cartsManager = require('../utils/cartsManager');

const productManager = require('../productManager')

router.post('/', async (req, res) => {
    
    const resp = await cartsManager.addCart()
    res.json({ msg:"Carrito Creado", id: resp});
})

router.get('/:id', async (req, res) => {

    try {
        const cart = await cartsManager.getCart(req.params.id);
        res.json({
            msg: 'OK',
            cart
        })
    } catch (error) {
        res.status(404).json({
            msg:"Cart not found"
        })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params;

    try {
        const product = await productManager.getProductsById(pid);
        await cartsManager.addProductToCart(cid, product.id);
        res.json({
            msg: 'Ingresado Correctamente'
        })
    } catch (error) {
        res.status(404).json({
            msg: 'Erro al añadir al carrito',
            error: error.message
        })
    }
})



module.exports = router; 