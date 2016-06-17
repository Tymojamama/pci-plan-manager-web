var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var Form = require('../Form/Index.jsx');
var Button = require('../Button/Index.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return {
      name: ''
    }
  },

  render: function () {
    return (
      <div>
        <h3 style={{margin:"25px 0px"}}>People</h3>
        <Form.Input
          type={"text"}
          value={this.state.name}
          onChange={this.handleChange_Name} />
        <div style={{marginTop:"15px"}}>
          <Button.Primary
            label={"Add"}
            onClick={this.handleClick_Add} />
          <span style={{display:"inline-block",width:"10px"}} />
          <Button.Danger
            label={"Remove"}
            onClick={this.handleClick_Remove} />
        </div>
        <div style={{marginTop:"15px"}} />
        <Griddle
          results={this.getGriddleData()}
          columnMetadata={this.getColumnMetadata()}
          columns={["Name"]}
          resultsPerPage={20}
          onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getColumnMetadata: function () {
    var meta = [];
    meta.push({
      "columnName": "Name",
      "order": 1,
      "locked": false,
      "visible": true,
    });
    return meta;
  },

  getGriddleData: function () {
    var result = [];
    if (!this.props.meeting.people) { return result; }
		this.props.meeting.people.map(function (person) {
      result.push({
        "Name": person.name,
      });
		});
    return result;
  },

  handleClick_Row: function (gridRow, event) {
    this.setState({
      name: gridRow.props.data["Name"],
    });
  },

  handleChange_Name: function (value) {
    this.setState({
      name: value,
    });
  },

  handleClick_Add: function () {
    var meeting = this.props.meeting;
    if (!meeting.people) { meeting.people = []; }
    meeting.people.push({
      name: this.state.name,
    });
    this.props.onChange(meeting);
    this.setState({name: ""});
  },

  handleClick_Remove: function () {
    var meeting = this.props.meeting;
    if (!meeting.people) { meeting.people = []; }
    var people = [];
    meeting.people.map(function (person) {
      if (person.name != this.state.name) {
        people.push(person);
      }
    }.bind(this));
    meeting.people = people;
    this.props.onChange(meeting);
    this.setState({name: ""});
  },
});

module.exports = Component;
