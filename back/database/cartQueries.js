const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config)

function readCart(arr, session_id) {
    const sql = 'SELECT * FROM cart_items WHERE session_id = ?';
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                console.log(`Error getting connection: ${err}`)
                reject (err);
                return;
            }
            connection.release()
            connection.query(sql, [session_id], (err, results, fields) => {
                    if (!err) {
                        if (arr.length === 0) {
                            results.forEach((element) => {
                                console.log(element);
                                arr.push(element);
                            });
                            resolve(arr);
                        } else {
                            resolve(arr);
                        }
                    } else {
                        reject(err);
                        console.error(err);
                    }
                });
            })
        }).catch((error) => {
        console.error(error);
    });
}

function addToCart(data) {
   const sql = 'INSERT INTO cart_items(name, width, height, weight, price, session_id) VALUES ?';
   return new Promise((resolve, reject) => {
       pool.getConnection((err, connection) => {
           if(err) {
               reject(err);
               console.error(err);
               return;
           }
           connection.query(sql, [data], (err, results, fields) => {
               connection.release()
               if(err){
                   console.log(err)
                   reject(err)
               } else {
                   console.log(`Rows affected: ${results.affectedRows}`)
                   resolve(data)
               }
           })
       })

   })
}

function removeFromCart(name, session_id) {
    const sql = 'DELETE FROM cart_items WHERE name = ? AND session_id = ?'
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err)
                reject(err);
                return;
            }
            connection.query(sql, [name, session_id], (err, results, fields) => {
               connection.release();
               if (err){
                 console.log(err)
                 reject(err);
               } else {
                   console.log(`Rows Affected: ${results.affectedRows}`)
                   resolve([name, session_id])
               }
            })

        })
    })
}

module.exports = {
    readCart,
    addToCart,
    removeFromCart
}