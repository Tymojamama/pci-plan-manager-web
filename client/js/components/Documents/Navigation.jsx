var React = require('react');
var Style = require('./Style.jsx');
var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <div className="feed-navigation">
        <LinkItem
          label={"◄ Back home"}
          link={"/"} />
      </div>
    )
  }
});

module.exports = Component;
