var React = require('react');
var Style = require('./Style.jsx');
var TaskOptions = require('./TaskOptions.jsx');
var PlanOptions = require('./PlanOptions.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;
var TextArea = require('../Form/Index.jsx').TextArea;

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <Label label={"Name"} isRequired={true} />
        <Input
          type={"text"}
          attribute={"name"}
          value={this.props.meeting.name}
          onChange={this.handleChange_Attribute} />
        <Label label={"Start Time"} isRequired={false} />
        <Input
          type={"text"}
          attribute={"startTime"}
          value={this.props.meeting.startTime}
          onChange={this.handleChange_Attribute} />
        <Label label={"End Time"} isRequired={false} />
        <Input
          type={"text"}
          attribute={"endTime"}
          value={this.props.meeting.endTime}
          onChange={this.handleChange_Attribute} />
        <Label label={"Task"} isRequired={false} />
        <TaskOptions
          attribute={"taskId"}
          value={this.props.meeting.taskId}
          onChange={this.handleChange_Attribute} />
        <Label label={"Plan"} isRequired={false} />
        <PlanOptions
          attribute={"planId"}
          value={this.props.meeting.planId}
          onChange={this.handleChange_Attribute} />
        <Label label={"Description"} isRequired={true} />
        <TextArea
          attribute={"description"}
          value={this.props.meeting.description}
          onChange={this.handleChange_Attribute} />
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var meeting = this.props.meeting;
    meeting[attribute] = value;
    this.props.onChange(meeting);
  },
});

module.exports = Component;
