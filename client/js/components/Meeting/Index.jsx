var React = require('react');
var moment = require('moment');
var Details = require('./Details.jsx');
var People = require('./People.jsx');
var Style = require('./Style.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;
var Button = require('../Button/Index.jsx');
var MeetingActions = require('../../actions/MeetingActions');
var MeetingStore = require('../../stores/MeetingStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      meeting: ''
    }
  },

  componentWillMount: function () {
    MeetingStore.getOne(this.props.id, function (meeting) {
      if (meeting.startTime) {
        meeting.startTime = moment(meeting.startTime).format("MM/DD/YYYY h:mm a");
      }
      if (meeting.endTime) {
        meeting.endTime = moment(meeting.endTime).format("MM/DD/YYYY h:mm a");
      }
      this.setState({
        meeting: meeting,
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-lg-8 col-xs-12 col-centered">
          <div>
            <h3 style={{margin:"5px 0px"}}>{this.state.meeting.name}</h3>
          </div>
          <Details
            meeting={this.state.meeting}
            onChange={this.handleChange_Details} />
          <People
            meeting={this.state.meeting}
            onChange={this.handleChange_Details} />
          <div style={{marginTop:"15px"}}>
            <Button.Primary
              label={"Save"}
              onClick={this.handleClick_Save} />
            <span style={{display:"inline-block",width:"10px"}} />
            <Button.Secondary
              label={"Cancel"}
              onClick={this.handleClick_Cancel} />
            <span style={{display:"inline-block",width:"10px"}} />
            <Button.Danger
              label={"Delete"}
              onClick={this.handleClick_Delete} />
          </div>
        </div>
      </div>
    )
  },

  handleChange_Details: function (meeting) {
    this.setState({meeting:meeting});
  },

  handleClick_Save: function () {
    if (!this.state.meeting._id) {
      MeetingActions.create(this.state.meeting);
      window.history.back();
    } else {
      MeetingActions.update(this.state.meeting);
      window.history.back();
    }
  },

  handleClick_Cancel: function () {
    window.history.back();
  },

  handleClick_Delete: function () {
    MeetingActions.destroy(this.state.meeting);
    window.history.back();
  },
});

module.exports = Component;
