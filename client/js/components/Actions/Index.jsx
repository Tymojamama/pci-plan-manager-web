var React = require('react');
var S = require('string');
var Style = require('./Style.jsx');

var ActionStore = require('../../stores/ActionStore');

var LinkItem = require('../Navigation/LinkItem.jsx');
var Spacer = require('../Navigation/Spacer.jsx');
var Header = require('../Navigation/Header.jsx');

function getState(callback) {
    var _actions = [];
    _actions[0] = {
        _id: '1',
        name: 'Modify named plan fiduciary',
        pages: [
            {
                header: 'Page 1',
                body: 'This is some body text',
                commands: [
                    {
                        name: 'Create task',
                        target: 'localhost/stores/task',
                        method: 'POST',
                        body: '{name:"Test Task",description:"Do this task",ownerId:"__USERID__"}',
                        runAsynchronously: true,
                    }
                ]
            }
        ]
    };
    _actions[1] = {
        _id: '2',
        name: 'Hire a service provider',
    };
    _actions[2] = {
        _id: '3',
        name: 'Modify investment line-up',
    };
    _actions[3] = {
        _id: '4',
        name: 'Prepare for an audit',
    };
    _actions[4] = {
        _id: '5',
        name: 'Handle a participant complaint',
    };
    _actions[5] = {
        _id: '6',
        name: 'Potato',
    };
    _actions[6] = {
        _id: '7',
        name: 'Pasta',
    };
    ActionStore.get(function (docs) {
        callback({ actions: docs });
    });
}

function createComponentIncreaseTopN (state, handleClick) {
    if (state.topN >= state.actions.length) {
        return;
    }

    return (
        <div style={{marginBottom:"5px"}}>
            <div style={{color:"#f1f4f6",textDecoration:"none",display:"block",width:"100%",whiteSpace:"normal"}} onClick={handleClick}>
                <div style={{color:"rgb(241, 244, 246)",fontSize: "14px",padding:"20px 10px",marginBottom: "5px",width: "100%",textAlign:"left",whiteSpace:"normal",backgroundColor: "rgb(34, 34, 34)"}} className="btn btn-link">
                    {"➕ Load More"}
                </div>
            </div>
        </div>
    )
}

function createNavigationItemComponents (state) {
    if (!state.actions || state.actions.length === 0){
        return;
    }
    return state.actions.slice(0,state.topN).map(function (action) {
        return (
            <LinkItem
                key={action._id}
                label={"🔨 " + action.name}
                link={window.location.pathname + "?action=" + action._id}
                backgroundColor="#222222"
                backgroundColorHover="#0d0d0d"
            />
        );
    });
}

var ActionSettings = React.createClass({
    getInitialState: function () {
        return {
            actions: '',
            topN: '',
        }
    },

    componentWillMount: function () {
        getState(function (state) {
            this.setState({
                actions: state.actions,
                topN: 5,
            });
        }.bind(this));
    },

    render: function () {
        if (this.props.options && this.props.options.isComponent === true) {
            return (
                <div>
                    <Header label={"🔨 Actions"} />
                    <div style={{marginBottom:"5px"}}>
                        <input type="text" placeholder="🔎 Search for an action" style={{padding:"5px",width:"100%"}} onChange={this.handleChangePlanSearch} />
                    </div>
                    {createNavigationItemComponents(this.state)}
                    {createComponentIncreaseTopN(this.state, this.handleClickIncreaseTopN)}
                </div>
            )
        }

        return (
            <div style={{paddingTop:"60px"}} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <Header label={"🔨 Actions"} />
                <div style={{marginBottom:"5px"}}>
                    <input type="text" placeholder="🔎 Search for an action" style={{padding:"5px",width:"100%"}} onChange={this.handleChangePlanSearch} />
                </div>
                {createNavigationItemComponents(this.state)}
                {createComponentIncreaseTopN(this.state, this.handleClickIncreaseTopN)}
            </div>
        )
    },

    handleChangePlanSearch: function (event) {
        getState(function (state) {

            if (S(event.target.value).isEmpty()) {
                return this.setState(state);
            }

            var _actions = [];

            for (var i = 0; i < state.actions.length; i++) {
                if (S(state.actions[i].name.toUpperCase()).contains(event.target.value.toUpperCase())) {
                    _actions.push(state.actions[i]);
                }
            }

            this.setState({
                actions: _actions,
                topN: this.state.topN,
            });

        }.bind(this));
    },

    handleClickIncreaseTopN: function () {
        this.setState({
            actions: this.state.actions,
            topN: this.state.topN + 5,
        })
    }
});

module.exports = ActionSettings;
