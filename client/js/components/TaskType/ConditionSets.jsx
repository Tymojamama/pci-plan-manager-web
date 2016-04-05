var React = require('react');
var Style = require('./Style.jsx');
var ConditionSet = require('./ConditionSet.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var ConditionSets = React.createClass({
  componentWillMount: function () {
    this.conditionSets = this.props.conditionSets;
    if (!this.conditionSets) {
      this.conditionSets = [];
    }
  },

  render: function() {
    var conditionSets = (
      <div
        style={{
          padding: "10px 5px",
          margin: "10px 0",
          backgroundColor: "#ccc",
          borderLeft: "3px solid #666666"
        }}
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div>{"No condition sets have been added to this action item"}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.props.conditionSets && this.props.conditionSets.length > 0) {
      conditionSets = this.props.conditionSets.map(function(conditionSet, i) {
        conditionSet.index = i;
        return (
          <ConditionSet
            key={i}
            conditionSet={conditionSet}
            handleChange={this.handleChange_ConditionSet}
            handleRemove={this.handleClick_Remove} />
        )
      }.bind(this));
    }

    return (
      <div
        className="container-fluid"
        style={{
          margin: "0",
          padding: "0"
        }}>
        <div className="row">
          <div className="row-fluid">
            <span style={{
              margin: "5px 0",
              fontSize: "22px"
            }} className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
              <b>{"Condition Sets"}</b>
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
          <div className="row-fluid">
            {conditionSets}
          </div>
        </div>
      </div>
    )
  },

  handleChange_ConditionSet: function (conditionSet) {
    this.conditionSets[conditionSet.index] = conditionSet;
    this.props.handleChange(this.conditionSets);
  },

  handleClick_Add: function () {
    var index = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    this.conditionSets.push({index: index});
    this.props.handleChange(this.conditionSets);
  },

  handleClick_Remove: function (conditionSet) {
    this.conditionSets.splice(conditionSet.index, 1);
    this.props.handleChange(this.conditionSets);
  },
});

module.exports = ConditionSets;
