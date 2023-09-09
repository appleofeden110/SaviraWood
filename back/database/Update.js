const mysql = require('mysql');
const config = require('../database/config.js');

const connection = mysql.createConnection(config);

// insert statment
const sql = `UPDATE woodenpictures SET name = ?, width = ?, height = ?, weight = ?, price = ? WHERE id = ?`;

function updateOne(prods) {
    connection.query(sql, prods, (err, results, fields) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Row affected:' + results.affectedRows);
    }      
})}
module.exports = {
  updateOne
}