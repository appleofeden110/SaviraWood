const mysql = require('mysql');
const config = require('../database/config.js');

const connection = mysql.createConnection(config);

// insert statment
const sql = `INSERT INTO woodenpictures(name, width, height, weight, price )  VALUES ?  `;

function createOne(prods) {
    
    connection.query(sql, [prods], (err, results, fields) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Row inserted:' + results.affectedRows);
    }      
})}
module.exports = {
  createOne
}