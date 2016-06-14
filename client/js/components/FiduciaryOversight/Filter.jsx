var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Task = require('../Task/Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var FeedItem = require('../Feed/Item.jsx');
var TaskTypeStore = require('../../stores/TaskTypeStore');
var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Investments = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    }
  },

  componentWillMount: function () {
    this.filterTasks(this.props.id);
  },

  componentDidMount: function() {
    window.scrollTo(0,0);
    TaskStore.addChangeListener(this.handleChange_TaskStore);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this.handleChange_TaskStore);
  },

  componentWillReceiveProps: function (props) {
    window.scrollTo(0,0);
    this.filterTasks(props.id);
  },

  render: function() {
    var createTaskLinkOptions = {
      pathname: '/fiduciary/investments',
      query: {
        action: 'create-task'
      }
    };
    return (
      <div>
        {this.loadModalWindow(<Task/>)}
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{
            padding: "0",
            margin: "0"
          }}>
          <Link to={createTaskLinkOptions} replace={true}>
            <div style={Style.newTaskButton} onClick={this.createTaskOnClick}>
              + Create Task
            </div>
          </Link>
          {this.getCategoryTasks()}
        </div>
      </div>
    )
  },

  filterTasks: function (id) {
    TaskTypeStore.get(function (taskTypes) {
      taskTypes = taskTypes.filter(function (taskType) {
        return taskType.taskCategoryId == id;
      }.bind(this));
      TaskStore.get(function(tasks) {
        var result = [];
        taskTypes.map(function (taskType) {
          tasks.map(function (task) {
            if (taskType._id == task.taskTypeId) {
              result.push(task);
            }
          });
        });
        this.setState({
          tasks: result
        });
      }.bind(this));
    }.bind(this));
  },

  getCategoryTasks: function() {
    if (!this.state.tasks || this.state.tasks.length === 0) {
      return;
    }
    return this.state.tasks.map(function(task) {
      return (
        <FeedItem
          key={task._id}
          object={task}
          linkPath={
            "/fiduciary/"
            + this.props.id
            + "/?action=open-task&id="
            + task._id
          }
          type={FeedItemConstants.TASK} />
      );
    }.bind(this));
  },

  loadModalWindow: function(content) {
    if (getParameterByName('action') == 'create-task') {
      console.log("/fiduciary/investments");
      return (<ModalWindow content={content} parentPath="/fiduciary/investments"/>)
    }
  },

  handleChange_TaskStore: function() {
    this.filterTasks(this.props.id);
  }
});

module.exports = Investments;
