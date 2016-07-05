var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChecklistConstants.js');

var Store = new StoreTemplate(PlanManagerService.checklists);

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case Constants.CHECKLIST_UPDATE:
      Store.update(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
    case Constants.CHECKLIST_CREATE:
      Store.insert(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
    case Constants.CHECKLIST_DESTROY:
      Store.delete(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
  }
});

module.exports = Store;
