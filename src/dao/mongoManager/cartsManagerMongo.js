const cartsModel = require('../../models/carts.model');

class cartManagerBD {
    constructor() {
        this.products = [];
    }

    getCartByID = async (cid) => {
        return await cartsModel.findById(cid);
    };

    addCart = async (carrito) => {
        return await cartsModel.create(carrito);
    };

    updateCart = async (cid, carrito) => {
        return await cartsModel.updateOne({ _id: cid }, carrito);
    }

    addProductToCart = async (req, res) => {

        const cart = await cartsModel.findById(cid)

        const resultado = cart.products.findIndex((prod) => prod.id == product.id)
        if (resultado == -1) {


        } else {

        }
    }
}

const Carts = new cartManagerBD();
module.exports = Carts;