var React = require('react');
var Details = require('./Details.jsx');
var Tasks = require('./Tasks.jsx');
var Style = require('./Style.jsx');
var Label = require('../Form/Index.jsx').Label;
var Input = require('../Form/Index.jsx').Input;
var Button = require('../Button/Index.jsx');
var DocumentActions = require('../../actions/DocumentActions');
var DocumentStore = require('../../stores/DocumentStore');

var Component = React.createClass({
  getInitialState: function () {
    return {
      doc: {
        tasks: [],
        approvals: [],
      }
    }
  },

  componentWillMount: function () {
    DocumentStore.getOne(this.props.id, function (doc) {
      this.setState({
        doc: doc,
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-lg-8 col-xs-12 col-centered">
          <div>
            <h3 style={{margin:"5px 0px"}}>{this.state.doc.name}</h3>
            <a href={"/docs/s3/" + this.state.doc.path} target={"_blank"}>
              Download File
            </a>
          </div>
          <Details
            doc={this.state.doc}
            onChange={this.handleChange_Details} />
          <Tasks
            doc={this.state.doc}
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

  handleChange_Details: function (doc) {
    this.setState({doc:doc});
  },

  handleClick_Save: function () {
    if (!this.state.doc._id) {
      DocumentActions.create(this.state.doc);
      window.history.back();
    } else {
      DocumentActions.update(this.state.doc);
      window.history.back();
    }
  },

  handleClick_Cancel: function () {
    window.history.back();
  },

  handleClick_Delete: function () {
    DocumentActions.destroy(this.state.doc);
    window.history.back();
  },
});

module.exports = Component;
