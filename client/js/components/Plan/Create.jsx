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

var PlanSettings = React.createClass({
  getInitialState: function () {
    return {
      plan: {},
    }
  },

  render: function() {
    return (
      <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <div className="container-fluid">
          <div style={Style.heading} className="row">
            <span className="text-uppercase">Create A Plan</span>
          </div>
          <div className="row">
            <Label
              label={"Name"}
              isRequired={true} />
            <Input
              type={"text"}
              attribute={"name"}
              value={this.state.plan.name}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Plan Sponsor Name"}
              isRequired={false} />
            <Input
              type={"text"}
              attribute={"planSponsorName"}
              value={this.state.plan.planSponsorName}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Asset Value"}
              isRequired={false} />
            <Input
              type={"text"}
              attribute={"assetValue"}
              value={this.state.plan.assetValue}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Plan Start Date"}
              isRequired={false} />
            <Input
              type={"text"}
              attribute={"planStartDate"}
              value={this.state.plan.planStartDate}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Participant Entry Frequency"}
              isRequired={false} />
            <Select
              options={["Annual","Semi-annual","Quarterly"]}
              attribute={"participantEntryFrequency"}
              value={this.state.plan.participantEntryFrequency}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Has Employer Contributions"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"employerContributions"}
              value={this.state.plan.employerContributions}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Employer Contributions Schedule"}
              isRequired={false} />
            <Select
              options={["Pay Period","Plan Year"]}
              attribute={"employerContributionSchedule"}
              value={this.state.plan.employerContributionSchedule}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Is Safe Harbor Plan"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"isSafeHarbor"}
              value={this.state.plan.isSafeHarbor}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Allows Loans"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"allowsLoans"}
              value={this.state.plan.allowsLoans}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Is Auditable"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"isAuditable"}
              value={this.state.plan.isAuditable}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Is Investment Delegated"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"isInvestmentDelegated"}
              value={this.state.plan.isInvestmentDelegated}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Investment Delegation Type"}
              isRequired={false} />
            <Select
              options={["3(21)","3(38)"]}
              attribute={"investmentDelegationType"}
              value={this.state.plan.investmentDelegationType}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Uses Automatic Enrollment"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"hasAutomaticEnrollment"}
              value={this.state.plan.hasAutomaticEnrollment}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Uses Automatic Escalation"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"hasAutomaticEscalation"}
              value={this.state.plan.hasAutomaticEscalation}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Uses QDIA Fund"}
              isRequired={false} />
            <Select
              options={["true","false"]}
              attribute={"hasQdiaFund"}
              value={this.state.plan.hasQdiaFund}
              onChange={this.handleChange_Attribute} />
          </div>
          <div className="row">
            <Label
              label={"Notes"}
              isRequired={false} />
            <TextArea
              attribute={"description"}
              value={this.state.plan.description}
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
          </div>
        </div>
      </div>
    )
  },

  handleClick_Save: function() {
    var plan = this.state.plan;
    if (plan.planStartDate) {
      plan.planStartDate = moment(plan.planStartDate).utc();
    }
    PlanActions.create(plan);
    browserHistory.push("/");
  },

  handleClick_Cancel: function () {
    if (confirm('Are you sure you wish to cancel? You will lose unsaved changes.')) {
      browserHistory.push("/");
    }
  },

  handleChange_Attribute: function (attribute, value) {
    var plan = this.state.plan;
    plan[attribute] = value;
    this.setState({plan: plan});
  },
});

module.exports = PlanSettings;
