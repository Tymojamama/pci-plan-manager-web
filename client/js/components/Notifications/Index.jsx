var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var TaskStore = require('../../stores/TaskStore');

var Notifications = React.createClass({
  getInitialState: function () {
    return {
      tasks: [],
    }
  },

  componentWillMount: function () {
    TaskStore.get(function (tasks) {
      var today = new Date();
      tasks = tasks.filter(function (task) {
        var dateDue = new Date(task.dateDue)
        return (
          dateDue <= today
          && task.status === "In Progress"
        );
      });
      var state = this.state;
      state.tasks = tasks;
      this.setState(state);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="hidden-lg hidden-md col-sm-12 col-xs-12">
          <div style={{
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
            padding: "0px",
            margin: "0px",
            width: "100%",
            boxShadow: "5px 5px 5px #888888"
          }}>
            <div style={{
              borderBottom: "1px solid #ccc"
            }}>
              <div style={{
                padding: "5px"
              }}>
                <span>
                  <b>Notifications</b>
                </span>
                <span style={{
                  float: "right",
                  cursor: "pointer"
                }} onClick={this.handleClickNotification}>
                  <div style={{
                    padding: "0px 5px 0px 5px"
                  }} onClick={this.props.handleClose}>x</div>
                </span>
              </div>
            </div>
            <div style={{
              maxHeight: "400px",
              overflowY: "auto"
            }}>
              {this.getNotificationItems()}
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 hidden-sm hidden-xs">
          <div className="col-lg-4 col-md-4"/>
          <div className="col-lg-4 col-md-4"/>
          <div className="hidden-lg col-md-1"/>
          <div className="col-lg-2 col-md-3" style={{
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
            padding: "0px",
            margin: "0px",
            boxShadow: "5px 5px 5px #888888"
          }}>
            <div style={{
              borderBottom: "1px solid #ccc"
            }}>
              <div style={{
                padding: "5px"
              }}>
                <span>
                  <b>Notifications</b>
                </span>
                <span style={{
                  float: "right",
                  cursor: "pointer"
                }} onClick={this.handleClickNotification}>
                  <div style={{
                    padding: "0px 5px 0px 5px"
                  }} onClick={this.props.handleClose}>x</div>
                </span>
              </div>
            </div>
            <div style={{
              maxHeight: "400px",
              overflowY: "auto"
            }}>
              {this.getNotificationItems()}
            </div>
          </div>
          <div className="col-lg-2 hidden-md"/>
        </div>
      </div>
    )
  },

  getNotificationItems: function () {
    return this.state.tasks.map(function (task) {
      var handleClick_Open = function () {
        browserHistory.push("/?action=open-task&id=" + task._id);
      };

      return (
        <div
          onClick={handleClick_Open}
          style={{
            borderBottom: "1px solid #ccc",
            cursor: "pointer"
          }}>
          <div
            style={{
              padding: "5px"
            }}>
            {"A task is past due: "}
            {task.name}
          </div>
        </div>
      )
    });
  },
});

module.exports = Notifications;
