var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var Payment = require('../models/Payment');
var bcrypt = require('bcrypt');
var Response2JSON = require('../Response2JSON');
var stripe = require('stripe')('sk_test_R2b21EnvL5TS0vI4bhkft3Kc');

var jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/auth', function (req, res, next) {
  var body = req.body;
  var email = body.email,
    password = body.password;

  Auth.login(email, password, function (err, result) {
    var isEmpty = Object.keys(result).length === 0;
    var json = Response2JSON.JSONFY(result);
    if (err) res.json(err);
    if (isEmpty) {
      res.status(404).json(
        {
          error: {
            userMessage: "Falsches Passwort oder Email.",
            internalMessage: err,
            code: 1
          }
        });
    } else if (!isEmpty && password) {
      bcrypt.compare(password, json[0].password, function (err, response) {
        if (response) {
          var token = jwt.sign({
            email: json[0].email
          }, 'y&6GEQxQ+P=r)+Zyve2&,C>^ILaSBxUbQ|!:aVs|ffM@%@Tc5#i}&be/5sAg/Jux');
          Auth.setToken(json[0].uuid, token, function (err, result) {
            if (err) {
              res.json(err)
            } else {
              res.json({
                token: token
              });
            }
          })
        } else {
          res.status(500).json(
            {
              error: {
                userMessage: "Falsches Passwort oder Email.",
                message: err,
                code: 2
              }
            });
        }
      });
    } else {
      res.status(500).json(
        {
          error: {
            userMessage: "Sie haben das Passwort vergessen.",
            message: err,
            code: 3
          }
        });
    }

  });
});

router.get('/auth/token', function(req,res,next) {
  var token = jwt.sign({
    email: req.query.email
  }, 'y&6GEQxQ+P=r)+Zyve2&,C>^ILaSBxUbQ|!:aVs|ffM@%@Tc5#i}&be/5sAg/Jux');
  res.json(token);
});

router.post('/register', function (req, res) {
  var body = req.body;
  var email = body.email,
    password = body.password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      Auth.register(email, hash, function (err, result) {
        if (err) {
          res.json({
            error: {
              userMessage: "Bei der Registrierung ist etwas schief gelaufen.",
              message: err,
              code: 5
            }
          })
        } else {
          stripe.customers.create({
            email: email
          }, function (err, customer) {
            if (err) return res.status(500).json(err);
            Payment.saveCustomerToken(customer.id, email, function (err, result) {
                if (err) res.status(500).json({
                  error: {
                    userMessage: "Bei der Registrierung ist etwas schief gelaufen.",
                    message: "Error saving customer token.",
                    code: 5
                  }
                });
              })
            });
          res.json(result)
        }
      });
    });
  });
});

router.post('/logout', function (req, res) {
  return res.json({
    success: true,
    message: 'Logged out'
  })
});

module.exports = router;


