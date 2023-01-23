const express = require('express');
const productRouter = require("./routes/products.router");
const carsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");
const handlebars = require('express-handlebars');
const {connectSocket} = require('./utils/socket.io');




const server = express();


//HANDLEBARS
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars'); 
server.use(express.static(__dirname + '/public'));



//EXPRESS
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use("/api/products", productRouter)
server.use("/api/carts", carsRouter)
server.use('/', viewsRouter)





 


const httpServer = server.listen(8080, () => { 
    console.log('escuchando server en port 8080')
});   


//SOCKET IO

connectSocket(httpServer);

