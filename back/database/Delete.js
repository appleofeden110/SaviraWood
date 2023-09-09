const mysql = require('mysql');
const config = require('../database/config.js');

const connection = mysql.createConnection(config);

const sql = 'DELETE FROM woodenpictures WHERE id = ?'

function deleteOne(id) {
    connection.query(sql, id, (err, results, fields) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Rows Affected: ${results.affectedRows}`);
        }
    })
}

module.exports = {
    deleteOne
}