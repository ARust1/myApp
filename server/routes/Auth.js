var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var bcrypt = require('bcrypt');
var Response2JSON = require('../Response2JSON');

var jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/auth', function(req, res, next){
  var body = req.body;
  var email = body.email,
    password = body.password;

  Auth.login(email, password, function(err, result){
    var isEmpty = Object.keys(result).length === 0;
    var json = Response2JSON.JSONFY(result);
    if(err) res.json(err);
    if(isEmpty) {
      res.status(404).json(
        {
          success : false,
          message: "Authentication failed. User not found."
        });
    } else if (!isEmpty && password) {
      bcrypt.compare(password, json[0].password, function(err, response) {
        if(err) {
          res.status(500).json(
            {
              success : false,
              message: "Authentication failed. Wrong password."
            });
        } else {
          var token = jwt.sign({
            email: json[0].email
          }, 'y&6GEQxQ+P=r)+Zyve2&,C>^ILaSBxUbQ|!:aVs|ffM@%@Tc5#i}&be/5sAg/Jux');
          Auth.setToken(json[0].uuid, token, function(err, result) {
            if(err) {
              res.json(err)
            } else {
              res.json({
                token: token
              });
            }
          })

        }
      });
    } else {
      res.status(500).json(
        {
          success : false,
          message: "Authentication failed. No password given."
        });
    }

  });
});



router.put('/register', function(req, res) {
  var body = req.body;
  var email = body.email,
    password = body.password;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      Auth.register(email, hash, function(err, result) {
        if(err) {
          res.json(err)
        }
        else {
          res.json(result)
        }
      });
    });
  });
});

router.post('/logout', function(req, res) {
  return res.json({
    success: true,
    message: 'Logged out'
  })
});

module.exports = router;


