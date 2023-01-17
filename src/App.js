const express = require('express');
const productRouter = require("./routes/products.router");
const carsRouter = require("./routes/carts.router");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));




server.use("/api/products", productRouter)
server.use("/api/carts", carsRouter)




server.listen(8080, () => { 
    console.log('ecuchando server en port 8080')
});  