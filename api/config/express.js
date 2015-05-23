var bodyParser = require('body-parser'),
    logger = require('morgan'),
	passport = require('passport');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(passport.initialize());
    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
};