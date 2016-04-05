var path = require('path');

module.exports = function (app) {
	app.use(function (req, res, next) {
		/*if (!req.session.accessToken) {
			req.session.requestedUrl = req.url;
			return res.redirect('/login'); 
		}*/
		next();
	});
}