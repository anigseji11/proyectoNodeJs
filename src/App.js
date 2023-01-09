
const express = require('express');

const ProductManager = require('./ProductManager');

const server = express();


server.get('/products', async (req, res) => {
    const productManager = new ProductManager("../data.json")
    let products = await productManager.getProducts();
    
    console.log(products);

    const limit = req.query.limit;

    if (!limit) {
        res.send(products)
    }else{
        const ProductosLimit = products.products.slice(0, limit);
        res.send(ProductosLimit)
    }


   
})

server.get('/products/:pid', async (req,res)=>{
    const productManager = new ProductManager("../data.json")
    const id = parseInt(req.params.pid)
    await productManager.inicializador();
    let producto = await productManager.getProductsById(id);

    if(!producto){
        res.send("Producto no existe")
    }else{
 //res.send({"products":producto})
 res.send(producto);
    }
   
})


server.listen(8080, () => {
    console.log('ecuchando server en port 8080')
});