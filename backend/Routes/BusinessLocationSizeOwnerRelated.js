const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.post('/SelectedAllRelateWithID', async (req, res) => {
    const data = await knex
        ('BusinessLocationSizeOwnerRelevant')
        .innerJoin('Ownership', 'BusinessLocationSizeOwnerRelevant.OwnershipID', 'Ownership.OwnershipID')
        .innerJoin('Location', 'BusinessLocationSizeOwnerRelevant.LocationID', 'Location.LocationID')
        .innerJoin('Size', 'BusinessLocationSizeOwnerRelevant.SizeID', 'Size.SizeID')
        .where('BusinessID', req.body.BusinessID)
        .select('*')
    res.send(data)
})

router.post('/InBuLocatSizeOwnerRelate', async (req, res) => {
    try {
        await knex.table('BusinessLocationSizeOwnerRelevant')
            .insert({
                PrivillageCost: req.body.PrivillageCost,
                RentalCost: req.body.RentalCost,
                AccountingFee: req.body.AccountingFee,
                BusinessID: req.body.BusinessID,
                LocationID: req.body.LocationID,
                SizeID: req.body.SizeID,
                OwnershipID: req.body.OwnershipID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/', async (req, res) => {
    const data = await knex
        ('BusinessLocationSizeOwnerRelevant')
        .innerJoin('Ownership', 'BusinessLocationSizeOwnerRelevant.OwnershipID', 'Ownership.OwnershipID')
        .innerJoin('Location', 'BusinessLocationSizeOwnerRelevant.LocationID', 'Location.LocationID')
        .innerJoin('Size', 'BusinessLocationSizeOwnerRelevant.SizeID', 'Size.SizeID')
        .where('BusinessID', req.body.businessID).andWhere('Location.LocationID',req.body.locationID).andWhere('Size.SizeID',req.body.sizeID).andWhere('Ownership.OwnershipID',req.body.ownershipID)
        .select(
            'BLSORID', 'AccountingFee','BaseElectricityUnitOnSize','BusinessID','LandTaxCost','Location.LocationID','LocationName','MaintainCost','MarketSharedScore','OtherCost',
            'OwnerBaseElectricityPerUnit','Ownership.OwnershipID', 'OwnershipName','OwnerDepreciationAging','PrivillageCost','RentalCost', 'Size','Size.SizeID','Storage','TotalPopulation',
            'TotalPopulationGrowUpRate','TradingPopulationRatio'
        )
    res.send(data[0])
})

module.exports = router
