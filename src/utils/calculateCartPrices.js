const productManager = require('./productManagerMongo')

const calculateCartTotal = (products) => {
    return products.reduce(
        (acc, curr) => acc + curr.unitValue * curr.quantity, 0
    )
}

const mapProductCart = async (products) => {
    let productCartList = []
    let productsNotFound = []

    for (const idProduct of products) {
        const indexProduct = productCartList.findIndex(({ product }) => product === idProduct)
        if (indexProduct === -1) {
            const productExist = await productManager.getProducById(idProduct)
            if (productExist) {
                productCartList.push({
                    product: idProduct,
                    quantity: 1,
                    unitValue: productExist.price,
                })
            } else {
                productNotFound.push(idProduct)
            }
        } else {
            productCartList[indexProduct].quantity++
        }
    }
    return { productCartList, productsNotFound };
}

module.exports = {
    calculateCartTotal, mapProductCart
}