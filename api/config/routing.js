var passport = require('passport'),
    tokenPasser = require('./utils/tokenPasser'),
    facebookAuth = require('../services/facebookAuth'),
    googleAuth = require("../services/googleAuth"),
    emailVerification = require('../services/emailVerification'),
    jobs = require("../services/Jobs");

module.exports = function(app){
    // Registration EndPoint
    app.post('/register', passport.authenticate('local-register'), function (req, res){
          tokenPasser.createToken(req.user, res);
    });

    //Login EndPoint
    app.post('/login', passport.authenticate('local-login'), function (req, res) {
        emailVerification.send(req.user.email);
        tokenPasser.createToken(req.user, res);
    });

    app.post('/auth/verifyemail', emailVerification.handler);
    //Google Auth code EndPoint
    app.post('/auth/google', googleAuth);

    //Facebook Auth code EndPoint
    app.post('/auth/facebook', facebookAuth);

    //Jobs EndPoint
    app.get('/jobs', jobs);
};
