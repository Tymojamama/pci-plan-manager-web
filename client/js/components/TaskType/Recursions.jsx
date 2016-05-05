var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Recursion = require('./Recursion.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Recursions = React.createClass({
  componentWillMount: function() {
    this.recursions = this.props.recursions;
    this.id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    if (!this.recursions) {
      this.recursions = [];
    }
  },

  render: function() {
    var recursions = (
      <div style={{
        padding: "10px 5px",
        margin: "10px 0",
        backgroundColor: "#ccc",
        borderLeft: "3px solid #666666"
      }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="container-fluid">
          <div className="row">
            <div className="row-fluid">
              <span className="col-lg-4 col-md-4 hidden-sm hidden-xs"></span>
              <span className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div>{"No recursions have been added to this step"}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.props.recursions && this.props.recursions.length > 0) {
      recursions = this.props.recursions.map(function(recursion, i) {
        recursion.index = i;
        var result = (
          <Recursion
            key={i}
            recursion={recursion}
            handleChange={this.handleChange_Recursion}
            handleRemove={this.handleClick_Remove} />
        )
        return result;
      }.bind(this));
    }

    return (
      <div
        className="container-fluid"
        style={{
          margin: "10px 0 0 0",
          padding: "0"
        }}>
        <div className="row">
          <div className="row-fluid">
            <span
              style={{
                margin: "5px 0",
                fontSize: "22px",
                cursor: "pointer"
              }}
              className="col-lg-8 col-md-8 col-sm-6 col-xs-6"
              onClick={this.handleClick_Heading}>
              <b>{"Recursions"}</b>
            </span>
            <span
              style={{
                margin: "5px 0"
              }}
              className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <span
                style={{
                  float: "right",
                  cursor: "pointer"
                }}>
                <ButtonPrimary label={"Add"} onClick={this.handleClick_Add}/>
              </span>
            </span>
          </div>
          <div id={this.getId()} style={{display:"none"}} className="row-fluid">
            {recursions}
          </div>
        </div>
      </div>
    )
  },

  getId: function () {
    return "recursions-" + this.id;
  },

  handleClick_Heading: function () {
    $("#" + this.getId()).slideToggle();
  },

  handleChange_Recursion: function (recursion) {
    this.recursions[recursion.index]  = recursion;
    this.props.handleChange(this.recursions);
  },

  handleClick_Remove: function (recursion) {
    this.recursions.splice(recursion.index, 1);
    this.props.handleChange(this.recursions);
  },

  handleClick_Add: function () {
    var index = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    this.recursions.push({index: index});
    return this.props.handleChange(this.recursions);
  },
});

module.exports = Recursions;
