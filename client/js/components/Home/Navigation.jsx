var React = require('react');

var PlanSearch = require('../Plan/Search.jsx');
var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

var Navigation = React.createClass({

  render: function() {
    return (
      <div>
        <LinkItem
          label="🏠 You are home"
          link="/"
          backgroundColor="#da383c"
          backgroundColorHover="#c22426"/>
        <Spacer/>

        <Header label="📡 Oversight"/>
        <LinkItem
          label="📂 Documents"
          link="/document"
          backgroundColor="#222222"
          backgroundColorHover="#0d0d0d"/>

        <PlanSearch options={{
          isComponent: true
        }}/>

      </div>
    )
  }
});

module.exports = Navigation;
