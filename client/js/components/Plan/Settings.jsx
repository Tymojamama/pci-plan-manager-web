var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var Select = require('../Form/Index.jsx').Select;
var TextArea = require('../Form/Index.jsx').TextArea;
var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');

function getPlanProfileState(id, callback) {
  PlanStore.getOne(id, function(plan) {
    if (plan.planStartDate) {
      plan.planStartDate = moment(plan.planStartDate).format("MM/DD/YYYY");
    }
    callback(plan);
  })
}

var PlanSettings = React.createClass({
  getInitialState: function () {
    this.plan = {};
    return {
      plan: this.plan,
    }
  },

  componentWillMount: function() {
    getPlanProfileState(this.props.params.id, function(plan) {
      this.plan = plan;
      this.setState({plan:this.plan});
    }.bind(this));
  },

  componentDidMount: function() {
    PlanStore.addChangeListener(this.handleChange_PlanStore);
  },

  componentWillUnmount: function() {
    PlanStore.removeChangeListener(this.handleChange_PlanStore);
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div style={Style.heading} className="row">
          <span className="text-uppercase">Plan Settings</span>
        </div>
        <div className="row">
          <Label
            label={"Name"}
            isRequired={true} />
          <Input
            type={"text"}
            attribute={"name"}
            value={this.plan.name}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Plan Sponsor Name"}
            isRequired={false} />
          <Input
            type={"text"}
            attribute={"planSponsorName"}
            value={this.plan.planSponsorName}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Asset Value"}
            isRequired={false} />
          <Input
            type={"text"}
            attribute={"assetValue"}
            value={this.plan.assetValue}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Plan Start Date"}
            isRequired={false} />
          <Input
            type={"text"}
            attribute={"planStartDate"}
            value={this.plan.planStartDate}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Participant Entry Frequency"}
            isRequired={false} />
          <Select
            options={["Annual","Semi-annual","Quarterly"]}
            attribute={"participantEntryFrequency"}
            value={this.plan.participantEntryFrequency}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Has Employer Contributions"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"employerContributions"}
            value={this.plan.employerContributions}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Employer Contributions Schedule"}
            isRequired={false} />
          <Select
            options={["Pay Period","Plan Year"]}
            attribute={"employerContributionSchedule"}
            value={this.plan.employerContributionSchedule}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is Safe Harbor Plan"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isSafeHarbor"}
            value={this.plan.isSafeHarbor}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Allows Loans"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"allowsLoans"}
            value={this.plan.allowsLoans}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is Auditable"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isAuditable"}
            value={this.plan.isAuditable}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is Auditable"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isAuditable"}
            value={this.plan.isAuditable}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is Investment Delegated"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isInvestmentDelegated"}
            value={this.plan.isInvestmentDelegated}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Investment Delegation Type"}
            isRequired={false} />
          <Select
            options={["3(21)","3(38)"]}
            attribute={"investmentDelegationType"}
            value={this.plan.investmentDelegationType}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Description"}
            isRequired={true} />
          <TextArea
            attribute={"description"}
            value={this.plan.description}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <div
            style={Style.saveButton}
            className="btn btn-primary"
            onClick={this.handleClick_Save}>
            Save
          </div>
          <div
            className="btn btn-default"
            onClick={this.handleClick_Cancel}>
            Cancel
          </div>
        </div>
      </div>
    )
  },

  handleClick_Save: function() {
    var plan = this.state.plan;
    plan.planStartDate = moment(plan.planStartDate).utc();
    PlanActions.savePlan(plan);
    browserHistory.push("/plan/" + this.state.plan._id);
  },

  handleClick_Cancel: function () {
    if (confirm('Are you sure you wish to cancel? You will lose unsaved changes.')) {
      getPlanProfileState(this.props.params.id, function(state) {
        this.setState(state);
        browserHistory.push("/plan/" + this.state.plan._id);
      }.bind(this));
    }
  },

  handleChange_Attribute: function (attribute, value) {
    var plan = this.state.plan;
    plan[attribute] = value;
    this.plan = plan;
    this.setState({plan: plan});
  },

  handleChange_PlanStore: function () {
    getPlanProfileState(this.state.plan._id, function(state) {
      this.setState(state);
    }.bind(this));
  }
});

module.exports = PlanSettings;
