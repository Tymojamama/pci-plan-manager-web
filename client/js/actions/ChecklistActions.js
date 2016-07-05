var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChecklistConstants.js');

var PlanActions = {
	update: function(doc, callback) {
		AppDispatcher.dispatch({
			actionType: Constants.CHECKLIST_UPDATE,
			doc: doc,
			callback: callback,
		});
	},
	create: function(doc, callback) {
		AppDispatcher.dispatch({
			actionType: Constants.CHECKLIST_CREATE,
			doc: doc,
			callback: callback,
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CHECKLIST_DESTROY,
			doc: doc,
		});
	},
};

module.exports = PlanActions;
