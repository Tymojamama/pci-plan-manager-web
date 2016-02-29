var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;

var TaskCategoryStore = require('../../stores/TaskCategoryStore.js');
var TaskTypeStore = require('../../stores/TaskTypeStore.js');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Style = require('./Style.jsx');

var Actions = require('./Actions.jsx');
var Task = require('./Task.jsx');
var TaskActions = require('./TaskActions.jsx');
var Meeting = require('./Meeting.jsx');
var MeetingActions = require('./MeetingActions.jsx');
var Document = require('./Document.jsx');
var DocumentActions = require('./DocumentActions.jsx');

var TaskDetails = require('../Task/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');

function getComponentId(object, type) {
    return "feed-item-" + type + "-" + object._id;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getState(obj, type, callback) {

    if (type === FeedItemConstants.TASK) {

        if (!obj.taskTypeId) {
            return callback({});
        }

        TaskTypeStore.getOne(obj.taskTypeId, function (taskType) {
            TaskCategoryStore.getOne(taskType.taskCategoryId, function (taskCategory) {
                return callback({ iconSrc: taskCategory.icon });
            });
        });

    }

}

var FeedItem = React.createClass({
    getInitialState: function () {
        return {
            iconSrc: ''
        }
    },

    componentWillMount: function () {
        getState(this.props.object, this.props.type, function (state) {
            this.setState(state);
        }.bind(this));
    },

    componentWillReceiveProps: function () {
        getState(this.props.object, this.props.type, function (state) {
            this.setState(state);
        }.bind(this));
    },

    render: function(){
        return (
            <span>
                <div style={Style.container}>
                    <div style={Style.headingContainer}>
                        <span style={Style.iconContainer}>{this.getIcon()}</span>
                        <div style={Style.labelContainer}>
                            <div style={{padding:"0",margin:"0",color:"#0e2e47",verticalAlign:"top"}} className="btn btn-link" onClick={this.handleLabelClick}>
                                <b>{this.getHeading()}</b>
                            </div>
                            <div style={{padding:"0",margin:"0",verticalAlign:"top"}}>
                                {this.getSubHeading()}
                            </div>
                        </div>
                        <span style={Style.downContainer} className="btn btn-link" onClick={this.handleClickDown}>{"▼"}</span>
                    </div>
                    <div id={getComponentId(this.props.object, this.props.type)} style={{display:"none"}}>
                        <div style={Style.bodyContainer}>
                            <div>
                                {this.getFeedItemBody()}
                            </div>
                        </div>
                        <div style={Style.actionContainer}>
                            {this.getFeedItemActions()}
                        </div>
                    </div>
                </div>
                {this.loadModalWindow()}
            </span>
        )
    },

    getIcon: function () {
        if (this.state.iconSrc && this.state.iconSrc != '') {
            return (
                <span>{this.state.iconSrc}</span>
            );
        }
    },

    getHeading: function () {
        if (this.props.heading) {
            return this.props.heading;
        }

        var heading;

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                heading = this.props.object.name;
                break;

            case FeedItemConstants.MEETING:
                break;

            case FeedItemConstants.DOCUMENT:
                break;
        }

        return heading;
    },

    getSubHeading: function () {
        if (this.props.heading) {
            return this.props.heading;
        }

        var heading;

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                if (this.props.object.dateDue) {
                    heading = moment(this.props.object.dateDue).format("MMM D, YYYY");
                } else {
                    heading = "No due date.";
                }
                break;

            case FeedItemConstants.MEETING:
                break;

            case FeedItemConstants.DOCUMENT:
                break;
        }

        return heading;
    },

    getFeedItemBody: function () {
        if (this.props.body) {
            return (this.props.body);
        }

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                return <Task task={this.props.object} />
                break;

            case FeedItemConstants.MEETING:
                return <Meeting meeting={this.props.object} />
                break;

            case FeedItemConstants.DOCUMENT:
                return <Document document={this.props.object} />
                break;
        }
    },

    getFeedItemActions: function () {
        if (this.props.actions && this.props.actions.length > 0) {
            var actionItems = [];

            for (var i = 0; i < this.props.actions.length; i++) {
                switch(this.props.actions[i].type) {
                    case "open":
                        var OpenAction = Actions.Open;
                        actionItems.push(<OpenAction handleClick={this.props.actions[i].handleClick} />);
                        break;
                    case "delete":
                        var DeleteAction = Actions.Delete;
                        actionItems.push(<DeleteAction handleClick={this.props.actions[i].handleClick} />);
                        break;
                }
            }

            return (
                <div>
                    {actionItems}
                </div>
            )
        }

        switch(this.props.type)
        {
            case FeedItemConstants.TASK:
                return <TaskActions task={this.props.object} />
                break;

            case FeedItemConstants.MEETING:
                return <MeetingActions meeting={this.props.object} />
                break;

            case FeedItemConstants.DOCUMENT:
                return <DocumentActions document={this.props.object} />
                break;
        }
    },

    handleClickDown: function () {
        $("#" + getComponentId(this.props.object, this.props.type)).slideToggle("fast");
    },

    handleLabelClick: function () {
        browserHistory.push(this.props.linkPath);
    },

    loadModalWindow: function () {
        if (!this.props.object) {
            return;
        } else if (!this.props.object._id) {
            return;
        }

        if (getParameterByName('action') == 'open-task' && getParameterByName('id') == this.props.object._id) {
            var id = getParameterByName('id');
            var content = <TaskDetails id={id} />
            return (
                <ModalWindow content={content} parentPath={this.props.linkPath.split("?")[0]} />
            )
        }
    },
});

module.exports = FeedItem;
