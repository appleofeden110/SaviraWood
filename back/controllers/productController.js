const Model = require('../models/productModel');

// @desc отримати всі товари
// @route /products GET
async function getAll(req, res) {
    try {
        const products = await Model.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
}

// @desc отримати один товар за ідентифікатором
// @route /products/:id GET
async function getOne(req, res, id) {
    try {
        const product = await Model.findOne(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
}

// @desc Creates one new Product using HTTP body
// @route /products POST
async function createNewProd(req, res) {
    try {
        body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const { name, width, height, weight, price } = JSON.parse(body);
            
            const product = {
                name,
                width,
                height,
                weight,
                price
            }
            const newProd = await Model.create(Object.values(product));
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(newProd))
        })
  
    } catch (error) {
        console.log(error)
    }
}

async function updateProd(req, res, id) {
    try {
        const product = await Model.findOne(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        } else {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const requestData = JSON.parse(body);
                const { name, width, height, weight, price } = requestData;
                
                const productData = {
                    name: name || product.name,
                    width: width || product.width,
                    height: height || product.height,
                    weight: weight || product.weight,
                    price: price || product.price,
                    id: id // Use the id parameter from the function
                }

                const updatedProd = await Model.update(Object.values(productData));
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(updatedProd));
            });
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteProd(req, res, id) {
    try {
        const product = await Model.remove(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
        console.log('Product removed!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAll,
    getOne, 
    createNewProd,
    updateProd, 
    deleteProd
};