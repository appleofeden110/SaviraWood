const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config);
const conn = mysql.createConnection(config)
function readUser(arr) {
    const sql = `SELECT * FROM users`;
        return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(`Error getting connection: ${err}`);
                reject(err);
                return;
            }
            connection.query(sql, (err, results, fields) => {
                connection.release(); // Release the connection when done with the query.

                if (err) {
                    console.log(`Error fetching data: ${err}`);
                    reject(err);
                } else {
                    if (arr.length === 0){
                        results.forEach((element) => {
                            console.log(element);
                            resolve(arr.push(element));
                        });
                    } else {
                        resolve(arr)
                    }
                }
            });
        });
    });
}
function createUser(data) {
    const sql = 'INSERT INTO users(name, surname, email, password, is_admin, session_id)  VALUES ?  '
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
                if(err) {
                     console.log(`Error getting connection: ${err}`)
                     reject(err);
                     return;
                }
                connection.query(sql, [data], (err, results, fields) => {
                    connection.release()
                    if(err){
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(`Rows Affected: ${results.affectedRows}`);
                        resolve(data);
                    }
                })
            })
        })
    }
function updateUser(data) {
    const sql = 'UPDATE users SET name = ?, surname = ?, email = ?, password = ?, is_admin = ?, session_id = ? WHERE id = ?'
        conn.query(sql, data, (err, results, fields) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`)
            }
        })
    }
function deleteUser(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
        conn.query(sql, id, (err, results, fields) => {
            if (err) {
                console.log(`Error deleting data: ${err}`);
            } else {
                return results; 
            }
        })
    }
module.exports = {
    readUser,
    createUser,
    updateUser,
    deleteUser
}