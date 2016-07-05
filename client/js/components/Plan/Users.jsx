var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Griddle = require('griddle-react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Button = require('../Button/Index.jsx');
var Form = require('../Form/Index.jsx');
var PlanStore = require('../../stores/PlanStore.js');
var PlanActions = require('../../actions/PlanActions.js');

var NewUser = React.createClass({
  getInitialState: function () {
    return {
      email: ''
    }
  },

  render: function () {
    return (
      <div className="row">
        <Form.Label label={"Email"} />
        <Form.Input
          type={"text"}
          attribute={"email"}
          value={this.state.email}
          onChange={this.handleChange_Attribute} />
    		<div style={{marginBottom:"15px"}} />
        <Button.Primary
          label={"Submit"}
          onClick={this.handleClick_Submit} />
        <span style={{margin:"0px 5px"}} />
        <Button.Danger
          label={"Delete"}
          onClick={this.handleClick_Delete} />
      </div>
    )
  },

  handleChange_Attribute: function (attribute, value) {
    var state = this.state;
    state[attribute] = value;
    this.setState(state);
  },
});

var columnMeta = [{
  "columnName": "Email",
  "order": 1,
  "locked": false,
  "visible": true,
}];

var Component = React.createClass({
  getInitialState: function () {
    return {
      users: [],
    }
  },

	componentWillMount: function () {
    PlanStore.getOne(this.props.params.id, function (plan) {
      this.setState({
        users: plan.users,
      });
    }.bind(this));
	},

  render: function () {
    return (
      <div className="container-fluid">
        <div style={Style.heading} className="row">
          <span className="text-uppercase">Plan Users</span>
        </div>
        <NewUser />
        <div className="row">
          <div style={{marginBottom:"15px"}} />
    			<Griddle
    				results={this.getGriddleData()}
    				columnMetadata={columnMeta}
    				columns={["Email"]}
    				resultsPerPage={20}
    				onRowClick={this.handleClick_Row} />
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    if (!this.state.users) { return result; }
		this.state.users.map(function (user) {
      result.push({
        "Email": user.email,
      });
		}.bind(this));
    return result;
  },

  handleClick_Row: function (gridRow, event) {
		browserHistory.push("/document/" + gridRow.props.data.documentId);
  },
});

module.exports = Component;
