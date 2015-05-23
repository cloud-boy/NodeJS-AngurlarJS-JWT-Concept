var request = require('request'),
    qs = require('querystring'),
    tokenPasser = require('../config/utils/tokenPasser'),
    config = require ('./config');
    User = require ('../models/User');

module.exports = function (req, res) {
    var accesstokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    };

    request.get({url: accesstokenUrl, qs: params}, function (err, response, accessToken) {
        console.log(accessToken);
        accessToken = qs.parse(accessToken);
        console.log(accessToken);
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            User.findOne({facebookId:profile.id}, function (err, existUser) {
                if (existUser){
                    return tokenPasser.createToken(existUser, res);
                }

                var newUser = new User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    tokenPasser.createToken(newUser, res);
                })

            })

        })
    })

}