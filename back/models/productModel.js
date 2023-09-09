const { readGET } = require('../database/Read');
const { createOne } = require('../database/Create');
const { updateOne } = require('../database/Update');
const { deleteOne } = require('../database/Delete');

let products = [];

readGET(products);

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products[0]);
    });
}

function findOne(id) {
    try{
        return new Promise((resolve, reject) => {
            const product = products[0].find((p) => p.id === id);
            resolve(product)
        })
    } catch (error) {
        console.log(error)
    }
};

function create(product) {
    try{
        return new Promise((resolve, reject) => { 
            const newProduct = [product];
            resolve(createOne(newProduct));
        })
    } catch (error) {
        console.log(error)
    }
};

function update(product) {
    try {
        return new Promise((resolve, reject) => {
            resolve(updateOne(product))
        })
    } catch (err) {
        console.log(err)
    }
}

function remove(id) {
    try {
        return new Promise((resolve, reject) => {
            resolve(deleteOne(id))
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    findAll,
    findOne, 
    create, 
    update,
    remove
};