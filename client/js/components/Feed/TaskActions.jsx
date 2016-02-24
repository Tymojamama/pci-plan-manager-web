var React = require('react');
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');
var TaskCompleteDialog = require('../TaskCompleteDialog/Index.jsx');

var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var FeedItemTaskActions = React.createClass({
    render: function(){
        return (
            <div>
                {this.displayTaskCompleteDialog()}
                <button style={Style.actionItem} className="btn btn-xs btn-link"  onClick={this.handleClickCompleteTask}>
                    <span>✔️ Complete</span>
                </button>
                <button style={Style.actionItem} className="btn btn-xs btn-link" onClick={this.handleClickDeleteTask}>
                    <span style={Style.actionWarning}>❌ Delete</span>
                </button>
            </div>
        )
    },

    displayTaskCompleteDialog: function () {
        if (getParameterByName('action') == 'complete-task' && getParameterByName('id') == this.props.task._id) {
            return (
                <TaskCompleteDialog task={this.props.task} />
            )
        }
    },

    handleClickCompleteTask: function () {
        browserHistory.push(window.location.pathname + "?action=complete-task&id=" + this.props.task._id);
    },

    handleClickDeleteTask: function () {
    	TaskActions.destroy(this.props.task);
    },
});

module.exports = FeedItemTaskActions;
