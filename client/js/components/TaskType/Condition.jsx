var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Attributes = require('./ConditionAttributes.jsx');
var ButtonDanger = require('../Button/Index.jsx').Danger;

var Condition = React.createClass({
  componentWillMount: function() {
    this.condition = this.props.condition;
  },

  componentWillReceiveProps: function(nextProps) {
    this.condition = nextProps.condition;
  },

  render: function() {
    return (
      <div style={{
        padding: "10px 5px",
        margin: "10px 0",
        backgroundColor: "#f1f4f6",
        borderLeft: "3px solid #666666"
      }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="container-fluid" style={{
          margin: "0",
          padding: "0"
        }}>
          <div className="row" style={{
            margin: "0",
            padding: "0"
          }}>
            <div className="row-fluid">
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left">Entity</span>
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select style={Style.select} value={this.props.condition.entity} onChange={this.handleChange_Entity}>
                  <option value=""></option>
                  <option value="plan">Plan</option>
                </select>
              </span>
            </div>
            <div className="row-fluid padding-top-15">
              <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Attributes attributes={this.props.condition.attributes} handleChange={this.handleChange_Attributes}/>
              </span>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <div style={{
                padding: "10px 0 0 0"
              }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
      </div>
    )
  },

  handleChange_Entity: function (event) {
    this.condition.entity = event.target.value;
    this.props.handleChange(this.condition);
  },

  handleChange_Attributes: function (attributes) {
    this.condition.attributes = attributes;
    this.props.handleChange(this.condition);
  },

  handleClick_Remove: function() {
    this.props.handleRemove(this.props.condition);
  }
});

module.exports = Condition;
