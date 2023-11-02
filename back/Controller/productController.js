const {readProductModel, readOneProductModel, createOneProductModel, updateOneProductModel, deleteOneProductModel} = require('../Model/productModel')

async function getAllProducts(req, res) {
    try {
        const products = await readProductModel()
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
}

async function getOneProduct(req, res, id) {
    try {
        const product = await readOneProductModel(id);
        if (!product) {
            console.error('Product not found')
            res
                .status(404)
                .json({error: 'Product not found'})
        } else {
            res
                .status(200)
                .json(product)
        }
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
}

async function createOneProduct(req, res) {
    try {
        const {name, width, height, weight, price} = req.body
        const product = {
            name,
            width,
            height,
            weight,
            price
        }
        res.status(201).json(await createOneProductModel(Object.values(product)))
    } catch (err) {
        console.log(err)
        req.status(500).json(err)
    }
}

async function updateOneProduct(req, res, id) {
    try {
        const product = await readOneProductModel(id)
        if (!product) {
            res
                .status(404)
                .json({error: 'Product is non-existent'})
        } else {
            const { name, width, height, weight, price } = req.body
            
            const updatedProduct = {
                name: name || product.name,
                width: width || product.width,
                height: height || product.height, 
                weight: weight || product.weight,
                price: price || product.price,
                id: product.id
            }; 
            res.status(201).json(await updateOneProductModel(Object.values(updatedProduct)))
        }
    } catch (err) { 
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}

async function deleteOneProduct(req, res, id) {
    try {
        const product = await readOneProductModel(id);
        if (!product) {
            throw new Error('no product to delete!')
        } else {
            await deleteOneProductModel(product.id)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}


module.exports = {
    getAllProducts,
    getOneProduct,
    createOneProduct, 
    updateOneProduct,
    deleteOneProduct
}