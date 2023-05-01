const cartsManager = require('../dao/mongoManager/cartsManagerMongo')
const productsManager = require('../dao/mongoManager/productManagerMongo')
const { mapProductCart, calculateCartTotal } = require('../utils/calculateCartPrices')


const createCart = async (req, res) => {
    try {
        const { products = [] } = req.body
        let { productCartList, productsNotFound } = await mapProductCart(products)
        const cart = {
            totalPrice: calculateCartTotal(productCartList),
            totalQuantity: productCartList.length,
            products: productCartList
        }
        await cartsManager.addCart(cart)
        return res.json({
            msg: 'OK',
            payload: cart, productsNotFound
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message
        })
    }



}

const getCartById = async (req, res) => {
    const id = req.params.cid
    try {
        let cart = await cartsManager.getCart(id);

        if (cart) {
            res.send(cart)
        } else {
            res.send(cart)
        }
    } catch (error) {
        console.log(error)
    }


}

const deleteProductCart = async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartsManager.getCartByID(cid);
        if (!cart) {
            return res.status(400).json({
                payload: 'ERROR',
                msg: `El carrito con el id ${cid} no existe.`
            })
        };

        const productInBD = await productsManager.getProducById(pid);
        if (!productInBD) {
            return res.status(400).json({
                payload: 'ERROR',
                msg: `El producto con el id ${pid} no existe en la base de datos`
            })
        };

        const existsProductInCart = cart.products.some(({ product }) => product == pid)

        if (!existsProductInCart) {
            return res.status(400).json({
                msg: `El producto con el id ${pid} no existe en el carrito`,
                ok: false,
            })
        };

        cart.products = cart.products.filter(({ product }) => product != pid);
        cart.totalQuantity = cart.products.length;
        cart.totalPrice = calculateCartTotal(cart.products);

        await cartsManager.updateCart(cid, cart)

        res.json({
            msg: 'OK',
            payload: 'Product deleted successfully'
        })


    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message
        })
    }
}

const updateCart = async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartByID(cid);

        if (!cart) {
            return res.status(400).json({
                msg: 'El carrito con el id ${cid} no existe',
                ok: false,
            })
        };

        const { products = [] } = req.body;

        const { productCartList, productsNotFound } = await mapProductCart(products)

        const cartUpdated = {
            totalPrice: calculateCartTotal(productCartList),
            totalQuantity: productCartList.length,
            products: productCartList,
        }

        await cartsManager.updateCart(cid, cartUpdated)
        return res.json({
            msg: productsNotFound.length > 0 ? 'WARNING' : 'OK',
            payload: { productCartList, productsNotFound },
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message,
        })
    }
}

const updateProductQuantity = async (req, res) => {
    try {

        const { cid, pid } = req.params
        const { quantity = 0 } = req.body
        const cart = await cartsManager.getCartByID(cid);

        if (!cart) {
            return res.status(400).json({
                msg: 'El carrito con el id ${cid) no existe',
                ok: false
            })
        }


        const productExistBD = await productsManager.getProducById(pid);

        if (!productExistBD) {
            return res.status(400).json({
                msg: 'El producto con el id ${pid} no existe en base de datos',
                ok: false
            })
        };


        const indexProduct = cart.products.findIndex(({ product }) => product == pid)

        if (indexProduct === -1) {
            return res.status(400).json({
                msg: 'El producto con el id ${pid} no existe en el carrito',
                ok: false,

            })
        };

        cart.products[indexProduct].quantity += quantity

        await cartsManager.updateCart(cid, cart);

        return res.json({
            msg: 'OK',
            payload: 'Cart updated successfully',
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error', payload: error.message,
        })
    }

}

const deleteAllProductCart = async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartByID(cid);

        if (!cart) {
            return res.status(400).json({
                msg: 'El carrito con el id ${cid} no existe',
                ok: false,
            })
        };

        const { products = [] } = [];

        const { productCartList, productsNotFound } = await mapProductCart(products)

        const cartUpdated = {
            totalPrice: calculateCartTotal(productCartList),
            totalQuantity: productCartList.length,
            products: productCartList,
        }

        await cartsManager.updateCart(cid, cartUpdated)
        return res.json({
            msg: productsNotFound.length > 0 ? 'WARNING' : 'OK',
            payload: { productCartList, productsNotFound },
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Error',
            payload: error.message,
        })
    }
}

const addProductToCart = async (req, res) => {

    const { cid, pid } = req.params

    // BUSCA EL PRODUCTO SINO LO ENCUENTRA TERMINA
    const product = await productsManager.getProducById(pid);
    if (!product) {
        return res.status(400).json({
            msg: `El producto con el id ${pid} no existe`,
            ok: false,
        });
    };

    // BUSCA EL CARRITO SINO ENCUENTRA LO CREA CON PRODUCTO ENVIADO

    const cartFind = await cartsManager.getCart(cid);
    const cart = cartFind[0];

    if (!cart) {
        const newCart = {
            priceTotal: product.price,
            quantitylotal: 1,
            products: [product],
            username: cid
        };

        const cartToSave = await cartsManager.addCart(newCart);
        return res.status(200).json({
            msg: 'Carrito creado con exito',
            cart: cartToSave
        })
    }
    // SI ENCUENTRA EL CARRO Y EL PRODUCTO DENTRO DEL CARRO

    const findProductCart = await cart.products.find((prod) => prod._id == pid)

    if (!findProductCart) {

        cart.products.push(product)
        cart.quantity = cart.quantity + 1

        cart.quantityTotal = cart.quantityTotal + 1;
        const total = cart.products.reduce((acumulador, total) => acumulador + total.price, 0);

        cart.priceTotal = total;
        const cartToUpdate = await cartsManager.updateCart(cart);
        return res.json({
            msg: cartToUpdate
        });

    } else {
        cart.quantity = cart.quantity + 1

        cart.quantityTotal = cart.quantityTotal + 1;
        const total = cart.products.reduce((acumulador, total) => acumulador + total.price, 0);

        cart.priceTotal = total;
        const cartToUpdate = await cartsManager.updateCart(cart);
        return res.json({
            msg: 'Producto no encontrado en el carrito'
        })
    }


}
module.exports = {
    createCart,
    getCartById,
    deleteProductCart,
    updateCart,
    addProductToCart,
    updateProductQuantity,
    deleteAllProductCart
};