const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeOwnership', async (req, res) => {
    const data = await knex.select().table('Ownership')
    res.send(data)
})

router.get('/SeOwnerNotInB', async (req, res) => {
    const data = await knex('Ownership')
        .whereNotExists(knex.select('*')
            .from('BusinessLocationSizeOwnerRelevant')
            .whereRaw('Ownership.OwnershipID = BusinessLocationSizeOwnerRelevant.OwnershipID'))
        .select()
    res.send(data)
})

router.post('/SeOwnershipBusinessRelate', async (req, res) => {
    const data = await knex('BusinessLocationSizeOwnerRelevant')
        .distinct('Ownership.OwnershipID')
        .innerJoin('Business', 'BusinessLocationSizeOwnerRelevant.BusinessID', 'Business.BusinessID')
        .innerJoin('Ownership', 'BusinessLocationSizeOwnerRelevant.OwnershipID', 'Ownership.OwnershipID')
        .where('BusinessLocationSizeOwnerRelevant.BusinessID', req.body.BusinessID)
        .select('Ownership.*')
    res.send(data)
})

router.post('/InOwnership', async (req, res) => {
    try {
        await knex.table('Ownership')
            .insert({
                OwnershipID: req.body.OwnershipID,
                OwnershipName: req.body.OwnershipName,
                MaintainCost: req.body.MaintainCost,
                LandTaxCost: req.body.LandTaxCost,
                OtherCost: req.body.OtherCost,
                OwnerBaseElectricityPerUnit: req.body.OwnerBaseElectricityPerUnit,
                OwnerDepreciationAging: req.body.OwnerDepreciationAging
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelOwner', async (req, res) => {
    try {
        const data = await knex('Ownership')
            .where('OwnershipID', req.body.OwnershipID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:businessID', async (req, res) => {
    const data = await knex('Ownership')
        .distinct(
            'Ownership.OwnershipID'
        )
        .innerJoin(
            'BusinessLocationSizeOwnerRelevant',
            'Ownership.OwnershipID',
            'BusinessLocationSizeOwnerRelevant.OwnershipID'
        )
        .where(
            'BusinessID',
            req.params.businessID
        )
        .select('Ownership.*')
    res.send(data)
})

module.exports = router