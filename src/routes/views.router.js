const { Router, json } = require('express');

const router = Router();
const productManager = require('../productManager')
const productManagerMongo = require('../utils/productManagerMongo')

router.get('/', async (req, res) =>{
    const {products} = await productManager.getProducts();
    res.render('home',{
        products
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',{
        name: 'Juan' 
    })
})


router.get('/products', async (req, res) =>{
    const response = await productManagerMongo.getProduct();
    const products = response.payload
    res.render('products',{
        response,
        products
    })
})








module.exports = router; 