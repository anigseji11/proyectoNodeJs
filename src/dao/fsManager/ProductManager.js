const fs = require('fs');
//const {emmitDeleteproduct} = require('./utils/socket.io.js');

const writeFile = (path, products) => fs.promises.writeFile(path, JSON.stringify({products : products}));

const readFile = async (path) => {
    const asyncGetProducts = await fs.promises.readFile(path);

    const parseResult = JSON.parse(asyncGetProducts);
    
    return parseResult;
}

const inicializador = async (path) => {
    const existFile = fs.existsSync(path);

    if(existFile){
            console.log('Archivo ya existe');  
            const {products} = await readFile(path)
            
            this.products = {products}
    }else{
            await writeFile(path, this.products);
            console.log('El archivo se creo correctamente');  
    }
}

class Productos {
    constructor(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    ) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = code,
            this.stock = stock,
            this.status = status,
            this.category = category
    }
}

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        inicializador(path)
    }

  

    addProduct = async (title, description, price, thumbnail, code, stock, status = true, category) => {

        const {products} = await readFile(this.path)

        if(title && description && price && code && stock && status && category){
            var exist = products.find(
                (producto) => producto.title === title || producto.code === code);

            if (exist) {
                console.log('EL PRODUCTO YA EXISTE')
                return(0)
            } else {
                products.push({
                    id: products.length + 1,
                    title, description, price, thumbnail, code, stock, status, category
                }
                );

                await writeFile(this.path, products);
                console.log('EL PRODUCTO FUE INGRESADO EXITOSAMENTE')
                return (products.length);
            }
        }else{
            console.log('FALTO INGRESAR UNO DE LOS VALORES')
            return('FALTO INGRESAR UNO DE LOS VALORES')
        }

    }

    getProducts = async () => {
            const fileData = await readFile(this.path);
            return fileData;
            
    }

    getProductsById = async (id) => {
        const { products } = await readFile(this.path)
         const Product = products[id];

        if(Product){
            return Product;
        }else{
            console.log('Producto NO existe') 
        }
    }

    updateProducts = async (id, newProduct) => {

        const  {products} = await readFile(this.path)
        var findIndexProduct = products.findIndex(
            (producto) => producto.id === id
            );

            if(findIndexProduct != -1){
                const id = products[findIndexProduct].id

                products[findIndexProduct] = {
                    id,
                    ...newProduct
                }
                await writeFile(this.path, products);
                return('Producto modificado exitosamente');

            }else{
                return('Producto NO existe') 
            }
    }

    deleteProduct = async(id) => {
        const { products } = await readFile(this.path)
		this.products = products
		const findIndexProduct = this.products.findIndex(
			(product) => product.id === id
		)

		if (findIndexProduct !== -1) {
			const newProducts = this.products.filter((product) => product.id !== id)
			await writeFile(this.path, newProducts)
            console.log('Eliminado correctamente')
            return (id);
		} else {
			throw new Error('No se encuentra un producto con ese id')
		}
    }
}
const Product = new ProductManager(__dirname + '/../../assets/product.json');
module.exports = Product;

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

