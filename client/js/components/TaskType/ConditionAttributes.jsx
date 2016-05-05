var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');
var Attribute = require('./ConditionAttribute.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Attributes = React.createClass({
  componentWillMount: function() {
    this.attributes = this.props.attributes;
    this.id = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    if (!this.attributes) {
      this.attributes = [];
    }
  },

  render: function() {
    var attributes = (
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
                <div>{"No attributes have been added to this step"}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );

    if (this.props.attributes && this.props.attributes.length > 0) {
      attributes = this.props.attributes.map(function(attribute, i) {
        attribute.index = i;
        var result = (
          <Attribute
            key={i}
            attribute={attribute}
            handleChange={this.handleChange_Attribute}
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
              <b>{"Attributes"}</b>
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
            {attributes}
          </div>
        </div>
      </div>
    )
  },

  getId: function () {
    return "attributes-" + this.id;
  },

  handleClick_Heading: function () {
    $("#" + this.getId()).slideToggle();
  },

  handleChange_Attribute: function (attribute) {
    this.attributes[attribute.index]  = attribute;
    this.props.handleChange(this.attributes);
  },

  handleClick_Remove: function (attribute) {
    this.attributes.splice(attribute.index, 1);
    this.props.handleChange(this.attributes);
  },

  handleClick_Add: function () {
    var index = Math.floor(Math.random() * (1000000000 - 0)) + 0;
    this.attributes.push({index: index});
    return this.props.handleChange(this.attributes);
  },
});

module.exports = Attributes;
