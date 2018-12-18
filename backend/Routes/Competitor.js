const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeCompetitorNotInBC', async (req, res) => {
    const data = await knex('CompetitorScore')
        .whereNotExists(knex.select('*')
            .from('BusinessCompetitor')
            .whereRaw('CompetitorScore.CompetitorScoreID = BusinessCompetitor.CompetitorScoreID'))
        .select()
    res.send(data)
})

router.post('/SeCompetitorBusinessCom', async (req, res) => {
    const data = await knex('BusinessCompetitor')
        .innerJoin('CompetitorScore', 'BusinessCompetitor.CompetitorScoreID', 'CompetitorScore.CompetitorScoreID')
        .where('BusinessCompetitor.BusinessID', req.body.BusinessID)
        .select('CompetitorScore.*')
    res.send(data)
})

router.post('/InCompetitor', async (req, res) => {
    try {
        await knex.table('CompetitorScore')
            .insert({
                CompetitorScoreID: req.body.CompetitorScoreID,
                DecorationScore: req.body.DecorationScore,
                ProductVarietyScore: req.body.ProductVarietyScore,
                ProductQualityScore: req.body.ProductQualityScore,
                SizeScore: req.body.SizeScore,
                DayScore: req.body.DayScore,
                TimeScore: req.body.TimeScore,
                NumberOfEmployeeScore: req.body.NumberOfEmployeeScore,
                NumberOfAssistanceScore: req.body.NumberOfAssistanceScore,
                MarketingVarietyScore: req.body.MarketingVarietyScore,
                MarketingFrequencyScore: req.body.MarketingFrequencyScore,
                CompetitorName: req.body.CompetitorName

            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/InBuCompetitor', async (req, res) => {
    try {
        await knex.table('BusinessCompetitor')
            .insert({
                BusinessID: req.body.BusinessID,
                CompetitorScoreID: req.body.CompetitorScoreID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelCompetID', async (req, res) => {
    try {
        const data = await knex('CompetitorScore')
            .where('CompetitorScore.CompetitorScoreID', req.body.CompetitorScoreID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/SeCompetitor', async (req, res) => {
    const data = await knex.select()
        .table('CompetitorScore')
    res.send(data)
})

router.get('/:BusinessID', async (req, res) => {
    const data = await knex('BusinessCompetitor')
        .innerJoin(
            'CompetitorScore',
            'BusinessCompetitor.CompetitorScoreID',
            'CompetitorScore.CompetitorScoreID'
        )
        .where(
            'BusinessCompetitor.BusinessID', req.params.BusinessID,
        )
        .select()
    res.send(data)
})


module.exports = router