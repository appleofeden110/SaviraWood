const { createConnection } = require('mysql');
const config = require('./config.js');
const connection = createConnection(config);

connection.connect((err) => {
    if (err) {
        console.log(`Error connecting to DB: ${err}`);
        return;
    }
    console.log('Connection established');
});

connection.end()