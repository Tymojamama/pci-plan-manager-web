var http = require('http');

var settings = require('./settings');

function Authenticator() {
  this.callback;
  this.requestOptions = {};
  this.chunks;
  this.settings = new settings();

  this.httpOnData = function(chunk) {
    if (!this.chunks) {
      this.chunks = chunk;
    } else {
      this.chunks += chunk;
    }
  }

  this.httpOnEnd = function() {
    if (!this.chunks) {
      return this.callback({});
    } else {
      return this.callback(this.chunks);
    }
  }

  this.genereateHttpRequest = function() {
      this.httpRequest = http.request(this.requestOptions, function(res) {

        res.setEncoding('utf8');

        res.on('data', function(chunk) {
          this.httpOnData(chunk);
        }.bind(this));

        res.on('error', function(error) {
          console.log("Error executing plan manager service:", error.message);
        }.bind(this));

        res.on('end', function() {
          console.log('end');
          this.httpOnEnd();
        }.bind(this));

      }.bind(this));

      this.httpRequest.end();
    },

    // authenticates and gets access token
    this.login = function(options, callback) {
      console.log(this.settings.host + ":" + this.settings.port + "/login")
      this.requestOptions = {
        host: this.settings.host,
        port: this.settings.port,
        path: '/login',
        method: 'POST',
        headers: {
          'email': options.email,
          'password': options.password
        }
      };
      this.callback = callback;

      this.genereateHttpRequest();
    }
}

module.exports = Authenticator;
