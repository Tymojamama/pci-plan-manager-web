var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function (app) {
	app.use(session({
		secret: "x93nsden29cvy26dkvnzdfi2jedfhv823nf",
		resave: false,
		saveUninitialized: true,
		cookie: {
			//secure: true, // only for https sites
			maxAge: 365 * 24 * 60 * 60 * 1000, // one year
		},
	    store: new MongoStore({
	        url: 'mongodb://172.31.40.128/session'
	    }),
	}));
}
