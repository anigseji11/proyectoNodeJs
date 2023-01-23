const { Router } = require('express');

const {emmitDeleteproduct, emmitAddproduct, emmitUpdateproduct} = require('../utils/socket.io');

const router = Router();

const productManager = require('../productManager')

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
    try {
        const resp = await productManager.addProduct(producto.title, producto.description, producto.price, producto.thumbnail, producto.code, producto.stock, producto.status, producto.category);
        console.log(resp)
        if(resp !== 0){
            emmitAddproduct(resp, producto);
            res.json({
                msg: 'Creado Exitosamente'
            })
        }else{
            res.json({
                msg: 'Producto ya existe'
            })
        }
        
    } catch (error) {
        res.json({
            msg: 'Error al crear el producto'
        })
    }
   

})

router.put('/', async (req, res) => {
    let producto = req.body;
    const resp = await productManager.updateProducts(producto.id, producto);
    emmitUpdateproduct(producto);
    res.json({
        msg: resp
    })
})

router.delete('/:pid',async (req, res) => {
    const id = parseInt(req.params.pid)

    let producto = await productManager.deleteProduct(id);
   
    if (producto) {
        emmitDeleteproduct(id);
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