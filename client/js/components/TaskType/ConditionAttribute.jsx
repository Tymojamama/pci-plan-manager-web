var React = require('react');
var Style = require('./Style.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;

var Attribute = React.createClass({
  componentWillMount: function() {
    this.attribute = this.props.attribute;
  },

  componentWillReceiveProps: function(nextProps) {
    this.attribute = nextProps.attribute;
  },

  render: function() {
    return (
      <div
        key={this.props.key}
        style={{
          padding: "10px 5px",
          margin: "10px 0",
          backgroundColor: "#ccc",
          borderLeft: "3px solid #666666"
        }}
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Name</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <input
                  style={Style.input}
                  type="text"
                  value={this.props.attribute.name}
                  onChange={this.handleChange_Name} />
              </span>
            </div>
            <div className="row-fluid padding-top-15">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Comparison</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Comparison</span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <select style={Style.select} value={this.props.attribute.comparisonType} onChange={this.handleChange_Comparison}>
                  <option value=""></option>
                  <option value="equal">Equal to</option>
                  <option value="not equal">Not equal to</option>
                  <option value="between">Between</option>
                  <option value="greater than">Greater than</option>
                  <option value="less than">Less than</option>
                </select>
              </span>
            </div>
            <div className="row-fluid padding-top-15">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs text-right">Value</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Value</span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <textarea
                  style={Style.textArea}
                  value={this.props.attribute.value}
                  onChange={this.handleChange_Value} />
              </span>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
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
    )
  },

  handleChange_Name: function (event) {
    this.attribute.name = event.target.value;
    this.props.handleChange(this.attribute);
  },

  handleChange_Comparison: function (event) {
    this.attribute.comparisonType = event.target.value;
    this.props.handleChange(this.attribute);
  },

  handleChange_Value: function (event) {
    this.attribute.value = event.target.value;
    this.props.handleChange(this.attribute);
  },

  handleClick_Remove: function () {
    this.props.handleRemove(this.props.attribute);
  }
});

module.exports = Attribute;
