var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../../../../client';

router.use('/menu', function (req, res, next) {
	try {
	    res.sendFile(path.join(__dirname + _root + '/images/menu.png'));
	} catch(err) {
    	return next(err);
	}
});

router.use('/task-complete', function (req, res, next) {
	try {
	    res.sendFile(path.join(__dirname + _root + '/images/task-complete.png'));
	} catch(err) {
    	return next(err);
	}
});

router.use('/wait', function (req, res, next) {
	try {
	    res.sendFile(path.join(__dirname + _root + '/images/wait.gif'));
	} catch(err) {
    	return next(err);
	}
});

module.exports = router;
