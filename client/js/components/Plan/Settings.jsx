var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var Select = require('../Form/Index.jsx').Select;
var TextArea = require('../Form/Index.jsx').TextArea;
var Button = require('../Button/Index.jsx');
var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');
var TaskTypeService = require('../../services/TaskTypeService');

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
            label={"Plan Name"}
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
            label={"Plan Year Start Date"}
            isRequired={false} />
          <Input
            type={"text"}
            attribute={"planStartDate"}
            value={this.plan.planStartDate}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is the Plan subject to ERISA?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isSubjectToErisa"}
            value={this.plan.isSubjectToErisa}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"What are the Plan's Entry Dates?"}
            isRequired={false} />
          <Select
            options={[
              "Annual",
              "Semi-annual", {
                label:"At least Quarterly",
                value:"Quarterly"
              }
            ]}
            attribute={"participantEntryFrequency"}
            value={this.plan.participantEntryFrequency}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Does the Plan allow Employer Contributions?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"employerContributions"}
            value={this.plan.employerContributions}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"When are the Employer Contributions made?"}
            isRequired={false} />
          <Select
            options={["Pay Period","Plan Year"]}
            attribute={"employerContributionSchedule"}
            value={this.plan.employerContributionSchedule}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is this a Safe Harbor Plan?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isSafeHarbor"}
            value={this.plan.isSafeHarbor}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Does the Plan allow loans?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"allowsLoans"}
            value={this.plan.allowsLoans}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Is the Plan subject to an annual Audit?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isAuditable"}
            value={this.plan.isAuditable}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Has investment oversight been Delegated?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"isInvestmentDelegated"}
            value={this.plan.isInvestmentDelegated}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"What type of Investment Delegation is used?"}
            isRequired={false} />
          <Select
            options={["3(21)","3(38)"]}
            attribute={"investmentDelegationType"}
            value={this.plan.investmentDelegationType}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Does the Plan use Automatic Enrollment?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"hasAutomaticEnrollment"}
            value={this.plan.hasAutomaticEnrollment}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Does the Plan use Automatic Escalation?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"hasAutomaticEscalation"}
            value={this.plan.hasAutomaticEscalation}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Does the Plan use a QDIA Fund?"}
            isRequired={false} />
          <Select
            options={["true","false"]}
            attribute={"hasQdiaFund"}
            value={this.plan.hasQdiaFund}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Label
            label={"Notes"}
            isRequired={false} />
          <TextArea
            attribute={"description"}
            value={this.plan.description}
            onChange={this.handleChange_Attribute} />
        </div>
        <div className="row">
          <Button.Primary
            label={"Save"}
            onClick={this.handleClick_Save} />
          <span style={{margin:"0px 5px"}} />
          <Button.Secondary
            label={"Cancel"}
            onClick={this.handleClick_Cancel} />
          <span style={{margin:"0px 5px"}} />
          <Button.Danger
            label={"Delete"}
            onClick={this.handleClick_Delete} />
          <span style={{margin:"0px 5px"}} />
          <Button.Secondary
            label={"Execute Task Type Service"}
            onClick={this.handleClick_Service} />
        </div>
      </div>
    )
  },

  handleClick_Service: function () {
    var service = new TaskTypeService(this.state.plan._id);
    service.execute(function (err) {
      if (err) { console.log(err); }
    });
  },

  handleClick_Save: function() {
    var plan = this.state.plan;
    if (plan.planStartDate) {
      plan.planStartDate = moment(plan.planStartDate).utc();
    }
    if (!plan._id) {
      PlanActions.create(plan);
    } else {
      PlanActions.savePlan(plan);
    }
    browserHistory.push("/plan/" + this.state.plan._id);
  },

  handleClick_Delete: function () {
    if (confirm('Are you sure you wish to delete this plan? You will lose all data for this plan.')) {
      PlanActions.destroy(this.state.plan);
      browserHistory.push("/");
    }
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
