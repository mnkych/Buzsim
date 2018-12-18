const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeBusiness', async (req, res) => {
    const data = await knex.select().table('Business')
    res.send(data)
})

router.post('/InBuScenario', async (req, res) => {
    try {
        await knex.table('Business')
            .insert({
                BusinessName: req.body.BusinessName,
                BusinessStartMoney: req.body.BusinessStartMoney,
                BusinessLoanInterestRate: req.body.BusinessLoanInterestRate,
                BusinessEconomicEvent: req.body.BusinessEconomicEvent,
                BusinessGrossDemand: req.body.BusinessGrossDemand,
                BusinessGrossDemandGrowUpRate: req.body.BusinessGrossDemandGrowUpRate,
                BusinessLicenseCost: req.body.BusinessLicenseCost,
                BusinessProductDescription: req.body.BusinessProductDescription,
                BusinessEmployeeDescription: req.body.BusinessEmployeeDescription,
                BusinessScenarioDescription: req.body.BusinessScenarioDescription,
                BusinessInflation: req.body.BusinessInflation,
                BusinessPlayingYear: req.body.BusinessPlayingYear,
                BusinessPriceGrowthPolicy: req.body.BusinessPriceGrowthPolicy,
                BusinessPromotionDescription: req.body.BusinessPromotionDescription,
                BusinessDecorationDescription: req.body.BusinessDecorationDescription,
                BusinessTargetGroupDescription: req.body.BusinessTargetGroupDescription,
                BusinessOperatingTimeDescription: req.body.BusinessOperatingTimeDescription,
                BusinessStoreOperationDescription: req.body.BusinessStoreOperationDescription,
            }).then(e => {
                res.send(e)
            })
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelBusiness', async (req, res) => {
    try {
        await knex('Business')
            .where('BusinessID', req.body.BusinessID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})


router.get('/:businessID', async (req, res) => {
    const data = await knex
        .table('Business')
        .where('BusinessID', req.params.businessID)
        .select()
    res.send(data[0])
})

module.exports = router
