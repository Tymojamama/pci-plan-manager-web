var React = require('react');
var Style = require('./Style.jsx');
var Details = require('./Details.jsx');
var ConditionSets = require('./ConditionSets.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var TaskTypeStore = require('../../stores/TaskTypeStore');
var TaskTypeActions = require('../../actions/TaskTypeActions');

var _taskType = {};

function getState(id, callback) {
  if (id) {
    TaskTypeStore.getOne(id, function(doc) {
      callback({taskType: doc});
      _taskType = doc;
    });
  } else {
    callback({taskType: _taskType});
  }
}

var Task = React.createClass({
  getInitialState: function() {
    _taskType = {
			taskType: ''
		};

    return _taskType;
  },

  componentWillMount: function() {
    getState(this.props.id, function(state) {
      this.setState(state);
    }.bind(this));
  },

  componentDidMount: function() {
    TaskTypeStore.addChangeListener(this.handleChange_TaskTypeStore);
  },

  componentWillUnmount: function() {
    TaskTypeStore.removeChangeListener(this.handleChange_TaskTypeStore);
  },

  render: function() {
    return (
      <div style={Style.container} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 hidden-sm hidden-xs">
          <div className="container-fluid">
            <div className="row">
              <div className="row-fluid">
                <h1 className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{
                    margin: "5px 0",
                  }}>{this.state.taskType.name}</h1>
							</div>
	            <div className="row-fluid">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{
										backgroundColor: "#666666",
										marginBottom: "20px",
									}}>
									<ButtonSecondary label={"Details"} onClick={this.handleClick_Details} />
									<ButtonSecondary label={"Condition Sets"} onClick={this.handleClick_ConditionSets} />
                </div>
							</div>
          </div>
          {this.getChildComponent()}
          <div className="container-fluid" style={{
            margin: "0",
            padding: "0"
          }}>
            <div className="row" style={{
              margin: "0",
              padding: "0"
            }}>
              <div className="row-fluid padding-top-05">
                <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div style={{
                    float: "right"
                  }}>
                    <ButtonSecondary label={"Cancel"} onClick={this.handleClickClose}/>
                    <span style={{
                      marginLeft: "5px"
                    }}/>
                    <ButtonPrimary label={"Save"} onClick={this.handleClickSave}/>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  },

  getChildComponent: function () {
    if (this.state.route == "/detail") {
      return (
        <Details taskType={this.state.taskType} onChange={this.handleChange_Child} />
      )
    } else if (this.state.route == "/condition-sets") {
      return (
        <ConditionSets conditionSets={this.state.taskType.conditionSets} handleChange={this.handleChange_ConditionSets} />
      )
    } else {
      return (
        <Details taskType={this.state.taskType} onChange={this.handleChange_Child} />
      )
    }
  },

  handleClick_Details: function () {
    this.setState({
      taskType: this.state.taskType,
      route: "/detail",
    });
  },

  handleClick_ConditionSets: function () {
    this.setState({
      taskType: this.state.taskType,
      route: "/condition-sets",
    });
  },

  handleChange_TaskTypeStore: function() {
    getState(this.props.id, function(state) {
      this.setState(state);
    }.bind(this));
  },

  handleChange_ConditionSets: function (conditionSets) {
    _taskType.conditionSets = conditionSets;
    this.setState({taskType: _taskType});
  },

  handleChange_Child: function (taskType) {
    _taskType = taskType;
    this.setState({taskType: _taskType});
  },

  handleClickSave: function() {
    console.log(this.state.taskType);
    if (this.props.id) {
      TaskTypeActions.update(this.state.taskType);
    } else {
      TaskTypeActions.create(this.state.taskType);
    }

    this.props.handleClose();
  },

  handleClickClose: function() {
    this.props.handleClose();
  }
});

module.exports = Task;
