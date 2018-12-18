const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeEnterCode', async (req, res) => {
    const data = await knex.select('EnterCode').table('Class')
    res.send(data)
})

router.get('/SeClassroom', async (req, res) => {
    const data = await knex('Class')
    .innerJoin('Business', 'Business.BusinessID', 'Class.BusinessID')
    .select('*')
    res.send(data)
})

router.get('/SeBusinessNotInClassroom', async (req, res) => {
    const data = await knex('Business')
        .whereNotExists(knex.select('*')
            .from('Class')
            .whereRaw('Business.BusinessID = Class.BusinessID'))
            .andWhereRaw('Business.BusinessID != 1')
            .andWhereRaw('Business.BusinessID != 2')
            .andWhereRaw('Business.BusinessID != 3')
        .select()
    res.send(data)
})

router.post('/InClassroom', async (req, res) => {
    try {
        await knex.table('Class')
            .insert({
                CreatedDate: req.body.CreatedDate,
                ClassroomName: req.body.ClassroomName,
                EnterCode: req.body.EnterCode,
                BusinessID: req.body.BusinessID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelClassroom', async (req, res) => {
    try {
        const data = await knex('Class')
            .where('Class.ClassID', req.body.ClassID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

module.exports = router
