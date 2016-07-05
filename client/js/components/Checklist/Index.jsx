var React = require('react');
var Style = require('./Style.jsx');
var Details = require('./Details.jsx');
var Button = require('../Button/Index.jsx');
var ChecklistStore = require('../../stores/ChecklistStore');
var ChecklistActions = require('../../actions/ChecklistActions');

var Component = React.createClass({
  getInitialState: function () {
    return {
      checklist: ''
    }
  },

  componentWillMount: function () {
    ChecklistStore.getOne(this.props.id, function (checklist) {
      var state = this.state;
      state.checklist = checklist;
      this.setState(state);
    }.bind(this));
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-lg-8 col-xs-12 col-centered">
          <div>
            <h3 style={{margin:"5px 0px"}}>{this.state.checklist.name}</h3>
          </div>
          <Details
            checklist={this.state.checklist}
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

  handleChange_Details: function (checklist) {
    var state = this.state;
    state.checklist = checklist;
    this.setState(state);
  },

  handleClick_Save: function () {
    if (!this.state.checklist._id) {
      ChecklistActions.create(this.state.checklist);
      window.history.back();
    } else {
      ChecklistActions.update(this.state.checklist);
      window.history.back();
    }
  },

  handleClick_Cancel: function () {
    window.history.back();
  },

  handleClick_Delete: function () {
    ChecklistActions.destroy(this.state.checklist);
    window.history.back();
  },
});

module.exports = Component;
