var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/PlanConstants.js');

var Store = new StoreTemplate(PlanManagerService.plans);

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.PLAN_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.PLAN_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.PLAN_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
