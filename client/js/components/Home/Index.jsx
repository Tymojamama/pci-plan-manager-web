var React = require('react');

var Style = require('./Style.jsx');

var Actions = require('../Actions/Index.jsx');
var ComplianceCalendar = require('../ComplianceCalendar/Index.jsx');
var Dashboard = require('../Dashboard/Index.jsx');
var Feed = require('../Feed/Index.jsx');
var Navigation = require('./Navigation.jsx');
var IndustryUpdates = require('../IndustryUpdates/Index.jsx');
var ComplianceCalendar = require('../ComplianceCalendar/Index.jsx');

var HomePage = React.createClass({
    componentDidMount: function () {
        window.scrollTo(0, 0);
    },

    render: function(){
        return (
            <div style={Style.headerPadding}>
                <div id="home-dashboard" className="row-fluid" style={{display:"none"}}>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                        <Dashboard />
                    </div>
                </div>
                <div className="row-fluid">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                        <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
                            <Navigation />
                        </div>
                        <div className="row-fluid">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{padding:"0",margin:"0"}}>
                                <div className="col-lg-8 col-md-8">
                                    <Feed />
                                </div>
                                <div className="col-lg-4 col-md-4 hidden-sm hidden-xs">
                                	<Actions options={{isComponent:true}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;
