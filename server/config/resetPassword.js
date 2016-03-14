var path = require('path');
var PlanManagerService = require('../services/PlanManager');

module.exports = function (app) {

	app.post('/forgot', function (req, res) {
		var email = req.headers['email'];

		if (email) {
			var options = {
				email: email,
			}

			PlanManagerService.requestPasswordReset(options, function (chunks) {
				var json = JSON.parse(chunks);
				if (json.success === true) {
					return res.json({
						success: true,
						message: json.message,
					});
				} else {
					return res.json({
						success: false,
						message: json.message,
					});
				}
			});
		} else {
			return res.json({
				success: false,
				message: "An email address was not supplied.",
			});
		}
	});

	app.post('/forgot/:id', function (req, res) {
		var token = req.headers['token'];
		var password = req.headers['password'];
		var id = req.params.id;

		if (token && password) {
			var options = {
				token: token,
				password: password,
				id: id,
			}

			PlanManagerService.resetPassword(options, function (chunks) {
				var json = JSON.parse(chunks);
				if (json.success === true) {
					return res.json({
						success: true,
						message: "Password was successfully changed.",
					});
				} else {
					return res.json({
						success: false,
						message: "Password was not changed. Submitted data was invalid or password request has expired.",
					});
				}
			});
		} else {
			return res.json({
				success: false,
				message: "Password was not changed. Submitted data was invalid.",
			});
		}
	});

}
