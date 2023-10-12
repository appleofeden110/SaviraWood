const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config)
const conn = mysql.createConnection(config);
function readProduct(arr) {
    const sql = 'SELECT * FROM woodenpictures'
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                connection.query(sql, (err, results, fields) => {
                  connection.release();
                  if(!err) {
                      if(arr.length===0){
                          results.forEach((element) => {
                              console.log(element);
                              resolve(arr.push(element));
                          });
                      } else {
                        resolve(arr)
                      }
                  } else {
                      console.log(err)
                      reject(err)
                  }
                })
            } else {
                console.log(err)
                reject(err)
                return new Error(err)
            }
        })
    })
}
function createProduct(data) {
    const sql = 'INSERT INTO woodenpictures(name, width, height, weight, price)  VALUES ?  '
        conn.query(sql, [data], (err, results, fields) => {
            if(err){
                console.log(err);
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`);
            }
        })
    }
function updateProduct(data) {
    const sql = 'UPDATE woodenpictures SET name = ?, width = ?, height = ?, weight = ?, price = ? WHERE id = ?'
    console.log(data)
        conn.query(sql, data, (err, results, fields) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`)
                
            }
        })
    }
function deleteProduct(id) {
    const sql = 'DELETE FROM woodenpictures WHERE id = ?';
        conn.query(sql, id, (err, results, fields) => {
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