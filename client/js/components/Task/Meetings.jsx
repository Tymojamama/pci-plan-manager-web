var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Griddle = require('griddle-react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var MeetingActions = require('../../actions/MeetingActions');
var TaskStore = require('../../stores/TaskStore');
var MeetingStore = require('../../stores/MeetingStore');

var columnMeta = [
  {
    "columnName": "taskId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "meetingId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Name",
    "order": 1,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Start Time",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Meetings = React.createClass({
	getInitialState: function () {
		return {
			meetings: [],
			task: {},
		}
	},

	componentWillMount: function () {
		TaskStore.getOne(this.props.id, function (task) {
			this.setState({
				meetings: this.state.meetings,
				task: task,
			});
		}.bind(this));
		MeetingStore.get(function (meetings) {
			var result = [];
			meetings.map(function (doc) {
				if (doc.taskId == this.props.id) {
					result.push(doc);
				}
			}.bind(this));
			this.setState({
				meetings: result,
				task: this.state.task,
			});
		}.bind(this));
	},

	componentWillReceiveProps: function (props) {
		this.componentWillMount();
	},

  componentDidMount: function() {
    MeetingStore.addChangeListener(this.handleChange_MeetingStore);
  },

  componentWillUnmount: function() {
    MeetingStore.removeChangeListener(this.handleChange_MeetingStore);
  },

	render: function () {
		return (
			<div>
				<label>
					Add a new meeting
				</label>
				<span style={{float:"right"}}>
					<Button.Primary
						label={"Add"}
						onClick={this.handleClick_Add} />
				</span>
				<div style={{marginBottom:"15px"}} />
				<Griddle
					results={this.getGriddleData()}
					columnMetadata={columnMeta}
					columns={["Name","Start Time"]}
					resultsPerPage={20}
					onRowClick={this.handleClick_Row} />
			</div>
		)
	},

  getGriddleData: function () {
    var result = [];
		this.state.meetings.map(function (doc) {
			var startTime = "";
			if (doc.startTime) {
				startTime = moment(doc.startTime).format("MM/DD/YYYY h:mm a");
			}
      result.push({
        "taskId": this.props.id,
        "meetingId": doc._id,
        "Name": doc.name,
        "Start Time": startTime,
      });
		}.bind(this));
    return result;
  },

  handleClick_Row: function (gridRow, event) {
		browserHistory.push("/meeting/" + gridRow.props.data.meetingId);
  },

	handleClick_Add: function () {
		var meeting = {};
		meeting.taskId = this.state.task._id;
		meeting.planId = this.state.task.planId;
		MeetingActions.create(meeting, function (data) {
			window.location.replace("/meeting/" + data._id);
		});
	},

	handleChange_MeetingStore: function () {
		this.componentWillMount();
	},
});

module.exports = Meetings;
