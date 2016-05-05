var React = require('react');
var Style = require('./Style.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Conditions = require('./Conditions.jsx');

var Recursion = React.createClass({
  componentWillMount: function() {
    this.recursion = this.props.recursion;
  },

  componentWillReceiveProps: function(nextProps) {
    this.recursion = nextProps.recursion;
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
        <div className="container-fluid" style={{
          margin: "0",
          padding: "0"
        }}>
          <div className="row" style={{
            margin: "0",
            padding: "0"
          }}>
            <div className="row-fluid">
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left">Value</span>
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select style={Style.select} value={this.props.recursion.value} onChange={this.handleChange_Value}>
                  <option value=""></option>
                  <option value="annual">Annual</option>
                  <option value="semi-annual">Semi-annual</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </span>
            </div>
            <div className="row-fluid padding-top-15">
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left"></span>
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Conditions
                  conditions={this.props.recursion.conditions}
                  handleChange={this.handleChange_Conditions} />
              </span>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

  handleChange_Value: function (event) {
    this.recursion.value = event.target.value;
    this.props.handleChange(this.recursion);
  },

  handleChange_Conditions: function (conditions) {
    this.recursion.conditions = conditions;
    this.props.handleChange(this.recursion);
  },

  handleClick_Remove: function () {
    this.props.handleRemove(this.props.recursion);
  }
});

module.exports = Recursion;
