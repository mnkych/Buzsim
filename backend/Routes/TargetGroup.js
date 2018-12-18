const express = require('express');
const router = express.Router();
const knex = require('./../Configs');


router.post('/ProductAccept', async (req, res) => {
    const data = await knex('TargetGroup')
        .innerJoin('BusinessProductAcceptByTarget', 'TargetGroup.TargetGroupID', 'BusinessProductAcceptByTarget.TargetGroupID')
        .where({
            'BusinessProductAcceptByTarget.BusinessID': req.body.businessID,
            'TargetGroup.TargetGroupID': req.body.targetGroupID
        })
        .select('BusinessProductAcceptByTarget.*')
    res.send(data)
})


router.post('/SeBuProductAcceptByTarget', async (req, res) => {
    const data = await knex('TargetGroup')
        .innerJoin('BusinessProductAcceptByTarget', 'TargetGroup.TargetGroupID', 'BusinessProductAcceptByTarget.TargetGroupID')
        .innerJoin('Product','Product.ProductID','BusinessProductAcceptByTarget.ProductID')
        .where({
            'BusinessProductAcceptByTarget.BusinessID': req.body.BusinessID
        })
        .select('*')
    res.send(data)
})

router.get('/SeTargetGroup', async (req, res) => {
    const data = await knex.select().table('TargetGroup')
    res.send(data)
})

router.post('/SeTargetGroupBuBuTarget', async (req, res) => {
    const data = await knex('BusinessTargetGroup')
        .innerJoin('Business', 'BusinessTargetGroup.BusinessID', 'Business.BusinessID')
        .innerJoin('TargetGroup', 'BusinessTargetGroup.TargetGroupID', 'TargetGroup.TargetGroupID')
        .where('BusinessTargetGroup.BusinessID', req.body.BusinessID)
        .select('BusinessTargetGroup.*','TargetGroup.*')
    res.send(data)
})

router.post('/InBuTargetGroup', async (req, res) => {
    try {
        await knex.table('BusinessTargetGroup')
            .insert({
                BusinessID: req.body.BusinessID,
                TargetGroupID: req.body.TargetGroupID,
                TargetGroupQuantityRatio: req.body.TargetGroupQuantityRatio,
                TargetGroupGrowUpRatio: req.body.TargetGroupGrowUpRatio,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})
router.post('/InProductAcceptByTarget', async (req, res) => {
    try {
        await knex.table('BusinessProductAcceptByTarget')
            .insert({
                AcceptRatio: req.body.AcceptRatio,
                BusinessID: req.body.BusinessID,
                TargetGroupID: req.body.TargetGroupID,
                ProductID: req.body.ProductID,
                AcceptRatioGrowUpRate: req.body.AcceptRatioGrowUpRate,
                MaximumPriceRate: req.body.MaximumPriceRate,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:businessID', async (req, res) => {
    const data = await knex('TargetGroup')
        .innerJoin('BusinessTargetGroup', 'TargetGroup.TargetGroupID', 'BusinessTargetGroup.TargetGroupID')
        .where('BusinessID', req.params.businessID)
        .select('*')
    res.send(data)
})


module.exports = router