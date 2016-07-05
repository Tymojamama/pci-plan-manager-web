var React = require('react');
var Style = require('./Style.jsx');
var Item = require('./Item.jsx');
var Griddle = require('griddle-react');
var Button = require('../Button/Index.jsx');
var Form = require('../Form/Index.jsx');

var columnMeta = [
  {
    "columnName": "checklistId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "itemIndex",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Label",
    "order": 1,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "Response",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Component = React.createClass({
  getInitialState: function () {
    return {
      item: -1,
    }
  },

  render: function () {
    if (this.state.item !== -1) {
      return (
        <div>
          <Form.Label label={"Selected Item"} />
          {this.getItem()}
        </div>
      )
    }

    return (
      <div>
        <Form.Label label={"Items"} />
        <Button.Primary
          label={"New"}
          onClick={this.handleClick_New} />
    		<div style={{marginBottom:"15px"}} />
        <Griddle
          results={this.getGriddleData()}
          columnMetadata={columnMeta}
          columns={["Label","Response"]}
          resultsPerPage={20}
          onRowClick={this.handleClick_Row} />
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    var checklist = this.props.checklist;
    var items = checklist.items;
    if (!items) { items = []; }
		items.map(function (item,i) {
      result.push({
        "checklistId": checklist._id,
        "itemIndex": i,
        "Label": item.label,
        "Response": item.response,
      });
		}.bind(this));
    return result;
  },

  getItem: function () {
    var items = this.props.checklist.items;
    if (!items) { items = []; }
    return items.map(function (item,i) {
      if (i !== this.state.item) { return; }
      var handleChange_Item = function (item) {
        var items = this.props.checklist.items;
        items[i] = item;
        this.props.onChange(items);
      }.bind(this);
      var handleClick_Submit = function () {
        this.setState({item:-1});
      }.bind(this);
      var handleClick_Delete = function () {
        var items = this.props.checklist.items;
        items.splice(i,1);
        this.props.onChange(items);
        this.setState({item:-1});
      }.bind(this);
      return (
        <div>
          <Item
            item={item}
            onChange={handleChange_Item} />
          <div style={{marginTop:"15px"}}>
            <Button.Primary
              label={"Submit"}
              onClick={handleClick_Submit} />
            <span style={{display:"inline-block",width:"10px"}} />
            <Button.Danger
              label={"Delete"}
              onClick={handleClick_Delete} />
          </div>
        </div>
      )
    }.bind(this));
  },

  handleClick_Row: function (gridRow, event) {
    this.setState({
      item: gridRow.props.data.itemIndex,
    });
  },

  handleClick_New: function () {
    var items = this.props.checklist.items;
    var newIndex = items.length;
    items.push({
      label: '',
      response: '',
    });
    this.setState({
      item: newIndex,
    });
    this.props.onChange(items);
  },
});

module.exports = Component;
