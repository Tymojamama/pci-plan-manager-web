var moment = require('moment');
var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/MeetingConstants.js');

var Store = new StoreTemplate(PlanManagerService.meetings);

function setDatesToUtc (meeting) {
  if (meeting.startTime) {
    meeting.startTime = moment(meeting.startTime).utc();
  }
  if (meeting.endTime) {
    meeting.endTime = moment(meeting.endTime).utc();
  }
}

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case Constants.MEETING_UPDATE:
      setDatesToUtc(action.doc);
      Store.update(action.doc, function(data) {
        Store.emitChange();
        action.callback(data);
      });
      break;
    case Constants.MEETING_CREATE:
      setDatesToUtc(action.doc);
      Store.insert(action.doc, function(data) {
        Store.emitChange();
        action.callback(data);
      });
      break;
    case Constants.MEETING_DESTROY:
      Store.delete(action.doc, function(data) {
        Store.emitChange();
        action.callback(data);
      });
      break;
  }
});

module.exports = Store;
