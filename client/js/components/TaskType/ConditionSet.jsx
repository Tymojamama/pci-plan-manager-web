var React = require('react');
var Style = require('./Style.jsx');
var Conditions = require('./Conditions.jsx');
var Steps = require('./Steps.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;

var ConditionSet = React.createClass({
  componentWillMount: function () {
    this.conditionSet = this.props.conditionSet;
  },

  render: function () {
    return (
      <div
        key={this.props.key}
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={{
          padding: "10px 5px",
          margin: "10px 0",
          backgroundColor: "#ccc",
          borderLeft: "3px solid #666666"
        }}>
        <div className="container-fluid" style={{
          margin: "0",
          padding: "0"
        }}>
          <div className="row" style={{
            margin: "0",
            padding: "0"
          }}>
            <div className="row-fluid">
              <Conditions
                conditions={this.props.conditionSet.conditions}
                handleChange={this.handleChange_Conditions} />
            </div>
            <div className="row-fluid padding-top-15">
              <Steps
                steps={this.props.conditionSet.steps}
                handleChange={this.handleChange_Steps} />
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{
            margin: "0",
            padding: "0"
          }}>
            <div className="row" style={{
              margin: "0",
              padding: "0"
            }}>
            <div className="row-fluid">
              <div style={{
                padding: "10px 0 0 0"
              }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
                <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div style={{
                    margin: "5px 0",
                    float: "right",
                    cursor: "pointer"
                  }}>
                    <ButtonDanger label={"Remove"} onClick={this.handleClick_Remove}/>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleChange_Conditions: function (conditions) {
    this.conditionSet.conditions = conditions;
    this.props.handleChange(this.conditionSet);
  },

  handleChange_Steps: function (steps) {
    this.conditionSet.steps = steps;
    this.props.handleChange(this.conditionSet);
  },

  handleClick_Remove: function () {
    this.props.handleRemove(this.conditionSet);
  },
});

module.exports = ConditionSet;
