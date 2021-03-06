var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '/../../../client/';

router.use('/js', require('./js'));
router.use('/css', require('./css'));
router.use('/img', require('./img'));
router.use('/docs', require('./docs'));
router.use('/favicon.ico', require('./favicon'));

router.use('/', function (req, res, next) {
	var filePath = path.join(__dirname, _root, '/views/index.html');
	res.sendFile(filePath);
});

module.exports = router;
