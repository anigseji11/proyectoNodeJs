const fs = require('fs');

const writeFile = (path, products) => fs.promises.writeFile(path, JSON.stringify({products}));

const readFile = async (path) => {
    const asyncGetProducts = await fs.promises.readFile(path);
    const parseResult = JSON.parse(asyncGetProducts);
    return parseResult;
}

class Productos {
    constructor(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = code,
            this.stock = stock
    }
}

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    inicializador = async () => {
        const existFile = fs.existsSync(this.path);

        if(existFile){
                console.log('Archivo ya existe');  
                const {products} = await readFile(this.path)
                this.products = products
        }else{
                await writeFile(this.path, this.products);
                console.log('El archivo se creo correctamente');  
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        if(title && description && price && thumbnail && code && stock){
            var exist = this.products.find(
                (producto) => producto.title === title || producto.code === code);
            

            if (exist) {
                console.log('EL PRODUCTO YA EXISTE')
            } else {
                this.products.push({
                    id: this.products.length + 1,
                    title, description, price, thumbnail, code, stock
                }
                );

                await writeFile(this.path, this.products);
                console.log('EL PRODUCTO FUE INGRESADO EXITOSAMENTE')
            }
        }else{
            console.log('FALTO INGRESAR UNO DE LOS VALORES')
        }

    }

    getProducts = async () => {
            const fileData = await readFile(this.path);
            return fileData;
    }

    getProductsById = (id) => {
        var findProduct = this.products.find(
            (producto) => producto.id === id
            );

        if(findProduct){
            return findProduct;
        }else{
            console.log('Producto NO existe') 
        }
    }

    updateProducts = async (id, newProduct) => {
        var findIndexProduct = this.products.findIndex(
            (producto) => producto.id === id
            );

            if(findIndexProduct != -1){
                const id = this.products[findIndexProduct].id

                this.products[findIndexProduct] = {
                    id,
                    ...newProduct
                }
                await writeFile(this.path, this.products);
                console.log('Producto modificado exitosamente');

            }else{
                console.log('Producto NO existe') 
            }
    }

    deleteProduct = async(id) => {
        var findIndexProduct = this.products.findIndex(
            (producto) => producto.id === id
            );

            if(findIndexProduct != -1){
               const newProducts = this.products.filter(product => product.id != id);
               await writeFile(this.path, newProducts);
                console.log('Producto eliminado');

            }else{
                console.log('Producto NO existe') 
            }
    }
}

module.exports = ProductManager

// const ejecucion = async () => {
//     const productManager = new ProductManager("./data.json")
//     await productManager.inicializador();

//     let prodcuts = await productManager.getProducts();


//     productManager.addProduct('titulo', 'Descripcion', 200, '/ruta', 343434, 1000)
//     productManager.addProduct('titulo2', 'Descripcion2', 500, '/ruta', 343435, 3000)
//     productManager.addProduct('titulo3', 'Descripcion3', 500, '/ruta', 343436, 3000)
//     productManager.addProduct('titulo4', 'Descripcion4', 500, '/ruta', 343437, 3000)

//     const productUpdate = {
//         title: "titulo4444",
//         description: "Descripcio44444n",
//         price: 200,
//         thumbnail: "/ruta",
//         code: 343434,
//         stock:1000
//     }

// //     productos = await productManager.getProducts()

// // await productManager.updateProducts(1, productUpdate )


//     // console.log(productManager.getProductsById(1));
// }


// ejecucion()

