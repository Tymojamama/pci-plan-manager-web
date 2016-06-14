var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PlanConstants = require('../constants/PlanConstants.js');

var PlanActions = {
	savePlan: function (doc) {
		AppDispatcher.dispatch({
			actionType: PlanConstants.PLAN_UPDATE,
			doc: doc,
		});
	},
	create: function (doc) {
		AppDispatcher.dispatch({
			actionType: PlanConstants.PLAN_CREATE,
			doc: doc,
		});
	},
	destroy: function (doc) {
		AppDispatcher.dispatch({
			actionType: PlanConstants.PLAN_DESTROY,
			doc: doc,
		});
	},
};

module.exports = PlanActions;
