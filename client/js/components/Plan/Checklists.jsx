var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Griddle = require('griddle-react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var Select = require('../Form/Index.jsx').Select;
var TextArea = require('../Form/Index.jsx').TextArea;
var Button = require('../Button/Index.jsx');
var PlanActions = require('../../actions/PlanActions.js');
var ChecklistStore = require('../../stores/ChecklistStore');
var ChecklistActions = require('../../actions/ChecklistActions');
var PlanStore = require('../../stores/PlanStore.js');
var TaskTypeService = require('../../services/TaskTypeService');
var ChecklistActions = require('../../actions/ChecklistActions');

function getPlanProfileState(id, callback) {
  PlanStore.getOne(id, function(plan) {
    if (plan.planStartDate) {
      plan.planStartDate = moment(plan.planStartDate).format("MM/DD/YYYY");
    }
    callback(plan);
  });
}

var columnMeta = [
  {
    "columnName": "taskId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "checklistId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Checklist",
    "order": 1,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Created On",
    "order": 2,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Completed On",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Component = React.createClass({
  getInitialState: function () {
    return {
      checklists: [],
    }
  },

  componentWillMount: function() {
    ChecklistStore.get(function (checklists) {
      var state = this.state;
      state.checklists = checklists;
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function() {
    PlanStore.addChangeListener(this.handleChange_PlanStore);
  },

  componentWillUnmount: function() {
    PlanStore.removeChangeListener(this.handleChange_PlanStore);
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div style={Style.heading} className="row">
          <span className="text-uppercase">Plan Checklists</span>
        </div>
        <div className="row">
          <Button.Primary
            label={"New"}
            onClick={this.handleClick_New} />
        </div>
        <div className="row">
    			<div style={{marginBottom:"15px"}} />
    			<Griddle
    				results={this.getGriddleData()}
    				columnMetadata={columnMeta}
    				columns={["Checklist","Created On","Completed On"]}
    				resultsPerPage={20}
    				onRowClick={this.handleClick_Row} />
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
		this.state.checklists.map(function (checklist) {
      result.push({
        "checklistId": checklist._id,
        "Checklist": checklist.name,
        "Created On": moment(checklist.createdOn).format("MM/DD/YYYY h:mm a"),
        "Completed On": moment(checklist.createdOn).format("MM/DD/YYYY h:mm a"),
      });
		}.bind(this));
    return result;
  },

  handleClick_Row: function (gridRow, event) {
		browserHistory.push("/checklist/" + gridRow.props.data.checklistId);
  },

  handleClick_New: function () {
		var checklist = {};
		//checklist.name = "";
		//checklist.type = "";
    checklist.planId = this.props.params.id;
		ChecklistActions.create(checklist, function (checklist) {
  		browserHistory.push("/checklist/" + checklist._id);
    });
  },

  handleChange_PlanStore: function () {
    this.componentWillMount();
  }
});

module.exports = Component;
