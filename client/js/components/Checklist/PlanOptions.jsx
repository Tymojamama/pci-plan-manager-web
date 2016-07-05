var React = require('react');
var Style = require('./Style.jsx');
var Select = require('../Form/Index.jsx').Select;
var PlanStore = require('../../stores/PlanStore.js');

var PlanOptions = React.createClass({
  getInitialState: function() {
    return {
      plans: []
    }
  },

  componentWillMount: function() {
    PlanStore.get(function(plans) {
      this.setState({
        plans: plans,
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
    this.state.plans.map(function (plan) {
      result.push({
        label: plan.name,
        value: plan._id,
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

module.exports = PlanOptions;
