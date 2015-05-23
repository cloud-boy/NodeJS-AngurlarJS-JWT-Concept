//TODO: Complete the email notification

  var CONFIG = require ('./config') ,
    fs = require ('fs'),
    _  = require ('underscore'),
    User = require ('../models/User'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport(),
    jwt = require ('jwt-simple');


var model = {
    verfiyUrl: 'http://localhost:3000/auth/verifyemail?token=',
    title : 'psJwt',
    subtitle: 'Thankx for signing up !',
    body: 'Please verify your email address '
};

exports.send = function(email){
    var payload = {
        sub: email
    };
    var token = jwt.encode(payload, CONFIG.EMAIL_SECRET);
    transporter.sendMail({
        from: 'houssemzone@gmail.com',
        to: email,
        subject: 'Email Verification ',
        html: getHtml(token)
    }, function(err, info){
        if(err) return res.status(500, err);

        console.log("email sent", info.response);
    });
};

exports.handler = function (req, res) {
  var token = req.query.token;

  //console.log(token);
  var payload = jwt.decode(token, CONFIG.EMAIL_SECRET);
  var email = payload.sub;
  if(!email) handleError(res);
  User.findOne({email:email}).exec(function(err, user){
     if(err) return handleError(res);

  });
};


function getHtml(token){
    var path = "./views/emailVerification.html";
    var html = fs.readFileSync(path, encoding = 'utf8');
    var template = _.template(html);
    model.verfiyUrl += token;
    return template(model);
}

function handleError(res){
     return res.status(401).send({
         message: 'Auhentication has failed, unable to verify the email'
     });
}