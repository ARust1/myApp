var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var User = require('../models/User');

var jwt = require('jsonwebtoken');

router.post('/auth', function(req, res, next){
  var body = req.body;
  var email = body.email,
    password = body.password;

  Auth.login(email, password, function(err, result){
    var isEmpty = Object.keys(result).length === 0;
    var json = JSONFY(result);
    if(err) res.json(err);
    if(isEmpty) {
      res.status(404).json(
        {
          success : false,
          message: "Authentication failed. User not found."
        });
    } else if (!isEmpty) {
      if(password !== json[0].password) {
        res.status(500).json(
          {
            success : false,
            message: "Authentication failed. Wrong password."
          });
      } else {
        var token = jwt.sign({
          email: json[0].email
        }, 'y&6GEQxQ+P=r)+Zyve2&,C>^ILaSBxUbQ|!:aVs|ffM@%@Tc5#i}&be/5sAg/Jux');
        console.log(token);
        res.status(200).json({
          data: json[0],
          success: true,
          token : token
        });
      }
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

router.post('/logout', function(req, res) {
  return res.json({
    success: true,
    message: 'Logged out'
  })
});

function JSONFY(result) {
  var string = JSON.stringify(result);
  return JSON.parse(string);
}

module.exports = router;


