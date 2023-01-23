const { Router } = require('express');

const router = Router();
const productManager = require('../productManager')

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






module.exports = router; 