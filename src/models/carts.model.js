const { mongoose } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const cartsCollection = 'carts'

const cartsShema = new mongoose.Schema({
    priceTotal:{
        type:Number,
        default:0,
    },
    quantityTotal:{
        type:Number,
        default:0,
    },
    products:{
        _id:false,
        type:Array,
        default:[],
    }

});  

cartsShema.plugin(paginate); 
const cartsModel = mongoose.model(cartsCollection, cartsShema);


module.exports = cartsModel; 