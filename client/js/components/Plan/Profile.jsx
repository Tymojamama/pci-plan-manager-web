var React = require('react');
var Style = require('./Style.jsx');
var PlanFeed = require('./Feed.jsx');
var Feed = require('../Feed/Index.jsx');
var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');
var TaskStore = require('../../stores/TaskStore');

function getPlanProfileState(id, callback) {
  PlanStore.getOne(id, function(json) {
    callback({plan: json});
  })
}

var PlanProfile = React.createClass({
  getInitialState: function() {
    return {
      plan: {
        _id: '',
        name: ''
      }
    }
  },

  componentWillMount: function() {
    getPlanProfileState(this.props.params.id, function(state) {
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function() {
    PlanStore.addChangeListener(this._onChange);
    TaskStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlanStore.removeChangeListener(this._onChange);
    TaskStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Feed filter={this.getFeedFilter()} />
        {/*<PlanFeed planId={this.props.params.id}/>*/}
      </div>
    );
  },

  getFeedFilter: function () {
    var filter = function (task) {
      return task.planId == this.props.params.id;
    }.bind(this);
    return filter;
  },

  _onChange: function() {
    getPlanProfileState(this.props.params.id, function(state) {
      this.setState(state);
    }.bind(this));
  }
});

module.exports = PlanProfile;
