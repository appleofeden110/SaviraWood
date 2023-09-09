const mysql = require('mysql');
const config = require('../database/config.js');

const connection = mysql.createConnection(config);
const getall = `SELECT * FROM woodenpictures`;

function readGET(products) {
    connection.query(getall, (err, results, fields) => {
    if (err) {
            console.log(`Error fetching data: ${err}`);
            return;
    }
    console.log('Data received from DB');
    return products.push(results)
    })
};

module.exports = {
    readGET,
}