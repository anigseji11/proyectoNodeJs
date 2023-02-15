const cartsModel = require('../models/carts.model');

class cartManagerBD {
    constructor() {
        this.products = [];
    }

    getCart = async (cid) => {
        console.log(cid)
        try {
            const result = await cartsModel.find({ _id: cid });
            return result;

        } catch (error) {
            console.log(error)
            return { msg: 'Error al obtener carrito' }
        }

    };

    addCart = async (carrito) => {
        try {
            const newCart = await cartsModel.create(carrito);
            return { msg: 'Carrito Creado', newCart };
        } catch (error) {
            console.log(error)
            return { msg: 'Error al crear carrito' };
        }
    };

    updateCart = async (carrito) => {
        console.log(carrito, carrito.id)
        try {
            const cartUpdate = await cartsModel.findByIdAndUpdate(carrito.id, carrito, { new: true, });

            return cartUpdate;
        } catch (error) {
            console.log(error)
            return { msg: 'Error al crear carrito' };
        }
    }

    addProductToCart = async (req, res) => {
       
            const cart = await cartsModel.findById(cid)
          
            const resultado = cart.products.findIndex((prod) => prod.id == product.id)
            if (resultado == -1) {


            }else {

            }
    }
}

const Carts = new cartManagerBD();
module.exports = Carts;