const {cartRead, cartCreate, cartDeleteOne} = require('../Model/cartModel')

async function readCart(req, res, session_id) {
    try {
        const userCart = await cartRead(session_id);
        if (res.status(200)) {
            res.status(200).json(userCart);
        }
    } catch (e) {
        console.log(e);
    }
}
async function writeCart(req, res, session_id) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request, missing request body' });
        }
        console.log(req.body);
        const { name, width, height, weight, price } = req.body;
        const cartData = {
            name,
            width,
            height,
            weight,
            price,
            session_id
        };
        const addedToCart = await cartCreate(Object.values(cartData));
        res.status(201).json(addedToCart);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteOneCart(req, res, session_id){
    try {
        const { name } = req.body;
        const deletedUser = await cartDeleteOne(name, session_id);
        res.status(200).json(deletedUser);
    } catch (e) {
        console.error(e)
        res.status(500).json(`problem deleting: ${e}`)
    }
}

module.exports ={
    readCart,
    writeCart,
    deleteOneCart
}