
const productManager = require('../utils/productManagerMongo')

const getProductById = async (req, res) => {
    try {
        const pid = req.params.pid
        let product = await productManager.getProducById(pid);
        return res.json({
            msg: 'OK',
            payload: product
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message
        });
    }
}

const getProducts = async (req, res) => {
    try {
        const { limit, page, sort, ...query } = req.query;
        let products = await productManager.getProduct(page, limit, sort, query);
        return res.json(products);


    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            payload: 'Error al intentar obtener los productos',
        });
    }

}

const addProduct = async (req, res) => {
    try {
        const producto = req.body;
        const newProduct = await productManager.addProduct(producto);
        //emmit add product
        return res.json({
            msg: 'OK',
            payload: newProduct,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message
        });

    }
}

const updateProduct = async (reg, res) => {
    try {
        const pid = req.params.pid
        const product = reg.body
        await productMangerMongo.updateProduct(pid, product)
        //emitUpdateProduct(product)
        return res.json({
            msg: 'OK',
            payload: 'Product updated successfully'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message
        })
    }
}




const deleteproduct = async (req, res) => {

    try {
        const pid = req.query;
        const deleted = await productManager.deleteProduct(id);
        //emmit delete product

        if (deleted) {
            return res.json({
                msg: 'OK',
                payload: 'Product sucessfully deleted'
            })
        } else {
            return res.status(404).json({
                msg: 'Error',
                payload: `ID ${pid} was not found on the products collection`
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message,
        })

    }

}


module.exports = {
    getProducts,
    addProduct,
    deleteproduct,
    getProductById
};