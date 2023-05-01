const express = require('express');
const productRouter = require("./routes/products.router");
const productRouterBD = require("./routes/productsBD.router");
const carsRouter = require("./routes/carts.router");
const carsRouterBD = require("./routes/cartsBD.router");
const viewsRouter = require("./routes/views.router");
const sessionRouter = require("./routes/session.router");
const handlebars = require('express-handlebars');
const {connectSocket} = require('./utils/socket.io');
const { mongoose } = require('mongoose')
const  passport = require('passport')

const session = require('express-session');
const mongoConnect = require('connect-mongo');
const initPassport = require('./scripts/passport.config');
const {PORT, MONGODBURL } = require('../src/config/config');

console.log(PORT);
console.log(MONGODBURL);

const server = express();


server.use(
    session({
        store: mongoConnect.create({
            mongoUrl: MONGODBURL,
        }),
        secret:'secret',
        resave: true,
        saveUninitialized:  true,
}));

//MONGOOSE

mongoose.connect(
    MONGODBURL,
    (error) =>{
        if(error){
            console.log('Error de conexion. ', error)
            process.exit();
        }else{
            console. log ( 'Conexión con base de datos exitosa')
        }
    }
);

initPassport();
server.use(passport.initialize());
server.use(passport.session()); 


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
server.use("/api/session", sessionRouter)
server.use('/', viewsRouter)

//SOCKET.IO
const httpServer = server.listen(PORT, () => { 
    console.log('Servidor corriendo en el puerto ' + PORT + '🔥')
});   

//SOCKET IO
connectSocket(httpServer);

  