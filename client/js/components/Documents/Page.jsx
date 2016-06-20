var React = require('react');
var Style = require('./Style.jsx');
var Index = require('./Index.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={{paddingTop:"65px"}}>
        <Index />
      </div>
    )
  }
});

module.exports = Component;
