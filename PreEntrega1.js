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
    constructor() {

        this.products = []

    }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        if(title && description && price && thumbnail && code && stock){
            var exist = this.products.map(p => p.code).includes(code);

            if (exist) {
                console.log('EL PRODUCTO YA EXISTE')
            } else {
                this.products.push({
                    id: this.products.length,
                    title, description, price, thumbnail, code, stock
                }
                )
                console.log('EL PRODUCTO FUE INGRESADO EXITOSAMENTE')
            }
        }else{
            console.log('FALTO INGRESAR UNO DE LOS VALORES')
        }

    }

    getProducts(){
            var ListaProductos = this.products
            console.log(ListaProductos) 
    }

    getProductsById(id){
        var exist = this.products.map(p => p.id).includes(id);
        if(exist){
            console.log('Producto SI existe') 
        }else{
            console.log('Producto NO existe') 
        }
    }
}






const productManager = new ProductManager()

productManager.addProduct('titulo', 'Descripcion', 200, '/ruta', 343434, 1000)
productManager.addProduct('titulo2', 'Descripcion2', 500, '/ruta', 343435, 3000)
productManager.getProducts()
productManager.getProductsById(3)


