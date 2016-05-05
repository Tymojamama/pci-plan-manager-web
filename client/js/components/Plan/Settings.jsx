var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var PlanActions = require('../../actions/PlanActions.js');
var PlanStore = require('../../stores/PlanStore.js');

function getPlanProfileState(id, callback) {
  PlanStore.getOne(id, function(json) {
    if (!json.duties) { json.duties = {} }
    if (!json.duties.investment) { json.duties.investment = {} }
    callback(json);
  })
}

var PlanSettings = React.createClass({
  getInitialState: function () {
    this.plan = {};
    this.plan.duties = {};
    this.plan.duties.investment = {};
    return {
      plan: this.plan,
    }
  },

  componentWillMount: function() {
    getPlanProfileState(this.props.params.id, function(state) {
      this.plan = state;
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
      <div>
        <div className="container-fluid" style={Style.heading}>
          <div className="row">
            <span className="text-uppercase">Plan Settings</span>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Name</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Name</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <input style={Style.input} type="text" value={this.state.plan.name} onChange={this.handleChange_Name}/>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Type</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Type</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <input style={Style.input} type="text" value={this.state.plan.planType} onChange={this.handleChange_Type}/>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Asset Value</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Asset Value</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <input style={Style.input} type="text" value={this.state.plan.assetValue} onChange={this.handleChange_AssetValue}/>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Participant Entry Frequency</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Participant Entry Frequency</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <select style={Style.input} value={this.state.plan.participantEntryFrequency} onChange={this.handleChange_ParticipantEntryFrequency}>
                  <option value=""></option>
                  <option value="annual">{"Annual"}</option>
                  <option value="semi-annual">{"Semi-annual"}</option>
                  <option value="quarterly">{"Quarterly"}</option>
                </select>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Investment Delegation Type</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Investment Delegation Type</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <select style={Style.input} value={this.state.plan.duties.investment.delegationType} onChange={this.handleChange_InvestmentType}>
                  <option value=""></option>
                  <option value="3(21)">{"3(21)"}</option>
                  <option value="3(38)">{"3(38)"}</option>
                </select>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
            <div className="row padding-top-05">
              <span className="col-lg-3 col-md-3 hidden-sm hidden-xs text-right">Description</span>
              <span className="hidden-lg hidden-md col-sm-12 col-xs-12 text-left">Description</span>
              <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <textarea style={Style.textArea} value={this.state.plan.description} onChange={this.handleDescriptionChange}></textarea>
              </span>
              <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row padding-top-05">
            <span className="col-lg-3 col-md-3 col-sm-12 col-xs-12"></span>
            <span className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
              <div className="btn btn-primary" style={Style.saveButton} onClick={this.saveChanges}>Save</div>
              <div className="btn btn-default" onClick={this.cancelChanges}>Cancel</div>
            </span>
            <span className="col-lg-2 col-md-2 hidden-sm hidden-xs"/>
          </div>
        </div>
      </div>
    )
  },

  saveChanges: function() {
    PlanActions.savePlan(this.state.plan);
    browserHistory.push("/plan/" + this.state.plan._id);
  },

  cancelChanges: function () {
    if (confirm('Are you sure you wish to cancel? You will lose unsaved changes.')) {
      getPlanProfileState(this.props.params.id, function(state) {
        this.setState(state);
        browserHistory.push("/plan/" + this.state.plan._id);
      }.bind(this));
    }
  },

  handleChange_Name: function (event) {
    this.plan.name = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_Type: function (event) {
    this.plan.planType = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_AssetValue: function (event) {
    this.plan.assetValue = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_ParticipantEntryFrequency: function (event) {
    this.plan.participantEntryFrequency = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_InvestmentType: function (event) {
    this.plan.duties.investment.delegationType = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_Description: function (event) {
    this.plan.description = event.target.value;
    this.setState({plan: this.plan});
  },

  handleChange_PlanStore: function () {
    getPlanProfileState(this.state.plan._id, function(state) {
      this.setState(state);
    }.bind(this));
  }
});

module.exports = PlanSettings;
