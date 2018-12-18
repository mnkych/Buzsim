const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeLocation', async (req, res) => {
    const data = await knex.select()
        .table('Location')
    res.send(data)
})

router.get('/SeLocationNotInBB', async (req, res) => {
    const data = await knex('Location')
        .whereNotExists(knex.select('*')
            .from('BusinessLocationSizeOwnerRelevant')
            .whereRaw('Location.LocationID = BusinessLocationSizeOwnerRelevant.LocationID'))
        .whereNotExists(knex.select('*')
            .from('BusinessDecoration')
            .whereRaw('Location.LocationID = BusinessDecoration.LocationID'))
        .select()
    res.send(data)
})

router.post('/SeLocationBusinessRelate', async (req, res) => {
    const data = await knex('BusinessLocationSizeOwnerRelevant')
        .distinct('Location.LocationID')
        .innerJoin('Business', 'BusinessLocationSizeOwnerRelevant.BusinessID', 'Business.BusinessID')
        .innerJoin('Location', 'BusinessLocationSizeOwnerRelevant.LocationID', 'Location.LocationID')
        .where('BusinessLocationSizeOwnerRelevant.BusinessID', req.body.BusinessID)
        .select('Location.*')
    res.send(data)
})

router.post('/InLocation', async (req, res) => {
    try {
        await knex.table('Location')
            .insert({
                LocationID: req.body.LocationID,
                LocationName: req.body.LocationName,
                TotalPopulation: req.body.TotalPopulation,
                TradingPopulationRatio: req.body.TradingPopulationRatio,
                TotalPopulationGrowUpRate: req.body.TotalPopulationGrowUpRate
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelLocation', async (req, res) => {
    try {
        const data = await knex('Location')
            .where('LocationID', req.body.LocationID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:BusinessID', async (req, res) => {
    const data = await knex('Location')
        .innerJoin(
            'BusinessLocationSizeOwnerRelevant',
            'Location.LocationID',
            'BusinessLocationSizeOwnerRelevant.LocationID'
        )
        .where(
            'BusinessID',
            req.params.BusinessID
        )
        .distinct('Location.LocationID')
        .select('Location.*')
    res.send(data)

})
module.exports = router