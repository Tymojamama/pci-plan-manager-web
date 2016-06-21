var React = require('react');
var $ = require('jquery');

var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');

var Style = require('./Style.jsx');

var PlanNavigation = require('./Navigation.jsx');
var PlanProfile = require('./Profile.jsx');

function getPlanProfileState(id, callback) {
  PlanStore.getOne(id, function(json) {
    callback({plan: json});
  })
}

var PlanPage = React.createClass({
  getInitialState: function() {
    return {
      plan: {
        _id: '',
        name: '',
        planType: ''
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
  },

  componentWillUnmount: function() {
    PlanStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div
        style={Style.headerPadding}
        className="col-lg-8 col-xs-12 col-centered">
        <h3
          style={{
            margin: "15px 0px",
          }}>
          {this.state.plan.name}
        </h3>
        <div
          className="col-md-3 hidden-sm hidden-xs"
          style={{
            paddingLeft: "0px",
            marginLeft: "0px"
          }}>
          <PlanNavigation planId={this.state.plan._id}/>
        </div>
        <div
          className="col-md-6 col-xs-12"
          style={{
            padding: "0px",
            margin: "0px"
          }}>
          {this.props.children}
        </div>
        <div
          className="col-md-3 hidden-sm hidden-xs"
          style={{
            paddingRight: "0px",
            marginRight: "0px"
          }}>

        </div>
      </div>
    );
  },

  _onChange: function() {
    getPlanProfileState(this.props.params.id, function(state) {
      console.log(state);
      this.setState(state);
    }.bind(this));
  }
});

module.exports = PlanPage;
