const express = require('express');
const productRouter = require("./routes/products.router");
const productRouterBD = require("./routes/productsBD.router");
const carsRouter = require("./routes/carts.router");
const carsRouterBD = require("./routes/cartsBD.router");
const viewsRouter = require("./routes/views.router");
const handlebars = require('express-handlebars');
const {connectSocket} = require('./utils/socket.io');
const { mongoose } = require('mongoose')
const productModel = require('./models/product.model.js')

const server = express();

//MONGOOSE
mongoose.connect(
    'mongodb+srv://admin:LkKlIdySPlvbG2gt@cluster10.puz4unz.mongodb.net/?retryWrites=true&w=majority',
    (error) =>{
        if(error){
            console.log('Error de conexion. ', error)
            process.exit();
        }else{
            console. log ( 'Conexión con base de datos exitosa')
        }
    }
);

//HANDLEBARS
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars'); 
server.use(express.static(__dirname + '/public'));



//EXPRESS
server.use(express.json());
server.use(express.urlencoded({extended: true}));


//ROUTES
server.use("/api/products", productRouter)
server.use("/api/productsbd", productRouterBD)
server.use("/api/carts", carsRouter)
server.use("/api/cartsbd", carsRouterBD)
server.use('/', viewsRouter)

//SOCKET.IO
const httpServer = server.listen(8080, () => { 
    console.log('Servidor corriendo en el puerto 8080')
});   

//SOCKET IO
connectSocket(httpServer);

  