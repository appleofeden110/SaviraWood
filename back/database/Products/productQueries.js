const mysql = require('mysql');
const config = require('../config.js');
const connection = mysql.createConnection(config);
function readProduct(obj) {
    const getAllProducts = `SELECT * FROM woodenpictures`;
        return new Promise ((resolve, reject) => {
            connection.query(getAllProducts, (err, results, fields) => {
                if (err) {
                    console.log(`Error fetching data: ${err}`);
                    reject(err);
                } else { 
                    let lastResult = {...results};
                    console.log(lastResult)
                    resolve(Object.assign(obj, lastResult))
                }
                
            })    
        })
    };
function createProduct(data) {
    const createOneProduct = 'INSERT INTO woodenpictures(name, width, height, weight, price)  VALUES ?  '
        connection.query(createOneProduct, [data], (err, results, fields) => {
            if(err){
                console.log(err);
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`);
                
            }
        })
    }
function updateProduct(data) {
    const updateProductById = 'UPDATE woodenpictures SET name = ?, width = ?, height = ?, weight = ?, price = ? WHERE id = ?'
    console.log(data)
        connection.query(updateProductById, data, (err, results, fields) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`)
                
            }
        })
    }
function deleteProduct(id) {
    const deleteProductById = 'DELETE FROM woodenpictures WHERE id = ?';
        connection.query(deleteProductById, id, (err, results, fields) => {
            if (err) {
                console.log(`Error deleting data: ${err}`);
                return err
            } else {
                console.log(`Rows affected: ${results.affectedRows}`)
            }
        })
    }
module.exports = {
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct
}