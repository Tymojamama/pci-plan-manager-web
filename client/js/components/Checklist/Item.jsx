var React = require('react');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var Form = require('../Form/Index.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <Form.Label label={"Label"} />
        <Form.Input
          type={"text"}
          attribute={"label"}
          value={this.props.item.label}
          onChange={this.handleChange_Attribute} />
        <Form.Label label={"Response"} />
        <Form.Input
          type={"text"}
          attribute={"response"}
          value={this.props.item.response}
          onChange={this.handleChange_Attribute} />
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var item = this.props.item;
    item[attribute] = value;
    this.props.onChange(item);
  },
});

module.exports = Component;
