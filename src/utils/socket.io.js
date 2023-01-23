const socket = require('socket.io');
let io;
const productManager = require('../productManager');


const connectSocket = (httpServer) => {
 io = socket(httpServer);

    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado');
        socketConnect = socket;
        const {products} = await productManager.getProducts();
        socket.emit('init-products', { products })
    });

   
} ;

 const emmitDeleteproduct = (id) => {
    io.emit('delete-product', {id});
};

const emmitAddproduct = (id, product) => {
    io.emit('add-product', id, {product});
};

const emmitUpdateproduct = (product) => {
    io.emit('update-product', {product});
};

module.exports = {connectSocket, emmitDeleteproduct, emmitAddproduct, emmitUpdateproduct}; 