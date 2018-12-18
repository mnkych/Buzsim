const express = require('express');
const router = express.Router();
const knex = require('./../Configs');

router.get('/SeHuman', async (req, res) => {
    const data = await knex.select()
        .table('HumanResource')
    res.send(data)
})

router.get('/SeHumanNotInBH', async (req, res) => {
    const data = await knex('HumanResource')
        .whereNotExists(knex.select('*')
            .from('BusinessHireEmployee')
            .whereRaw('HumanResource.HumanResourceID = BusinessHireEmployee.HumanResourceID'))
        .select()
    res.send(data)
})

router.post('/SeHumanBusinessHireEmp', async (req, res) => {
    const data = await knex('BusinessHireEmployee')
        .innerJoin('HumanResource', 'BusinessHireEmployee.HumanResourceID', 'HumanResource.HumanResourceID')
        .where('BusinessHireEmployee.BusinessID', req.body.BusinessID)
        .select('HumanResource.*')
    res.send(data)
})

router.post('/InHuman', async (req, res) => {
    try {
        await knex.table('HumanResource')
            .insert({
                Job: req.body.Job,
                JobType: req.body.JobType,
                Status: req.body.Status,
                BaseSalaryPerMonth: req.body.BaseSalaryPerMonth,
                BasePayPerHour: req.body.BasePayPerHour,
                BaseSalaryGrowUpRate: req.body.BaseSalaryGrowUpRate,
                AdditionPayPerExp: req.body.AdditionPayPerExp
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/InBuHuman', async (req, res) => {
    try {
        await knex.table('BusinessHireEmployee')
            .insert({
                BusinessID: req.body.BusinessID,
                HumanResourceID: req.body.HumanResourceID,
            })
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelHuman', async (req, res) => {
    try {
        await knex('HumanResource')
            .whereNotExists(knex.select('*')
                .from('BusinessHireEmployee')
                .whereRaw('HumanResource.HumanResourceID = BusinessHireEmployee.HumanResourceID'))
            .andWhere('HumanResource.HumanResourceID', req.body.HumanResourceID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})

router.post('/DelHumanID', async (req, res) => {
    try {
        const data = await knex('HumanResource')
            .where('HumanResourceID', req.body.HumanResourceID)
            .del()
        res.send(true)
    } catch (e) {
        res.send(false)
    }
})
router.post('/', async (req, res) => {
    const data = await knex('BusinessHireEmployee')
        .innerJoin(
            'HumanResource',
            'BusinessHireEmployee.HumanResourceID',
            'HumanResource.HumanResourceID'
        )
        .where({
            BusinessID: req.body.BusinessID,
            JobType: req.body.JobType
        })
        .select()
    res.send(data)
})


module.exports = router