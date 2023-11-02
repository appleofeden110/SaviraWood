//express init
const express = require('express');
const app = express();
app.use(express.json())
//cors
const cors = require('cors')
app.use(cors());
//router config
const router = express.Router(['caseSensetive']);
//port init
const port = 5050;
//controllers import
const { getAllUsers, getOneUser, createOneUser, updateOneUser, deleteOneUser, loginUser } = require('./Controller/userController');
const { getAllProducts, getOneProduct, createOneProduct, updateOneProduct, deleteOneProduct } = require('./Controller/productController')
const { readCart, writeCart, deleteOneCart } = require('./Controller/cartController');
//Default
app.get('/', (req, res) => {
    res
        .status(200)
        .json({message: 'WELCOME to SaviraWood!!! The best wooden pictures and furniture you can find for a price'})
})

// Products

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

//Login
app.post('/login', (req, res, next) => {
    try {
        loginUser(req, res);
        console.log(`Login successful! Welcome!`);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }

})

//Cart
app.get('/cart/:session', (req, res) => {
    try {
        readCart(req, res, req.params.session);
        console.log('Cart has been fetched');
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
})
app.post('/cart/:session', (req, res) => {
    try {
        writeCart(req, res, req.params.session)
        console.log(req.body)
        console.log('cart has been written into')
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})

app.delete('/cart/:session', (req, res)=> {
    try {
        deleteOneCart(req, res, req.params.session);
        console.log(req.body)
        console.log('Record has been deleted')
    } catch(e) {
        console.log(e);
    }
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
    console.log(`Access on http://127.0.0.1:${port}`)
})

