var express = require('express');
var router = express.Router();

router('/', require('./web'));
router('/', require('./stores'));

module.exports = router;