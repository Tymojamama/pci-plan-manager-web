var React = require('react');
var Style = require('./Style.jsx');
var Details = require('./Details.jsx');
var Meetings = require('./Meetings.jsx');
var Documents = require('./Documents.jsx');
var Navigation = require('./Navigation.jsx');
var TaskNavigationStore = require('../../stores/TaskNavigationStore.js');

function getTaskNavigationState() {
  return {currentPage: TaskNavigationStore.getCurrentPage()}
}

var Task = React.createClass({
  getInitialState: function() {
    return {currentPage: ''}
  },

  componentWillMount: function() {
    this.setState(getTaskNavigationState());
  },

  componentDidMount: function() {
    TaskNavigationStore.addChangeListener(this.handleChange_TaskNavigationStore);
  },

  componentWillUnmount: function() {
    TaskNavigationStore.removeChangeListener(this.handleChange_TaskNavigationStore);
  },

  render: function() {
    return (
      <div style={Style.container} className="col-xs-12">
        <div className="col-md-3 hidden-sm hidden-xs">
          <Navigation currentPage={this.state.currentPage}/>
        </div>
        <div className="col-md-9 col-xs-12">
          {this.getCurrentComponent()}
        </div>
      </div>
    )
  },

  getCurrentComponent: function() {
    if (this.state.currentPage === TaskNavigationStore.getPages()[0]) {
      return <Details id={this.props.id} handleClose={this.props.handleClose}/>
    } else if (this.state.currentPage === TaskNavigationStore.getPages()[1]) {
      return <Meetings id={this.props.id} handleClose={this.props.handleClose}/>
    } else if (this.state.currentPage === TaskNavigationStore.getPages()[2]) {
      return <Documents id={this.props.id} handleClose={this.props.handleClose}/>
    }
  },

  handleChange_TaskNavigationStore: function() {
    this.setState(getTaskNavigationState());
  }
});

module.exports = Task;
