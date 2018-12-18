const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeSize', async (req, res) => {
    const data = await knex.select().table('Size')
    res.send(data)
})

router.get('/SeSizeNotInBB', async (req, res) => {
    const data = await knex('Size')
        .whereNotExists(knex.select('*')
            .from('BusinessLocationSizeOwnerRelevant')
            .whereRaw('Size.SizeID = BusinessLocationSizeOwnerRelevant.SizeID'))
        .whereNotExists(knex.select('*')
            .from('BusinessDecoration')
            .whereRaw('Size.SizeID = BusinessDecoration.SizeID'))
        .select()
    res.send(data)
})

router.post('/SeSizeBusinessRelate', async (req, res) => {
    const data = await knex('BusinessLocationSizeOwnerRelevant')
        .distinct('Size.SizeID')
        .innerJoin('Business', 'BusinessLocationSizeOwnerRelevant.BusinessID', 'Business.BusinessID')
        .innerJoin('Size', 'BusinessLocationSizeOwnerRelevant.SizeID', 'Size.SizeID')
        .where('BusinessLocationSizeOwnerRelevant.BusinessID', req.body.BusinessID)
        .select('Size.*')
    res.send(data)
})

router.post('/InSize', async (req, res) => {
    try {
        await knex.table('Size')
            .insert({
                Size: req.body.Size,
                Storage: req.body.Storage,
                BaseElectricityUnitOnSize: req.body.BaseElectricityUnitOnSize,
                MarketSharedScore: req.body.MarketSharedScore
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelSize', async (req, res) => {
    try {
        const data = await knex('Size')
            .where('SizeID', req.body.SizeID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:businessID', async (req, res) => {
    const data = await knex('Size')
        .distinct(
            'Size.SizeID'
        )
        .innerJoin(
            'BusinessLocationSizeOwnerRelevant',
            'Size.SizeID',
            'BusinessLocationSizeOwnerRelevant.SizeID'
        )
        .where(
            'BusinessID',
            req.params.businessID
        )
        .select('Size.*')
    res.send(data)
})

module.exports = router