const productModel = require('../models/product.model');


class productManagerBD{
    constructor(){
        this.products = [];
    }

    getProducById = async (pid) => {
            return await productModel.findById(pid)
    }

    getProduct = async (page = 1, limit = 2, sort = '', query = {}) => {
        try {
            const result = await productModel.paginate(query, {page, limit, sort: {price: `${sort}`}});
            //return result;
            return {
            status:'success',
            payload: result.docs,
            limit: limit,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            // prevLink: (result.hasPrevPage) ? `http://localhost:8080/api/productsbd?page=${parseInt(page) - 1}&limit=${limit}` : null,
            prevLink: (result.hasPrevPage) ? `http://localhost:8080/products?page=${parseInt(page) - 1}&limit=${limit}` : null,
            nextLink: (result.hasNextPage) ? `http://localhost:8080/products?page=${parseInt(page) + 1}&limit=${limit}` : null,
            // nextLink: (result.hasNextPage) ? `http://localhost:8080/api/productsbd?page=${parseInt(page) + 1}&limit=${limit}` : null,
            };
    
        } catch (error) {
            return {msg: 'Error al obtener productos'}
        }
    
    };

    addProduct = async (product) => {
        return await productModel.create(product);
     };

    deleteProduct = async (id) => {
        return await productModel.deleteOne({_id: id});
    };

    updateProduct = async (id, newproduct) => {
        return await ProductsModel.updateOne({ _id: id }, newProduct);
    }
}





const Product = new productManagerBD();
module.exports = Product;