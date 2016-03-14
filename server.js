var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('1VEmMbDiQ9GDz6dcv62GqzLeQ3wdZJSWOxpkmIBDzjto4lrsKvK4hIkW1sKNtHgPqYLTNBCLH8v47MStrHvAfyf1UdnfTda1LMZl'));

app.use(function (req, res, next) {
    console.log(req.method + req.path);
	next();
});

app.use('/favicon.ico', require('./server/routers/web/favicon'));
app.use('/css', require('./server/routers/web/css'));
app.use('/img', require('./server/routers/web/img'));

require('./server/config/session') (app);
require('./server/config/login') (app);
require('./server/config/logout') (app);
require('./server/config/authentication') (app);
require('./server/config/resetPassword') (app);
require('./server/config/registration') (app);

app.use('/stores', require('./server/routers/stores'));
app.use('/', require('./server/routers/web'));

app.listen(80);
console.log('Magic happens on port 80');
