const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const config = require('./config');
const usersRoute = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use('/users', usersRoute);

app.get('/', (req,res) => {
    console.log('Response OK');
    res.send("Server connected");
})

app.listen(config.port, () => console.log("Server listen on port: " + config.port));
module.exports = app;