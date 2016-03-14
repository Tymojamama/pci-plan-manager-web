var $ = require('jquery');
var Slave = require('./Slave');

var Service = {
	actions: new Slave("action"),
	plans: new Slave("plan"),
	tasks: new Slave("task"),
	taskCategories: new Slave("task-category"),
	taskTypes: new Slave("task-type"),
	users: new Slave("user"),
}

module.exports = Service;

module.exports.requestPasswordReset = function(options, callback) {
	 $.ajax({
		url: '/forgot',
		type: 'POST',
		contentType: "application/json",
        beforeSend: function (xhr) {
			xhr.setRequestHeader('email', options.email);
		},
		success: function(data){
			callback(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("XHR Status:", xhr.status);
			console.log("Thrown Error:", thrownError);
		}
	});
}

module.exports.resetPassword = function(options, callback) {
	 $.ajax({
		url: '/forgot/' + options.id,
		type: 'POST',
		contentType: "application/json",
        beforeSend: function (xhr) {
			xhr.setRequestHeader('token', options.token);
			xhr.setRequestHeader('password', options.password);
		},
		success: function(data){
			callback(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("XHR Status:", xhr.status);
			console.log("Thrown Error:", thrownError);
		}
	});
}
