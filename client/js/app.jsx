var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;

var Header = require('./components/Header/Index.jsx');
var Footer = require('./components/Footer/Index.jsx');
var FiduciaryOversight = require('./components/FiduciaryOversight/Index.jsx');
var FiduciaryOversightHome = require('./components/FiduciaryOversight/Home.jsx');
var FiduciaryOversightInvestments = require('./components/FiduciaryOversight/Investments.jsx');
var FiduciaryOversightVendors = require('./components/FiduciaryOversight/Vendors.jsx');
var FiduciaryOversightAdministration = require('./components/FiduciaryOversight/Administration.jsx');
var Navigation = require('./components/Home/Navigation.jsx');
var Home = require('./components/Home/Index.jsx');
var Login = require('./components/Login/Index.jsx');
var Profile = require('./components/Profile/Index.jsx');
var Actions = require('./components/Actions/Index.jsx');
var Plan = require('./components/Plan/Index.jsx');
var PlanSearch = require('./components/Plan/Search.jsx');
var PlanProfile = require('./components/Plan/Profile.jsx');
var PlanTerms = require('./components/Plan/Terms.jsx');
var PlanDocuments = require('./components/Plan/Documents.jsx');
var PlanSettings = require('./components/Plan/Settings.jsx');
var ActionSettings = require('./components/Settings/Actions.jsx');
var UserSettings = require('./components/Settings/UserSettings.jsx');
var TaskCategorySettings = require('./components/Settings/TaskCategorySettings.jsx');
var TaskTypeSettings = require('./components/Settings/TaskTypeSettings.jsx');
var Welcome = require('./components/Welcome/Index.jsx');
var Settings = require('./components/Settings/Index.jsx');

var MobileNavigation = React.createClass({
    render: function () {
        var headerSpacingStyle = {
            paddingTop: "60px"
        };
        return (
            <div style={headerSpacingStyle} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <Navigation />
            </div>
        );
    }
});

var App = React.createClass({
	render: function () {
		return (
			<div>
                <Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
});

var Routes = (
	 <Route path="/" component={App}>
    	<IndexRoute component={Home} />
        <Route path="fiduciary" component={FiduciaryOversight}>
            <IndexRoute component={FiduciaryOversightHome} />
            <Route path="investments" component={FiduciaryOversightInvestments} />
            <Route path="vendors" component={FiduciaryOversightVendors} />
            <Route path="administration" component={FiduciaryOversightAdministration} />
        </Route>
    	<Route path="welcome" component={Welcome} />
        <Route path="navigation" component={MobileNavigation} />
        <Route path="action" component={Actions} />
        <Route path="plan" component={PlanSearch} />
    	<Route path="plan/:id" component={Plan}>
    		<IndexRoute component={PlanProfile} />
    		<Route path="terms" component={PlanTerms} />
    		<Route path="documents" component={PlanDocuments} />
    		<Route path="settings" component={PlanSettings} />
    	</Route>
    	<Route path="home" component={Home} />
        <Route path="login" component={Login} />
        <Route path="profile" component={Profile} />
        <Route path="settings" component={Settings}>
            <IndexRoute component={UserSettings} />
            <Route path="action" component={ActionSettings} />
            <Route path="task-type" component={TaskTypeSettings} />
            <Route path="task-category" component={TaskCategorySettings} />
        </Route>
    </Route>
);

ReactDOM.render(
 	<Router history={browserHistory} routes={Routes} />,
	document.getElementById("container")
);
