var React = require('react');
var S = require('string');
var Item = require('./Item.jsx');
var Form = require('../Form/Index.jsx');
var TaskStore = require('../../stores/TaskStore');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Feed = React.createClass({
  getInitialState: function() {
    return {
      filter: "In Progress",
      tasks: [],
      search: "",
    }
  },

  componentWillMount: function() {
    TaskStore.get(function(json) {
      this.setState({
        tasks: json,
        filter: this.state.filter,
        search: this.state.search,
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
        <Form.Input
          type={"text"}
          placeholder={"🔎 Search feed"}
          value={this.state.search}
          onChange={this.handleChange_Search} />
        <div style={{marginTop:"5px"}} />
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

    return this.state.tasks.filter(filter).map(function(task, i) {
      if (i > 25) { return; }
      return (
        <Item
          key={task._id}
          object={task}
          type={FeedItemConstants.TASK}
          linkPath={"?action=open-task&id=" + task._id} />
      );
    });
  },

  handleChange_Search: function (value) {
    var state = this.state;
    state.search = value;
    this.setState(state);
    TaskStore.get(function(tasks) {
      state = this.state;
      var result = [];
      tasks.map(function (task) {
        var name = "";
        if (task.name) { name = task.name; }
        var match = S(name.toLowerCase()).contains(value.toLowerCase());
        if (match) {
          result.push(task);
        }
      });
      state.tasks = result;
      state.search = value;
      this.setState(state);
    }.bind(this));
  },

  handleChange_Filter: function (value) {
    this.setState({
      tasks: this.state.tasks,
      filter: value,
      search: this.state.search,
    });
  },

  handleTaskStoreChange: function() {
    getTasks(function(json) {
      this.setState({
        tasks: json,
        filter: this.state.filter,
        search: this.state.search,
      });
    }.bind(this));
  }
});

module.exports = Feed;
