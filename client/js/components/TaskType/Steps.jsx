var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Step = require('./Step.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Steps = React.createClass({
  componentWillMount: function() {
    this.steps = this.props.steps;
    this.id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    if (!this.steps) {
      this.steps = [];
    }
  },

  render: function() {
    var steps = (
      <div style={{
        padding: "10px 5px",
        margin: "10px 0",
        backgroundColor: "#f1f4f6",
        borderLeft: "3px solid #666666"
      }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div>{"No steps have been added to this action item"}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.props.steps && this.props.steps.length > 0) {
      steps = this.props.steps.map(function(step, i) {
        step.index = i;
        return (
          <Step
            key={i}
            step={step}
            handleChange={this.handleChange_Step}
            handleRemove={this.handleClick_Remove}/>
        )
      }.bind(this));
    }

    return (
      <div className="container-fluid" style={{
        margin: "0",
        padding: "0"
      }}>
        <div
          className="row"
          style={{
            margin: "0",
            padding: "0"
          }}>
          <div className="row-fluid">
            <span
              style={{
                margin: "5px 0",
                fontSize: "22px",
                cursor: "pointer"
              }}
              className="col-lg-8 col-md-8 col-sm-6 col-xs-6"
              onClick={this.handleClick_Heading}>
              <b>{"Steps"}</b>
            </span>
            <span style={{
              margin: "5px 0"
            }} className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <span style={{
                float: "right",
                cursor: "pointer"
              }}>
                <ButtonPrimary label={"Add"} onClick={this.handleClick_Add}/>
              </span>
            </span>
          </div>
          <div id={this.getId()} style={{display:"none"}} className="row-fluid">
            {steps}
          </div>
        </div>
      </div>
    )
  },

  getId: function () {
    return "steps-" + this.id;
  },

  handleClick_Heading: function () {
    $("#" + this.getId()).slideToggle();
  },

  handleChange_Step: function(step) {
    this.steps[step.index] = step;
    this.props.handleChange(this.steps);
  },

  handleClick_Remove: function(step) {
    this.steps.splice(step.index, 1);
    this.props.handleChange(this.steps);
  },

  handleClick_Add: function() {
    var index = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    this.steps.push({index: index});
    return this.props.handleChange(this.steps);
  }
});

module.exports = Steps;
