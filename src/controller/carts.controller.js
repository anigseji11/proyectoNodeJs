const cartsManager = require('../utils/cartsManagerMongo')
const productsManager = require('../utils/productManagerMongo')



const createCart = async (req, res) => {

    const carrito = req.body;
    const newCart = await cartsManager.addCart(carrito);
    if (newCart) {
        res.json(newCart);
    } else {
        res.json(newCart);
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
    const { cid, pid } = req.params;


    try {
        const cartFind = await cartsManager.getCart(cid);
        const cart = cartFind[0];
        const findProductCart = await cart.products.find((prod) => prod._id == pid)

        if (findProductCart) {

            if (findProductCart.stock === 1) {

                const index = cart.products.findIndex((prod) => prod._id === pid);
                cart.products.splice(index, 1);
            } else {
                findProductCart.stock--;
            }

            cart.quantityTotal = cart.quantityTotal - 1;
            const total = cart.products.reduce((acumulador, total) => acumulador + total.price, 0);

            cart.priceTotal = total;
            const cartToUpdate = await cartsManager.updateCart(cart);
            return res.json({
                msg: cartToUpdate
            });

        } else {
            return res.json({
                msg: 'Producto no encontrado en el carrito'
            })
        }


    } catch (error) {
        console.log(error)
    }
}

const updateCart = async (req, res) => {
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
    addProductToCart
};