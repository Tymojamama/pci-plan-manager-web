var express = require('express');
var router = express.Router();

var Store = require('./template.js');

router.use('/action', new Store('action'));
router.use('/plan', new Store('plan'));
router.use('/user', new Store('user'));
router.use('/task', new Store('task'));
router.use('/task-category', new Store('task-category'));
router.use('/task-type', new Store('task-type'));
router.use('/document', new Store('document'));

module.exports = router;
