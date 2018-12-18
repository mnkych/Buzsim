const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.post('/ID', async (req, res) => {
    const data = await knex('ProductQuality')
        .innerJoin(
            'BusinessProductSeller',
            'ProductQuality.ProductQualityID',
            'BusinessProductSeller.ProductQualityID')
        .innerJoin(
            'Quality',
            'Quality.QualityID',
            'ProductQuality.QualityID'
        )
        .innerJoin(
            'Product',
            'Product.ProductID',
            'ProductQuality.ProductID'
        )
        .where({
            'BusinessProductSeller.BusinessID': req.body.BusinessID,
            'Product.ProductID': req.body.ProductID
        })
        .select()
    res.send(data)
})

router.get('/Choice/:businessID', async (req, res) => {
    const data = await knex('ProductQuality')
        .distinct('Product.ProductName', 'Product.ProductID')
        .innerJoin(
            'BusinessProductSeller',
            'ProductQuality.ProductQualityID',
            'BusinessProductSeller.ProductQualityID'
        )
        .innerJoin(
            'Quality',
            'Quality.QualityID',
            'ProductQuality.QualityID'
        )
        .innerJoin(
            'Product',
            'Product.ProductID',
            'ProductQuality.ProductID'
        )
        .where('BusinessID', req.params.businessID)
        .select()
    res.send(data)
})

router.get('/SeProduct', async (req, res) => {
    const data = await knex.select()
        .table('Product')
    res.send(data)
})

router.get('/SeQuality', async (req, res) => {
    const data = await knex.select()
        .table('Quality')
    res.send(data)
})

router.get('/SeProductQuality', async (req, res) => {
    const data = await knex.select()
        .table('ProductQuality')
    res.send(data)
})

router.get('/SeProductNotInBP', async (req, res) => {
    const data = await knex('Product')
        .whereNotExists(knex.select('*')
            .from('BusinessProductAcceptByTarget')
            .whereRaw('Product.ProductID = BusinessProductAcceptByTarget.ProductID'))
        .whereNotExists(knex.select('*')
            .from('ProductQuality')
            .whereRaw('Product.ProductID = ProductQuality.ProductID'))
        .select()
    res.send(data)
})

router.post('/SeBuProductSellerProdQualityProd', async (req, res) => {
    const data = await knex('BusinessProductSeller')
        .distinct('Product.ProductID')
        .innerJoin('ProductQuality', 'BusinessProductSeller.ProductQualityID', 'ProductQuality.ProductQualityID')
        .innerJoin('Product', 'ProductQuality.ProductID', 'Product.ProductID')
        .where('BusinessProductSeller.BusinessID', req.body.BusinessID)
        .select('Product.*')
    res.send(data)
})

router.post('/SeBuProductSellerProdQualityProdQuality', async (req, res) => {
    const data = await knex('BusinessProductSeller')
        .innerJoin('ProductQuality', 'BusinessProductSeller.ProductQualityID', 'ProductQuality.ProductQualityID')
        .innerJoin('Product', 'ProductQuality.ProductID', 'Product.ProductID')
        .innerJoin('Quality', 'ProductQuality.QualityID', 'Quality.QualityID')
        .where('BusinessProductSeller.BusinessID', req.body.BusinessID)
        .select('*')
    res.send(data)
})

router.post('/InProduct', async (req, res) => {
    try {
        await knex.table('Product')
            .insert({
                ProductName: req.body.ProductName,
                ProductType: req.body.ProductType,
                ProductDepreciationRatio: req.body.ProductDepreciationRatio
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/InProductQuality', async (req, res) => {
    try {
        await knex.table('ProductQuality')
            .insert({
                BasePricePerUnit: req.body.BasePricePerUnit,
                QualityID: req.body.QualityID,
                ProductID: req.body.ProductID
            }).then(e => {
                res.send(e)
            })
    } catch (e) {
        res.send(false)
    }
})

router.post('/InBuProductSeller', async (req, res) => {
    try {
        await knex.table('BusinessProductSeller')
            .insert({
                BusinessID: req.body.BusinessID,
                ProductQualityID: req.body.ProductQualityID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelProductQuality', async (req, res) => {
    try {
        await knex('ProductQuality')
            .whereIn('ProductQuality.ProductQualityID',
                knex.select('ProductQualityID').from('BusinessProductSeller').where('BusinessProductSeller.BusinessID', req.body.BusinessID))
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelProduct', async (req, res) => {
    try {
        const data = await knex('Product')
            .where('ProductID', req.body.ProductID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

module.exports = router