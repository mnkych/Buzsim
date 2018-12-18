const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.post('/getUser', async (req, res) => {
    try {
        const data = await knex('User').where({
            Username: req.body.Username,
        }).select()
        res.send(data)
    } catch (e) {
        res.send(false)
    }
})

router.post('/logIn', async (req, res) => {
    try {
        const data = await knex('User').where({
            Username: req.body.Username,
            Password: req.body.Password,
        }).select()
        res.send(data[0])
    } catch (e) {
        res.send(false)
    }
})
module.exports = router