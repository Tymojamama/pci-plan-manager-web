var path = require('path');
var PlanManagerService = require('../services/PlanManager');

module.exports = function (app) {

	app.post('/register', function (req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if (email && password) {
			var options = {
				email: email,
				password: password,
			}

			PlanManagerService.register(options, function (chunks) {
				var json = JSON.parse(chunks);
				if (json.success === false) {
					return res.redirect('/register?success=false&message=' + json.message);
				}

				req.session.email = email;
				res.cookie("accessToken", json.accessToken);

				if (req.session.requestedUrl) {
					res.redirect(req.session.requestedUrl);
				} else {
					res.redirect('/');
				}
			});
		} else {
			res.redirect('/register?success=false');
		}
	});

}