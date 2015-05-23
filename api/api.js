var express = require ('express'),
    config = require ('./config/config')['dev'],
    app = express();

// Express Application middleware
require('./config/express')(app);

// Mongoose Configuration
require('./config/mongoose')(config);

// Passport Configuration
require('./config/passport')();

// Express routes
require('./config/routing')(app);

// Email Verification
require('./services/emailVerification');

var server = app.listen(config['port'], function(){
   console.log('api listening on : ' + config['port']);
});