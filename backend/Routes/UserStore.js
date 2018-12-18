const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.post('/deleteUserStore', async (req, res) => {
    try {
        const data = await knex(req.body.tableName)
            .where('StoreID', req.body.StoreID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/getUserStore', async (req, res) => {
    const data = await knex('Store')
        .innerJoin('BusinessLocationSizeOwnerRelevant', 'Store.BusinessLocationSizeOwnerRelevantID', 'BusinessLocationSizeOwnerRelevant.BLSORID')
        .where('Store.StoreID', req.body.StoreID)
        .andWhere('BusinessLocationSizeOwnerRelevant.BLSORID', req.body.BusinessLocationSizeOwnerRelevantID)
        .select()
    res.send(data[0])
})

router.post('/getDecorationUserStore', async (req, res) => {
    const data = await knex('StoreDecoration')
        .innerJoin('BusinessDecoration', 'StoreDecoration.BusinessDecorationID', 'BusinessDecoration.BusinessDecorationID')
        .innerJoin('Decoration', 'BusinessDecoration.DecorationID', 'Decoration.DecorationID')
        .where('StoreDecoration.StoreID', req.body.StoreID)
        .select('BusinessDecoration.*', 'Decoration.*')
    res.send(data)
})

router.post('/getMarketingUserStore', async (req, res) => {
    const data = await knex('StoreMarketing')
        .innerJoin('BusinessMarketing', 'StoreMarketing.BusinessMarketingID', 'BusinessMarketing.BusinessMarketingID')
        .innerJoin('Marketing', 'BusinessMarketing.MarketingID', 'Marketing.MarketingID')
        .where('StoreMarketing.StoreID', req.body.StoreID)
        .select()
    res.send(data)
})

router.post('/getHumanResourceUserStore', async (req, res) => {
    const data = await knex('StoreHireEmployee')
        .innerJoin('BusinessHireEmployee', 'StoreHireEmployee.BusinessHireEmployeeID', 'BusinessHireEmployee.BusinessHireEmployeeID')
        .innerJoin('HumanResource', 'BusinessHireEmployee.HumanResourceID', 'HumanResource.HumanResourceID')
        .where('StoreHireEmployee.StoreID', req.body.StoreID)
        .select()
    res.send(data)
})

router.post('/getProductUserStore', async (req, res) => {
    const data = await knex('StoreProductForSale')
        .innerJoin('Store','StoreProductForSale.StoreID','Store.StoreID')
        .innerJoin('BusinessProductSeller','StoreProductForSale.BusinessProductSellerID','BusinessProductSeller.BusinessProductSellerID')
        .innerJoin('ProductQuality', 'BusinessProductSeller.ProductQualityID', 'ProductQuality.ProductQualityID')
        .innerJoin('Product', 'Product.ProductID', 'ProductQuality.ProductID')
        .innerJoin('Quality', 'Quality.QualityID', 'ProductQuality.QualityID')
        .where('StoreProductForSale.StoreID', req.body.StoreID)
        .select()
    res.send(data)
})

router.post('/SeStoreClassID', async (req, res) => {
    const data = await knex('Store')
        .innerJoin('Class', 'Store.ClassID', 'Class.ClassID')
        .where('Store.ClassID', req.body.ClassID)
        .select()
    res.send(data)
})

router.post('/SeStoreStoreID', async (req, res) => {
    const data = await knex('Store')
        .innerJoin('Class', 'Store.ClassID', 'Class.ClassID')
        .where('Store.StoreID', req.body.StoreID)
        .select()
    res.send(data[0])
})

router.post('/putUserStore', async (req, res) => {
    try {
        await knex.table("Store")
            .returning('StoreID')
            .insert({
                StoreName: req.body.StoreName,
                StoreOperatingDay: req.body.StoreOperatingDay,
                StoreOperatingHour: req.body.StoreOperatingHour,
                ClassID: req.body.ClassID,
                BusinessLocationSizeOwnerRelevantID: req.body.BusinessLocationSizeOwnerRelevantID,
                BusinessTargetGroupID: req.body.BusinessTargetGroupID,
                StoreEmail: req.body.StoreEmail,
                StoreOpenTime: req.body.StoreOpenTime,
                StoreCloseTime: req.body.StoreCloseTime,
                StoreBonus: req.body.StoreBonus,
                StoreAllowance: req.body.StoreAllowance
            }).then(e => {
                res.send(e)
            })
    } catch (e) {
        res.send(false)
    }
})

router.post('/putDecorationStore', async (req, res) => {
    try {
        await knex.table("StoreDecoration")
            .insert({
                BusinessDecorationID: req.body.BusinessDecorationID,
                StoreID: req.body.StoreID
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/putProductOnStore', async (req, res) => {
    try {
        await knex.table("StoreProductForSale")
            .insert({
                Amount: req.body.Amount,
                PriceForSale: req.body.PriceForSale,
                BusinessProductSellerID: req.body.BusinessProductSellerID,
                StoreID: req.body.StoreID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/putMarketingOnStore', async (req, res) => {
    try {
        await knex.table("StoreMarketing")
            .insert({
                BusinessMarketingID: req.body.BusinessMarketingID,
                StoreID: req.body.StoreID,
                Frequency: req.body.Frequency,
                Reacher: req.body.Reacher,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/putEmployeeOnStore', async (req, res) => {
    try {
        await knex.table("StoreHireEmployee")
            .insert({
                EmployeeOperatingHour: req.body.EmployeeOperatingHour,
                EmployeeOperatingDay: req.body.EmployeeOperatingDay,
                NumberOfEmployee: req.body.NumberOfEmployee,
                StoreID: req.body.StoreID,
                BusinessHireEmployeeID: req.body.BusinessHireEmployeeID,
                Experience: req.body.Experience,
                OwnerSalary:req.body.OwnerSalary
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.get('/:roomKey', async (req, res) => {
    const data = await knex
        ('Class')
        .where('Class.EnterCode', req.params.roomKey)
        .select('*')
    res.send(data[0])
})

router.post('/', async (req, res) => {
    const data = await knex('Store')
        .innerJoin('Class', 'Store.ClassID', 'Class.ClassID')
        .where('StoreEmail', req.body.StoreEmail)
        .andWhere('Class.BusinessID', req.body.BusinessID)
        .andWhere('Class.ClassID', req.body.ClassID)
        .select('*')
    res.send(data[0])
})



module.exports = router