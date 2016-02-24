var authentication = require('./authentication');
var registration = require('./registration');
var execution = require('./execution');

module.exports.login = function (options, callback) {
	var authenticator = new authentication();
	authenticator.login(options, callback);
}

module.exports.register = function (options, callback) {
	var registrar = new registration();
	registrar.register(options, callback);
}

module.exports.execute = function(options, callback) {
	var executor = new execution();
    executor.request(options, callback);
}