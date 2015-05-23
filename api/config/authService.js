var passport = require('passport'),
    tokenPasser = require('./utils/tokenPasser');

exports.logIn = function(req, res, next){
    var logIn = passport.authenticate('local-login', function (err, user) {
        if (err) next(err);
        req.logIn(user, function(err){
            if (err) next(err);
            tokenPasser.createToken(user, res);
        });
    });

    logIn(req, res, next);
};