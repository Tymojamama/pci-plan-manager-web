var React = require('react');
var Griddle = require('griddle-react');

var MeetingsData = [{
	"Subject": "Initial Discussion",
	"Start Time": "April 26, 2016 5:00 PM",
	"Members": "Todd, Zach, Kyle",
}, {
	"Subject": "Another Conversation",
	"Start Time": "June 21, 2016 3:30 PM",
	"Members": "Todd, Kyle",
}, {
	"Subject": "Final Decision",
	"Start Time": "September 13, 2016 2:00 PM",
	"Members": "Todd, Kyle",
}];

var Meetings = React.createClass({
	render: function () {
		return (
			<div>
				<Griddle results={MeetingsData} />
			</div>
		)
	}
});

module.exports = Meetings;