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
