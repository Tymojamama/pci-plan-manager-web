var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Select = require('../Form/Index.jsx').Select;
var TaskStore = require('../../stores/TaskStore.js');

var TaskOptions = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    }
  },

  componentWillMount: function() {
    TaskStore.get(function(tasks) {
      this.setState({
        tasks: tasks,
      });
    }.bind(this));
  },

  render: function() {
    return (
      <Select
        value={this.props.value}
        options={this.getSelectOptions()}
        onChange={this.handleChange} />
    )
  },

  getSelectOptions: function () {
    var result = [];
    this.state.tasks.sort(function (a,b) {
      var key1 = moment(a.dateDue).toDate();
      var key2 = moment(b.dateDue).toDate();
      if (key1 < key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    }).map(function (task) {
      result.push({
        label: moment(task.dateDue).format("MM/DD/YYYY") + " - " + task.name,
        value: task._id,
      });
    });
    return result;
  },

  handleChange: function (value) {
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = TaskOptions;
