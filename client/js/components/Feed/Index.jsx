var React = require('react');
var Item = require('./Item.jsx');
var Form = require('../Form/Index.jsx');
var TaskStore = require('../../stores/TaskStore');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

function getTasks(callback) {
  TaskStore.get(function(json) {
    callback(json);
  });
}

var Feed = React.createClass({
  getInitialState: function() {
    return {
      filter: "In Progress",
      tasks: [],
    }
  },

  componentWillMount: function() {
    getTasks(function(json) {
      this.setState({
        tasks: json,
        filter: this.state.filter,
      });
    }.bind(this));
  },

  componentDidMount: function() {
    TaskStore.addChangeListener(this.handleTaskStoreChange);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this.handleTaskStoreChange);
  },

  render: function() {
    return (
      <div>
        <Form.Select
          style={{margin:"0px 0px 25px 0px"}}
          options={["All","In Progress","Completed"]}
          value={this.state.filter}
          onChange={this.handleChange_Filter} />
        <div style={{marginTop:"5px"}} />
        {this.loadTasks()}
      </div>
    )
  },

  loadTasks: function() {
    if (!this.state.tasks || this.state.tasks.length === 0) {
      return (
        <div></div>
      )
    }

    var filter = function (task) { return true; }
    if (this.state.filter !== "All") {
      filter = function (task) {
        return task.status === this.state.filter;
      }.bind(this);
    }

    return this.state.tasks.filter(filter).map(function(task) {
      return (<Item key={task._id} object={task} type={FeedItemConstants.TASK} linkPath={"?action=open-task&id=" + task._id}/>);
    });
  },

  handleChange_Filter: function (value) {
    this.setState({
      tasks: this.state.tasks,
      filter: value,
    });
  },

  handleTaskStoreChange: function() {
    getTasks(function(json) {
      this.setState({
        tasks: json,
        filter: this.state.filter,
      });
    }.bind(this));
  }
});

module.exports = Feed;
