var React = require('react');
var Style = require('./Style.jsx');

var Info = React.createClass({
  render: function() {
    return (
      <div>
        <div className="container-fluid" style={Style.heading}>
          <div className="row">
            <span className="text-uppercase">Plan Info</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Info;
