var passport = require('passport'),
    passportLocal = require ('passport-local').Strategy,
    User = require('../models/User'),
    strategyOption = {
        usernameField: 'email',
        passwordField: 'password'
    };

module.exports = function() {

    passport.use('local-login', new passportLocal(strategyOption, function (email, password, done) {
        var searchedUser = {
            email: email
        };

        User.findOne(searchedUser, function (err, user) {
            if (err) return done (err);

            if (!user) return done (null, false, {
                message: 'User do not exist!'
            });

            user.comparePassword(password, function(err, isMatch) {
                if (err) return done (err);

                if (!isMatch) return done (null, false, {
                    message: 'Wrong Email / Password Combination'
                });

                return done (null, user);
            });
        });
    }));

    passport.use('local-register', new passportLocal (strategyOption, function (email, password, callback) {
        var searchedUser = {
            email: email
        };
        User.findOne(searchedUser, function (err, user) {
            if (err) return callback (err);
            //console.log(user);
            if (user) return callback (null, false, {
               message: 'User do exist!'
            });

            var newUser = new User({
                email: email,
                password: password
            });
            newUser.save(function (err) {
                if(err) console.log('hi');
                callback (null, newUser);
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};