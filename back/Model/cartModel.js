const {readCart, addToCart, removeFromCart} = require('../database/cartQueries')

let cart = [];

function cartRead(sessionId) {
    try{
        return new Promise( async (resolve, reject)=> {
           await readCart(cart, sessionId)
           resolve(cart, sessionId)
        })
    } catch (e) {
        console.error(e)
    }
}

function cartCreate(usCartData) {
    try {
        return new Promise(async(resolve, reject) => {
            const userCart = await addToCart([usCartData]);
            console.log(userCart)
            resolve(userCart)
        })
    } catch (e) {
        console.error(e)
    }
}

function cartDeleteOne(name, session_id) {
    try {
        return new Promise(async(resolve, reject) => {
            const deletedCart = await removeFromCart(name, session_id);
            console.log(deletedCart);
            resolve(deletedCart)
        })
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    cartRead,
    cartCreate,
    cartDeleteOne
}