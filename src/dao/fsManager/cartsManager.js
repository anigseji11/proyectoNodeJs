const fs = require('fs');

const writeFile = (path, data) => {
    fs.promises.writeFile(path, JSON.stringify(data))
};

const readFile = async (path) => {
    const read = await fs.promises.readFile(path, { encoding: 'utf-8' });
    const aux = read ? read : "[]"
    const parseResult = JSON.parse(aux);
    return parseResult;
}

const CreateFile = async (path, carts) => {
    if (!fs.existsSync(path)) {
        await writeFile(path, carts);
    }
}
class CartsManager {

    constructor(path) {
        this.path = path;
        this.carts = [];
        CreateFile(path, [])
    }

   

    addCart = async () => {
        const carts = await readFile(this.path);
        const id = carts.length
        carts.push({
            id,
            products: []
        })
        await writeFile(this.path, carts);
        return id;
    }

    getCart = async (id) => {
        const carts = await readFile(this.path);

        if(carts[id]){
            return carts[id];
        }

        throw new Error("Cart not found");
    }

    addProductToCart = async (cid, pid) => {
        const carts = await readFile(this.path)
       
        if(carts[cid]){
            console.log(carts[cid]) 
            const productIndex = carts[cid].products.findIndex((p) => p.id == pid);
            console.log(productIndex) 
            if(productIndex !== -1){
                    carts[cid].products[productIndex].quantity++;
            }else{
                carts[cid].products.push({id: pid, quantity: 1 });
            }
            await writeFile(this.path, carts);
        }else{
            throw new Error ('Cart not found')
        }
      
    }

}


const cartsManager = new CartsManager(__dirname + '/../../assets/carts.json')


module.exports = cartsManager;