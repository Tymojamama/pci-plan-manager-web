var React = require('react');
var Style = require('./Style.jsx');
var TaskCategoryOptions = require('./TaskCategoryOptions.jsx');

var Details = React.createClass({
  componentWillMount: function () {
    this.taskType = this.props.taskType;
  },

  render: function () {
    return (
      <div className="row">
        <div className="row-fluid">
          <span style={Style.label} className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
          <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
          <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <input style={Style.input} type="text" value={this.props.taskType.name} onChange={this.handleChangeName}/>
          </span>
        </div>
        <div className="row-fluid padding-top-15">
          <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Task Category</span>
          <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Task Category</span>
          <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <TaskCategoryOptions value={this.props.taskType.taskCategoryId} handleChange={this.handleChangeTaskCategoryId}/>
          </span>
        </div>
        <div className="row-fluid padding-top-15">
          <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Purpose</span>
          <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Purpose</span>
          <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <textarea style={Style.textArea} value={this.props.taskType.purpose} onChange={this.handleChangePurpose}/>
          </span>
        </div>
        <div className="row-fluid padding-top-15">
          <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Process</span>
          <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Process</span>
          <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <textarea style={Style.textArea} value={this.props.taskType.process} onChange={this.handleChangeProcess}/>
          </span>
        </div>
        <div className="row-fluid padding-top-15">
          <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Outcomes</span>
          <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Outcomes</span>
          <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <textarea style={Style.textArea} value={this.props.taskType.outcomes} onChange={this.handleChangeOutcomes}/>
          </span>
        </div>
      </div>
    )
  },

  handleChangeName: function(event) {
    this.taskType.name = event.target.value;
    this.props.onChange(this.taskType);
  },

  handleChangePurpose: function(event) {
    this.taskType.purpose = event.target.value;
    this.props.onChange(this.taskType);
  },

  handleChangeProcess: function(event) {
    this.taskType.process = event.target.value;
    this.props.onChange(this.taskType);
  },

  handleChangeOutcomes: function(event) {
    this.taskType.outcomes = event.target.value;
    this.props.onChange(this.taskType);
  },

  handleChangeTaskCategoryId: function(event) {
    this.taskType.taskCategoryId = event.target.value;
    this.props.onChange(this.taskType);
  },
});

module.exports = Details;
