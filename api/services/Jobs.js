var jwt = require('jwt-simple');

module.exports = function(req, res){

    if(!req.headers.authorization){
        return res.status(401).send({messsge:'You\'r not Authorized'});
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, "cripx-x");
    if(!payload.sub){
        res.status(401).send({message:'You\'r not Authorized'});
    }

    res.status(200).send(jobs);
};

var jobs = [
    'Cook',
    'Programer',
    'Designer',
    'PM',
    'CM'];