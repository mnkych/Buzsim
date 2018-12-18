const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeDecoration', async (req, res) => {
    const data = await knex.select()
        .table('Decoration')
    res.send(data)
})

router.get('/SeDecorationNotInBD', async (req, res) => {
    const data = await knex('Decoration')
        .whereNotExists(knex.select('*')
            .from('BusinessDecoration')
            .whereRaw('Decoration.DecorationID = BusinessDecoration.DecorationID'))
        .select()
    res.send(data)
})

router.post('/SeDecorationBuDec', async (req, res) => {
    const data = await knex('BusinessDecoration')
        .distinct('Decoration.DecorationID')
        .innerJoin('Decoration', 'BusinessDecoration.DecorationID', 'Decoration.DecorationID')
        .where('BusinessDecoration.BusinessID', req.body.BusinessID)
        .select('Decoration.*')
    res.send(data)
})

router.post('/SeAllRelationDecorationBuDec', async (req, res) => {
    const data = await knex('BusinessDecoration')
        .innerJoin('Decoration', 'BusinessDecoration.DecorationID', 'Decoration.DecorationID')
        .where('BusinessDecoration.BusinessID', req.body.BusinessID)
        .select('*')
    res.send(data)
})

router.post('/InDecoration', async (req, res) => {
    try {
        await knex.table('Decoration')
            .insert({
                DecorationItem: req.body.DecorationItem,
                DecorateDepreciationAging: req.body.DecorateDepreciationAging
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/InBuDecoration', async (req, res) => {
    try {
        await knex.table('BusinessDecoration')
            .insert({
                BusinessID: req.body.BusinessID,
                DecorationID: req.body.DecorationID,
                SizeID: req.body.SizeID,
                LocationID: req.body.LocationID,
                Price: req.body.Price,
                ElectricityUnitPerHour: req.body.ElectricityUnitPerHour
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelDecID', async (req, res) => {
    try {
        const data = await knex('Decoration')
            .where('DecorationID', req.body.DecorationID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})
router.post('/', async (req, res) => {
    const data = await knex('Decoration')
        .innerJoin(
            'BusinessDecoration',
            'Decoration.DecorationID',
            'BusinessDecoration.DecorationID'
        )
        .where({
            BusinessID: req.body.BusinessID,
            SizeID: req.body.SizeID,
            LocationID: req.body.LocationID,
        })
        .select()
    res.send(data)
})

module.exports = router