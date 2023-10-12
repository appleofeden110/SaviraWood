const { readProduct, createProduct, updateProduct, deleteProduct } = require('../database/productQueries.js')
const products = [];
function readProductModel() {
    try { 
        return new Promise(async (resolve, reject) => {
            await readProduct(products)
            resolve(products)
        })
    } catch (err) {
        console.log(err)

    }
}
function readOneProductModel(id) {
    try { 
        return new Promise(async (resolve, reject) => {
            await readProduct(products);
            id--;
            resolve(products[id])
        })
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}
function createOneProductModel(productData) {
    try { 
        return new Promise(async (resolve, reject) => {
            const product = createProduct([productData])
            console.log(product)
            resolve(product)
        })
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}
function updateOneProductModel(updatedProduct) {
    try { 
        return new Promise((resolve, reject) => {
            const product = updateProduct(updatedProduct);
            resolve(product)
        })
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}

function deleteOneProductModel(id) {
    try {
        return new Promise((resolve, reject) => {
            const deletedProduct = deleteProduct(id)
            console.log(deletedProduct)
            resolve(deletedProduct)
        })
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}
module.exports = {
    readProductModel,
    readOneProductModel,
    createOneProductModel, 
    updateOneProductModel,
    deleteOneProductModel
}