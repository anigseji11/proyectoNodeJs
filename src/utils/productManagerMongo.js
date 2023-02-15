const productModel = require('../models/product.model');


class productManagerBD{
    constructor(){
        this.products = [];
    }

    getProducById = async (pid) => {
        try {
            const product = await productModel.find({_id: pid});
            return product;
         } catch (error) {
             console.log(error)
             return {msg: 'Error al crear producto'};
         }
    }

    getProduct = async (page = 1, limit = 10, query = {}) => {
        try {
            const result = await productModel.paginate(query, {page, limit});
            return  {
                status:'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: (result.hasPrevPage) ? `localhost:8080/api/productsbd?page=${parseInt(page) - 1}&limit=1` : null,
            nextLink: (result.hasNextPage) ? `localhost:8080/api/productsbd?page=${parseInt(page) + 1}&limit=1` : null,
            };
    
        } catch (error) {
            return {msg: 'Error al obtener productos'}
        }
    
    };

    addProduct = async (product) => {
        try {
           const newProduct = await productModel.create(product);
           return {msg: 'Producto Creado', newProduct};
        } catch (error) {
            console.log(error)
            return {msg: 'Error al crear producto'};
        }
    };

    deleteProduct = async (id) => {
        try {
           const newProduct = await productModel.deleteOne({_id: id});
           return {msg: 'Producto Eliminado correctamente', newProduct};
        } catch (error) {
            console.log(error)
            return {msg: 'Error al eliminar producto'};
        }
    };
}





const Product = new productManagerBD();
module.exports = Product;