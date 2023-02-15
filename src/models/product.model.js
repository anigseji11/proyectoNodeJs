const { mongoose } = require('mongoose');
const paginate = require('mongoose-paginate-v2')

const productCollection = 'productCollection'

const productShema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number, 
    category: Number,
    status: Boolean
});  

productShema.plugin(paginate); 
const productModel = mongoose.model(productCollection, productShema);


module.exports = productModel; 