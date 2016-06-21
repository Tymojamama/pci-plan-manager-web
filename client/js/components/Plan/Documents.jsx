var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Griddle = require('griddle-react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Index = require('./Index.jsx');
var DocumentActions = require('../../actions/DocumentActions');
var DocumentStore = require('../../stores/DocumentStore');

var DocumentUploader = React.createClass({
	getInitialState: function () {
		return {
			id:'',
		}
	},

	componentWillMount: function () {
		this.setState({
			id: Math.floor(Math.random() * 1000000000),
		});
	},

  componentDidMount: function () {
    var onUpload = this.props.onUpload;
		var inputId = "document-form-file"+ "-" + this.state.id;
    $("#document-form" + "-" + this.state.id).on('submit', function (e) {
			var fullPath = document.getElementById(inputId).value;
			var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	    var filename = fullPath.substring(startIndex);
	    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
	        filename = filename.substring(1);
	    }
      e.preventDefault();
      //var formData = new FormData($('#member-image-form'));
      var formData = new FormData(this);
      $.ajax({
        type:'POST',
        url: '/docs/s3/',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.success === true) {
            onUpload(filename, data.path);
          } else {
            alert(data.message);
          }
        },
        error: function (data) {
          console.log("error");
          console.log(data);
        },
      });
    });

    $("#document-form-file"+ "-" + this.state.id).on("change", function() {
			$("#document-form"+ "-" + this.state.id).submit();
    }.bind(this));
  },

	componentWillUnmount: function () {
		$("#document-form-file"+ "-" + this.state.id).off("change");
	},

  render: function () {
	  return (
	    <form
	      id={"document-form" + "-" + this.state.id}
	      encType="multipart/form-data">
				<label>
					Upload a new document
				</label>
	      <input
	        id={"document-form-file"+ "-" + this.state.id}
	        name="file"
	        type="file" />
	      <input
	        id={"document-form-submit"+ "-" + this.state.id}
	        style={{display:"none"}}
	        type="submit"
	        name="upload"
	        value="Upload" />
	    </form>
	  )
  },
});

var columnMeta = [
  {
    "columnName": "taskId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "documentId",
    "locked": true,
    "visible": false,
  }, {
    "columnName": "Name",
    "order": 1,
    "locked": false,
    "visible": true,
  }, {
    "columnName": "ModifiedOn",
    "order": 2,
    "locked": false,
    "visible": true,
  }
];

var Component = React.createClass({
  getInitialState: function () {
    return {
      documents: [],
    }
  },

	componentWillMount: function () {
		DocumentStore.get(function (documents) {
      documents = documents.filter(function (doc) {
        return doc.planId == this.props.params.id;
      }.bind(this));
			this.setState({
				documents: documents,
			});
		}.bind(this));
	},

	componentWillReceiveProps: function (props) {
		this.componentWillMount();
	},

  componentDidMount: function() {
    DocumentStore.addChangeListener(this.handleChange_DocumentStore);
  },

  componentWillUnmount: function() {
    DocumentStore.removeChangeListener(this.handleChange_DocumentStore);
  },

  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
    			<DocumentUploader onUpload={this.handleUpload_DocumentUploader} />
    			<div style={{marginBottom:"15px"}} />
    			<Griddle
    				results={this.getGriddleData()}
    				columnMetadata={columnMeta}
    				columns={["Name","ModifiedOn"]}
    				resultsPerPage={20}
    				onRowClick={this.handleClick_Row} />
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
		this.state.documents.map(function (doc) {
      result.push({
        "documentId": doc._id,
        "Name": doc.name,
        "ModifiedOn": moment(doc.modifiedOn).format("MM/DD/YYYY h:mm a"),
      });
		}.bind(this));
    return result;
  },

  handleClick_Row: function (gridRow, event) {
		browserHistory.push("/document/" + gridRow.props.data.documentId);
  },

  handleChange_DocumentStore: function () {
    this.componentWillMount();
  },

	handleUpload_DocumentUploader: function (name,path) {
		var doc = {};
		doc.name = name;
		doc.path = path;
    doc.planId = this.props.params.id;
		doc.tasks = [];
		DocumentActions.create(doc);
	},
});

module.exports = Component;
