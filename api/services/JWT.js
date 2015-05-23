var crypto = require('crypto');

exports.encode = function (payload, secret) {
    algorithm = 'HS256';

    var header = {
        type: 'JWT',
        algo: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    return jwt + '.' + sign(jwt, secret);
};

exports.decode = function (token, secret){
  var segment = token.split('.');
    if(segment.length !== 3){
        throw new Error('Token structure incorrect');
    }

    var header = JSON.parse(base64decode(segment[0]));
    var payload = JSON.parse(base64decode(segment[1]));

    var raw = segment[0] + '.' + segment[1];
    if(!verifySignature(raw, secret, segment[2]))
        throw new Error('Verification Failed');

    return payload;
};

function sign(str, key){
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str){
    return new Buffer(str).toString('base64');
}

function base64decode(str){
    return new Buffer(str, 'base64').toString();
}

function verifySignature(raw, secret, incSign){
    return incSign == sign(raw, secret);
}