var path = require('path');
var PlanManagerService = require('../services/PlanManager');

module.exports = function (app) {

	app.post('/login', function (req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if (email && password) {
			var options = {};
			options.email = email;
			options.password = password;

			PlanManagerService.login(options, function (chunks) {
				console.log('login callback');
				var json = JSON.parse(chunks);
				if (json.success === false) {
					console.log("no success");
					return res.redirect('/login?success=false');
				}

				req.session.email = email;
				res.cookie("accessToken", json.accessToken);
				console.log("success");
				return res.redirect('/');
			});
		} else {
			console.log("no email, password");
			res.redirect('/');
		}
	});

}
