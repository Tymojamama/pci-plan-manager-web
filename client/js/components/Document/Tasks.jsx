var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Griddle = require('griddle-react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;

var Component = React.createClass({
  render: function () {
    return (
      <div>
        <h3 style={{margin:"25px 0px"}}>Tasks</h3>
        <Griddle
          results={this.getGriddleData()}
          columnMetadata={this.getColumnMetadata()}
          columns={["taskId"]}
          resultsPerPage={20}
          onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getColumnMetadata: function () {
    var meta = [];
    meta.push({
      "columnName": "taskId",
      "order": 1,
      "locked": false,
      "visible": true,
    });
    return meta;
  },

  getGriddleData: function () {
    var result = [];
		this.props.doc.tasks.map(function (task) {
      result.push({
        "taskId": task.taskId,
      });
		});
    return result;
  },

  handleClick_Row: function (gridRow, event) {
    browserHistory.push("/?action=open-task&id=" + gridRow.props.data.taskId);
  },
});

module.exports = Component;
