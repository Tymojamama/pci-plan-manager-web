var React = require('react');
var Style = require('./Style.jsx');
var Items = require('./Items.jsx');
var PlanOptions = require('./PlanOptions.jsx');
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <Form.Label label={"Name"} />
        <Form.Input
          type={"text"}
          attribute={"name"}
          value={this.props.checklist.name}
          onChange={this.handleChange_Attribute} />
        <Form.Label label={"Type"} />
        <Form.Input
          type={"text"}
          attribute={"type"}
          value={this.props.checklist.type}
          onChange={this.handleChange_Attribute} />
        <Form.Label label={"Plan"} />
        <PlanOptions
          attribute={"planId"}
          value={this.props.checklist.planId}
          onChange={this.handleChange_Attribute} />
        <Form.Label label={"Description"} />
        <Form.TextArea
          attribute={"description"}
          value={this.props.checklist.description}
          onChange={this.handleChange_Attribute} />
        <Items
          checklist={this.props.checklist}
          onChange={this.handleChange_Items} />
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var checklist = this.props.checklist;
    checklist[attribute] = value;
    this.props.onChange(checklist);
  },

  handleChange_Items: function (value) {
    var checklist = this.props.checklist;
    checklist["items"] = value;
    this.props.onChange(checklist);
  }
});

module.exports = Component;
