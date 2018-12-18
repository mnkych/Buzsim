const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeMarketing', async (req, res) => {
    const data = await knex.select()
        .table('Marketing')
    res.send(data)
})

router.get('/SeMarketingNotInBM', async (req, res) => {
    const data = await knex('Marketing')
        .whereNotExists(knex.select('*')
            .from('BusinessMarketing')
            .whereRaw('Marketing.MarketingID = BusinessMarketing.MarketingID'))
        .select()
    res.send(data)
})

router.post('/SeMarketingBusinessMarket', async (req, res) => {
    const data = await knex('BusinessMarketing')
        .innerJoin('Marketing', 'BusinessMarketing.MarketingID', 'Marketing.MarketingID')
        .where('BusinessMarketing.BusinessID', req.body.BusinessID)
        .select('Marketing.*')
    res.send(data)
})

router.post('/InMarketing', async (req, res) => {
    try {
        await knex.table('Marketing')
            .insert({
                Channel: req.body.Channel,
                PricePerTime: req.body.PricePerTime
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/InBuMarketing', async (req, res) => {
    try {
        await knex.table('BusinessMarketing')
            .insert({
                BusinessID: req.body.BusinessID,
                MarketingID: req.body.MarketingID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelMarketing', async (req, res) => {
    try {
        await knex('Marketing')
            .whereNotExists(knex.select('*')
                .from('BusinessMarketing')
                .whereRaw('Marketing.MarketingID = BusinessMarketing.MarketingID'))
            .andWhere('Marketing.MarketingID', req.body.MarketingID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelMarkID', async (req, res) => {
    try {
        const data = await knex('Marketing')
            .where('Marketing.MarketingID', req.body.MarketingID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:BusinessID', async (req, res) => {
    const data = await knex('Marketing')
        .innerJoin(
            'BusinessMarketing',
            'Marketing.MarketingID',
            'BusinessMarketing.MarketingID'
        )
        .where(
            'BusinessID', req.params.BusinessID,
        )
        .select()
    res.send(data)
})
module.exports = router