const knex = require('./../Configs');
const express = require('express');
const router = express.Router();
const Business = require('./Business');
const LocationDB = require('./Location');
const Size = require('./Size');
const Ownership = require('./Ownership');
const BusinessLocationSizeOwnerRelated = require('./BusinessLocationSizeOwnerRelated');
const TargetGroup = require('./TargetGroup');
const Decoration = require('./Decoration');
const Product = require('./Product');
const HumanResource = require('./HumanResource');
const Marketing = require('./Marketing');
const Competitor = require('./Competitor');
const UserStore = require('./UserStore');
const Classroom = require('./Classroom');
const User = require('./User');

router.use('/Business', Business);
router.use('/Location', LocationDB);
router.use('/Size', Size);
router.use('/Ownership', Ownership);
router.use('/BusinessLocationSizeOwnerShipRelated', BusinessLocationSizeOwnerRelated);
router.use('/TargetGroup', TargetGroup);
router.use('/Decoration', Decoration);
router.use('/Product', Product);
router.use('/HumanResource', HumanResource);
router.use('/Marketing', Marketing);
router.use('/Competitor',Competitor);
router.use('/UserStore',UserStore);
router.use('/Classroom',Classroom);
router.use('/User',User);

module.exports = router

