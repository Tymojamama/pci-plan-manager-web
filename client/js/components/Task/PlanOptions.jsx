var React = require('react');
var PlanStore = require('../../stores/PlanStore.js');
var Style = require('./Style.jsx');

var SelectOptionWrapper = React.createClass({
  render: function() {
    return (
      <option value={this.props.value}>{this.props.label}</option>
    )
  }
});

function createPlanOptions(plans) {
  if (!plans || plans.length === 0) {
    return;
  }
  return plans.map(function(plan) {
    return (<SelectOptionWrapper key={plan._id} value={plan._id} label={plan.name}/>);
  });
}

function getPlanProfileState(callback) {
  PlanStore.get(function(json) {
    callback({plans: json});
  })
}

var PlanOptions = React.createClass({
  getInitialState: function() {
    return {plans: []}
  },

  componentWillMount: function() {
    getPlanProfileState(function(state) {
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function() {
    PlanStore.addChangeListener(this.handleChange_PlanStore);
  },

  componentWillUnmount: function() {
    PlanStore.removeChangeListener(this.handleChange_PlanStore);
  },

  render: function() {
    return (
      <select style={Style.select} value={this.props.value} onChange={this.props.handleChange}>
        <option value="-1"></option>
        {createPlanOptions(this.state.plans)}
      </select>
    )
  },

  handleChange_PlanStore: function() {
    getPlanProfileState(function(state) {
      this.setState(state);
    }.bind(this));
  }
});

module.exports = PlanOptions;
