
const productManager = require('../utils/productManagerMongo')

const getProductById = async (req, res) => {

    const id = req.params.cid
    try {
        let product = await productManager.getProducById(id);
        return product;
    } catch (error) {
        console.log(error)
        return 'No fue posible encontrar producto';
    }
}

const getProducts = async (req, res) => {
    const { limit, page, ...query } = req.query;
    let products = await productManager.getProduct(page, limit, query);

    if (products) {
        res.send(products)
    } else {

        res.send(products)
    }
}

const addProduct = async (req, res) => {

    const producto = req.body;
    const newProduct = await productManager.addProduct(producto);
    if (newProduct) {
        res.json(newProduct);
    } else {
        res.json(newProduct);
    }

}

const deleteproduct = async (req, res) => {
    const { id } = req.query;
    let products = await productManager.deleteProduct(id);

    if (products) {
        res.send(products)
    } else {

        res.send(products)
    }

}


module.exports = {
    getProducts,
    addProduct,
    deleteproduct,
    getProductById
};