var React = require('react');
var Style = require('./Style.jsx');
var PlanOptions = require('./PlanOptions.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <Label label={"Name"} isRequired={true} />
        <Input
          type={"text"}
          attribute={"name"}
          value={this.props.doc.name}
          onChange={this.handleChange_Attribute} />
        <Label label={"Path"} isRequired={true} />
        <Input
          type={"text"}
          attribute={"path"}
          isDisabled={true}
          value={this.props.doc.path}
          onChange={this.handleChange_Attribute} />
        <Label label={"Plan"} isRequired={true} />
        <PlanOptions
          attribute={"planId"}
          value={this.props.doc.planId}
          onChange={this.handleChange_Attribute} />
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var doc = this.props.doc;
    doc[attribute] = value;
    this.props.onChange(doc);
  },
});

module.exports = Component;
