const { Router, json } = require('express');

const router = Router();
const productManager = require('../productManager')
const productManagerMongo = require('../utils/productManagerMongo')

router.get('/', async (req, res) => {
    const { products } = await productManager.getProducts();
    res.render('home', {
        products
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        name: 'Juan'
    })
})


router.get('/products', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const response = await productManagerMongo.getProduct(page, limit);
    const products = response.payload.map((product) => ({
        id: product._id,
        category: product.category,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status

    }))
    res.render('products', {
        response,
        products
    })
})








module.exports = router; 