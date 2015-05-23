 var jwt = require('jwt-simple'),
     moment = require('moment');

module.exports.createToken = function (user, res){
        var payload = {
            sub: user.id,
            exp: moment().add(10, 'days').unix()
        };
        var token = jwt.encode(payload, "cripx-x");

        res.status(200).send({
            user: user.toJSON(),
            token: token
        });
        res.end();
};