const express = require('express');
const router = express.Router();
const client = require('../database/database');

router.get('/', (req, res) => {
    try {
        console.log("Query GET executing");
        client.query("SELECT * FROM users", function (error, result) {
            if (error) return console.error("Error executing SELECT ALL query from users. Error: ", error)
            res.send(result.rows[0]);
            console.log('Query GET executed successfully');
        })
    } catch (error) {
        console.log("GET query error. Error: ", error)
    }
})

router.post('/', (req, res) => {
    try {
        console.log('Query POST executing', req.body);
        const { email, password } = req.body;
        client.query(
            "INSERT INTO users ( email, password) VALUES ($1, $2) RETURNING * ",
            [email, password],
            function (error, result) {
                if (error) return console.error("Error executing INSERT query. Error: ", error)
                const { id } = result.rows[0];
                res.setHeader("id", "${id}");
                res.status(201).json(result.rows[0]);
                console.log("Query insert successfully");
            }
        )
    } catch (error) {
        console.error("POST query error. Error: ", error)
    }
})

module.exports = router;