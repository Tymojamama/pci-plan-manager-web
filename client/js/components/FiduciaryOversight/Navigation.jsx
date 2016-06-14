var React = require('react');
var S = require('string');
var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');
var TaskCategoryStore = require('../../stores/TaskCategoryStore')

function getSelectionStatus(path) {
  if (window.location.pathname === path) {
    return true;
  } else {
    return false;
  }
}

function getBackLinkPath() {
  if (window.location.pathname === "/fiduciary") {
    return "/";
  } else {
    return "/fiduciary";
  }
}

function getBackLinkLabel() {
  if (window.location.pathname === "/fiduciary") {
    return "◄ Back home";
  } else if (S(window.location.pathname).startsWith("/fiduciary")) {
    return "◄ Back to fiduciary oversight";
  } else {
    return "◄ Back";
  }
}

var Navigation = React.createClass({
  getInitialState: function () {
    return {
      taskCategories: []
    }
  },

  componentWillMount: function () {
    TaskCategoryStore.get(function (taskCategories) {
      this.setState({
        taskCategories: taskCategories,
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className="feed-navigation">
        <LinkItem label={getBackLinkLabel()} link={getBackLinkPath()}/>
        <Spacer/>
        <Header label="Oversight"/>
        {this.getTaskCategories()}
      </div>
    )
  },

  getTaskCategories: function () {
    return this.state.taskCategories.map(function (taskCategory) {
      return (
        <LinkItem
          key={taskCategory._id}
          label={taskCategory.icon + " " + taskCategory.name}
          link={"/fiduciary/" + taskCategory._id}
          backgroundColor="#222222"
          backgroundColorHover="#0d0d0d"/>
      )
    });
  },
});

module.exports = Navigation;
