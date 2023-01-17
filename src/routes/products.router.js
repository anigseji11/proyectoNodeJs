const { Router } = require('express');

const router = Router();

const ProductManager = require('../productManager')
const productManager = new ProductManager(__dirname + '/../assets/product.json')

router.get("/", async (req, res) => {

    let products = await productManager.getProducts();

    const limit = req.query.limit;

    if (!limit) {
        res.send(products)
    } else {
        const ProductosLimit = products.products.slice(0, limit);
        res.send(ProductosLimit)
    }

})

router.get('/:pid', async (req, res) => {

    const id = parseInt(req.params.pid)
   
    let producto = await productManager.getProductsById(id);

    if (!producto) {
        res.send("Producto no existe")
    } else {
      
        res.send(producto);
    }

})

router.post('/', async (req, res) => {

    let producto = req.body;
    const resp = await productManager.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock, producto.status, producto.category);

    res.json({
        msg: resp
    })

})

router.put('/', async (req, res) => {
    let producto = req.body;
    const resp = await productManager.updateProducts(producto.id, producto);

    res.json({
        msg: resp
    })
})

router.delete('/:pid',async (req, res) => {
    const id = parseInt(req.params.pid)

    let producto = await productManager.deleteProduct(id);
    console.log(producto)
    if (producto == -1) {
        res.json({
            msg: 'Producto eliminado exitosamente'
        })
    } else {
        res.json({
            msg: "Producto no existe"
        })
    }
})

module.exports = router; 