var React = require('react');
var Style = require('./Style.jsx');
var PlanStore = require('../../stores/PlanStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      plan: ''
    }
  },

  componentWillMount: function () {
    PlanStore.getOne(this.props.id, function (plan) {
      this.setState({
        plan: plan
      });
    }.bind(this));
  },

  render: function () {
    return (
      <span>{this.state.plan.name}</span>
    )
  }
});

module.exports = Component;
