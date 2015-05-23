var  request = require('request'),
     CONFIG = require('./config'),
     User = require('../models/User.js');

module.exports = function(req, res, next) {
    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret:CONFIG.GOOGLE_SECRET
    };
    request.post(url, {
        json: true,
        form: params
    }, function (err, response, token) {
        var access_token = token.access_token;
        var header = {
            Authorization: 'Bearer ' + access_token
        };
        request.get({
            url: apiUrl,
            headers: header,
            json: true
        }, function (err, response, profile) {
            console.log(profile.email);
            console.log(profile);
            User.findOne({googleId: profile.sub}, function (err, foundUser) {
                if (foundUser) return tokenPasser.createToken(foundUser, res);

                var newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    if (err) return next(err);
                    tokenPasser.createToken(newUser);
                })
            })
        });
    });
//console.log(req.body.code);
};