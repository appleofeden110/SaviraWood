const express = require('express');
const cors = require('cors')
const app = express();
const router = express.Router(['caseSensetive']);
const port = 5000;
const { getAllUsers, getOneUser, createOneUser, updateOneUser, deleteOneUser } = require('./Controller/userController');
const { getAllProducts, getOneProduct, createOneProduct, updateOneProduct, deleteOneProduct } = require('./Controller/productController')
app.use(cors());
app.use(express.json())
//Default
app.get('/', (req, res) => {
    res
        .status(200)
        .json({messgae: 'WELCOME to SaviraWood!!! The best wooden pictures and furniture you can find for a price'})
// Products
})

    app.get('/products', (req, res, next) => {
    try {
        getAllProducts(req, res)
        console.log('request received')
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
})

app.get('/products/:id', (req, res, next) => {
    try {
        getOneProduct(req, res, req.params.id)
        console.log('request received')
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
})
app.post('/products', (req, res, next) => {
    try {
        console.log('request received')
        createOneProduct(req, res)
        res.json(req.body)
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
})
app.put('/products/:id', (req, res, next) => {
    try {
        console.log('request received')
        const id = parseInt(req.params.id)
        console.log(id)
        updateOneProduct(req, res, id)
        
        res.json(req.body)
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
})

app.delete('/products/:id', (req, res, next) => {
    try {
        console.log('request received');
        const id = parseInt(req.params.id);
        console.log(id);
        deleteOneProduct(req, res, id);

        res.json({message: `Product ${id} Deleted!!!`})
    } catch (err) {
        res.status(500).json()
        throw new Error(`Error: ${err}`)
    }
})
//Users
app.get('/users', (req, res) => {
    try {
        getAllUsers(req, res)
        console.log('request received')
    } catch (err) {
        console.log(err)
        //server error
        res
            .status(500)
            .json(err)
    }
})
app.get('/users/:id', (req, res) => {
    try {
        getOneUser(req, res, req.params.id)
        console.log('request received')
    } catch (err) {
        console.log(err)
        //server error
        req
            .status(500)
            .json(err)
    }
})
app.post('/users', (req, res, next) => {
    try {
        console.log(req.body)
        createOneUser(req, res)
        res.send(req.body)
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
        
})
app.put('/users/:id', (req, res, next) => {
    try {
        console.log(req.body)
        updateOneUser(req, res, req.params.id)
        res.send(req.body)
    } catch (err) {
        console.log(err)
        req 
            .status(500)
            .json(err)
    }
})
app.delete('/users/:id', (req, res, next) => {
    try {
        console.log(`User ${req.params.id} deleted!!!`)
        deleteOneUser(req, res, req.params.id)
        res.status(200).json({message: `User ${req.params.id} deleted!!!`})
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
})
app.listen(port, () => {
    console.log(`Running on port ${port}`)
    console.log(`Access on http://127.0.0.1:${port}`)
})