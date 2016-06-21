var React = require('react');
var S = require('string');
var moment = require('moment');
var Item = require('./Item.jsx');
var Form = require('../Form/Index.jsx');
var TaskStore = require('../../stores/TaskStore');
var TaskTypeStore = require('../../stores/TaskTypeStore');
var TaskCategoryStore = require('../../stores/TaskCategoryStore');
var FeedItemConstants = require('../../constants/FeedItemConstants.js');

var Feed = React.createClass({
  getInitialState: function() {
    return {
      filter: "In Progress",
      taskCategory: "",
      search: "",
      tasks: [],
      taskCategories: [],
    }
  },

  componentWillMount: function() {
    TaskStore.get(function(tasks) {
      var state = this.state;
      state.tasks = tasks;
      this.setState(state);
      TaskCategoryStore.get(function(taskCategories) {
        var state = this.state;
        state.taskCategories = taskCategories;
        this.setState(state);
      }.bind(this));
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
        <Form.Select
          style={{margin:"0px 0px 25px 0px"}}
          options={this.getTaskCategoryOptions()}
          value={this.state.taskCategory}
          onChange={this.handleChange_TaskCategory} />
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

    var tasks = this.state.tasks.filter(filter);
    if (this.props.filter) {
      tasks = tasks.filter(this.props.filter);
    }
    return tasks.filter(filter).map(function(task, i) {
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

  getTaskCategoryOptions: function () {
    var result = [];
    this.state.taskCategories.map(function (taskCategory) {
      result.push({
        label: taskCategory.icon + " - " + taskCategory.name,
        value: taskCategory._id,
      });
    });
    return result;
  },

  handleChange_TaskCategory: function (value, _tasks) {
    var state = this.state;
    state.taskCategory = value;
    this.setState(state);
    TaskTypeStore.get(function (taskTypes) {
      TaskStore.get(function(tasks) {
        if (_tasks) {
          tasks = _tasks;
        }

        var result = [];
        if (!value || value == "") {
          result = tasks;
        } else {
          taskTypes.map(function (taskType) {
            tasks.map(function (task) {
              if (
                task.taskTypeId == taskType._id
                && taskType.taskCategoryId == this.state.taskCategory
              ) {
                result.push(task);
              }
            }.bind(this));
          }.bind(this));
        }

        var state = this.state;
        state.tasks = result;
        this.setState(state);

        if (!_tasks) {
          this.handleChange_Search(this.state.search, result);
        }
      }.bind(this));
    }.bind(this));
  },

  handleChange_Search: function (value, _tasks) {
    var state = this.state;
    state.search = value;
    this.setState(state);
    TaskStore.get(function(tasks) {

      if (_tasks) {
        tasks = _tasks;
      }

      state = this.state;
      var result = [];
      if (!value || value == "") {
        result = tasks;
      } else {
        tasks.map(function (task) {
          var name = "";
          if (task.name) { name = task.name; }
          var match =
            S(name.toLowerCase()).contains(value.toLowerCase())
            || moment(task.dateDue).format("MMMM") == value;
          if (match) {
            result.push(task);
          }
        });
      }
      state.tasks = result;
      state.search = value;
      this.setState(state);

      if (!_tasks) {
        this.handleChange_TaskCategory(this.state.taskCategory, result);
      }
    }.bind(this));
  },

  handleChange_Filter: function (value) {
    var state = this.state;
    state.filter = value;
    this.setState(state);
  },

  handleTaskStoreChange: function() {
    this.componentWillMount();
  }
});

module.exports = Feed;
