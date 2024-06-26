const { Client } = require('pg');
const config = require('../config');

const conString = config.urlConnection;
const client = new Client(conString);

client.connect(function(error) {
    if (error) {
        return console.error("Unable to connect to database. Error", error);
    } client.query('SELECT NOW()', function (error, results) {
        if (error) {
            return console.error('Error executing the query. Error', error);
        }
        console.log('Connected to database');
        console.log(results.rows[0]);
    })
})

module.exports = client;