var React = require('react');
var Index = require('./Index.jsx');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={{paddingTop:"65px"}}>
        <Index id={this.props.params.id} />
      </div>
    )
  }
});

module.exports = Component;
