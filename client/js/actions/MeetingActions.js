var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/MeetingConstants.js');

var PlanActions = {
	update: function(doc, callback) {
		AppDispatcher.dispatch({
			actionType: Constants.MEETING_UPDATE,
			doc: doc,
			callback: callback,
		});
	},
	create: function(doc, callback) {
		AppDispatcher.dispatch({
			actionType: Constants.MEETING_CREATE,
			doc: doc,
			callback: callback,
		});
	},
	destroy: function(doc, callback) {
		AppDispatcher.dispatch({
			actionType: Constants.MEETING_DESTROY,
			doc: doc,
			callback: callback,
		});
	},
};

module.exports = PlanActions;
