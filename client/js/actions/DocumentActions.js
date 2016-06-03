var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/DocumentConstants.js');

var PlanActions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.DOCUMENT_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.DOCUMENT_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.DOCUMENT_DESTROY,
			doc: doc
		});
	},
};

module.exports = PlanActions;
