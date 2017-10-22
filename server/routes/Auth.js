var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var sha512 = require('sha512');


router.post('/login',function(req, res){
  var body = req.body;
  var email = body.email,
    password = body.password;

  Auth.login(email, password, function(err, result){
    var isEmpty = Object.keys(result).length === 0;
    if(err) res.json(err);
    if(isEmpty) {
      res.status(404).json("No User found");
    } else {
      res.status(200).json(result);
    }

  });
});

router.put('/register', function(req, res) {
  var body = req.body;
  var email = body.email,
    password = body.password,
    team = body.team;

  Auth.register(email, password, team, function(err, result) {
    if(err) { res.json(err) }
    else { res.json(result) }
  });
});

router.get('/logout', function(req, res) {
  var token = generate_token(8);
  res.set('X-Auth-Token', token);
});

function generate_token(length){
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i=0; i<length; i++) {
    var j = (Math.random() * (a.length-1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

module.exports = router;


