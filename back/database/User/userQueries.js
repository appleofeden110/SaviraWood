const mysql = require('mysql');
const config = require('../config.js');
const connection = mysql.createConnection(config);
function readUser(obj) {
    const getAllUsers = `SELECT * FROM users`;
        return new Promise ((resolve, reject) => {
            connection.query(getAllUsers, (err, results, fields) => {
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
function createUser(data) {
    const createOneUser = 'INSERT INTO users(name, surname, email, password, is_admin)  VALUES ?  '
        connection.query(createOneUser, [data], (err, results, fields) => {
            if(err){
                console.log(err);
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`);
                
            }
        })
    }
function updateUser(data) {
    const updateUserById = 'UPDATE users SET name = ?, surname = ?, email = ?, password = ?, is_admin = ? WHERE id = ?'
        connection.query(updateUserById, data, (err, results, fields) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Rows Affected: ${results.affectedRows}`)
            }
        })
    }
function deleteUser(id) {
    const deleteUserById = 'DELETE FROM users WHERE id = ?';
        connection.query(deleteUserById, id, (err, results, fields) => {
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