var React = require('react');
var moment = require('moment');
var TaskStore = require('../../stores/TaskStore.js');
var TaskTypeStore = require('../../stores/TaskTypeStore.js');

function formatDate(date) {
	if (!date) {
		return '';
	}

	return moment(date).format("MMMM Do, YYYY");
}

function getTaskType(_id, callback) {
	TaskTypeStore.getOne(_id, function (taskType) {
		callback(taskType);

		switch(taskType.taskCategoryId){
			case "56bcb5351f3d76082bb8ef7f":
				callback("an investment");
				break;
			case "56bcb5511f3d76082bb8ef80":
				callback("a vendor");
				break;
			case "56bcb3a5777f0d4c1cb43982":
				callback("an administration");
				break;
			default:
				callback();
				break;
		}
	});
}

function getDetails(task, callback) {
	var detail = "";
	var taskTypeCategoryWithArticle = "";

	if (!task.taskTypeId) {

		if (task.dateDue) {
			detail += "This task is due on " + formatDate(task.dateDue) + ". ";
		}

		if (task.description) {
			detail += task.description + " ";
		}

		if (detail == "") {
			detail = "There is not a lot of information about this task. You should fill out more fields--like the date due."
		}

		return callback(detail);
	}

	TaskTypeStore.getOne(task.taskTypeId, function (taskType) {

		switch(taskType.taskCategoryId){
			case "56bcb5351f3d76082bb8ef7f":
				taskTypeCategoryWithArticle = "an investment";
				break;
			case "56bcb5511f3d76082bb8ef80":
				taskTypeCategoryWithArticle = "a vendor";
				break;
			case "56bcb3a5777f0d4c1cb43982":
				taskTypeCategoryWithArticle = "an administration";
				break;
			default:
				taskTypeCategoryWithArticle = "";
				break;
		}

		if (taskTypeCategoryWithArticle && taskTypeCategoryWithArticle != "") {
			detail += "This is " + taskTypeCategoryWithArticle + " task";
		}

		if (task.dateDue && detail.length > 0) {
			detail += " that is due on " + formatDate(task.dateDue) + ". ";
		} else if (task.dateDue) {
			detail += "This task is due on " + formatDate(task.dateDue) + ". ";
		} else if (detail != "") {
			detail += ". ";
		}

		if (task.description) {
			detail += task.description + " ";
		}

		if (taskType.purpose) {
			detail += taskType.purpose + " ";
		}

		if (taskType.process) {
			detail += taskType.process + " ";
		}

		if (taskType.outcomes) {
			detail += taskType.outcomes + " ";
		}

		if (detail == "") {
			detail = "There is not a lot of information about this task. You should fill out more fields--like the date due."
		}

		return callback(detail);
	});
}

var FeedItemTask = React.createClass({
	getInitialState: function () {
		return {
			detail: 'Loading details...'
		}
	},

	componentWillMount: function () {
		getDetails(this.props.task, function (detail) {
			this.setState({detail:detail});
		}.bind(this));
	},

    componentDidMount: function() {
        TaskStore.addChangeListener(this.handleStoreChangeTask);
    },

    componentWillUnmount: function() {
        TaskStore.removeChangeListener(this.handleStoreChangeTask);
    },

    render: function(){
        return (
            <div>
            	{this.state.detail}
            </div>
        )
    },

	handleStoreChangeTask: function () {
		getDetails(this.props.task, function (detail) {
			this.setState({detail:detail});
		}.bind(this));
	}
});

module.exports = FeedItemTask;
