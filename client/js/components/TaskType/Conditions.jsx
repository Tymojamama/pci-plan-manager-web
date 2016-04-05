var React = require('react');
var Style = require('./Style.jsx');
var Condition = require('./Condition.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Conditions = React.createClass({
  componentWillMount: function() {
    this.conditions = this.props.conditions;
    if (!this.conditions) {
      this.conditions = [];
    }
  },

  render: function() {
    var conditions = (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={{
          padding: "10px 5px",
          margin: "10px 0",
          backgroundColor: "#f1f4f6",
          borderLeft: "3px solid #666666"
        }}>
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div>{"No conditions have been added to this action item"}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.props.conditions && this.props.conditions.length > 0) {
      conditions = this.props.conditions.map(function(doc, i) {
        doc.index = i;
        return (
          <Condition
            key={i}
            condition={doc}
            handleChange={this.handleChange_Condition}
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
        <div
          className="row"
          style={{
            margin: "0",
            padding: "0"
          }}>
          <div className="row-fluid">
            <span style={{
              margin: "5px 0",
              fontSize: "22px"
            }} className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
              <b>{"Conditions"}</b>
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
            {conditions}
          </div>
        </div>
      </div>
    )
  },

  handleChange_Condition: function(condition) {
    this.conditions[condition.index] = condition;
    this.props.handleChange(this.conditions);
  },

  handleClick_Add: function() {
    var index = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    this.conditions.push({index: index});
    return this.props.handleChange(this.conditions);
  },

  handleClick_Remove: function(condition) {
    this.conditions.splice(condition.index, 1);
    this.props.handleChange(this.conditions);
  },
});

module.exports = Conditions;
