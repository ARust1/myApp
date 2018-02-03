var express = require('express');
var router = express.Router();
var Auth = require('../models/Auth');
var Payment = require('../models/Payment');
var bcrypt = require('bcrypt');
var Response2JSON = require('../Response2JSON');
const nodemailer = require('nodemailer');
var stripe = require('stripe')('sk_test_tuvyZ0uIGcY61cYKLLsqkrUu');

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
          stripe.accounts.create({
            country: "DE",
            type: "custom"
          }, function(err, result) {
            console.log(result.id);
            if(err) {
              return res.json(err);
            } else {
              console.log(result);
              Payment.saveCustomerToken(result.id, email, function(err, result) {
                if(err) return res.json(err);
                res.json();
              })
            }
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

/**
 * Gets the validation status of registered user
 */
router.get('/auth/:id/validation', function (req, res) {
  Auth.getValidationStatus(req.params.id, function (err, result) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result[0]);
  })
});

/**
 * Sets the validation status of registered user
 */
router.patch('/auth/:id/validation', function (req, res) {
  Auth.validate(req.params.id, function (err, result) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
});

/**
 * Gets the validation code of registered user
 */
router.get('/auth/:id/validationCode', function (req, res) {
  Auth.getValidationCode(req.params.id, function (err, result) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(result[0]);
  })
});

/**
 * Sets the validation code of registered user, 
 * Sends an email with validation code to given email adress
 */
router.patch('/auth/:id/validationCode', function (req, res) {
  var valCode = generateValidationCode();
  var email = req.body.email;
  Auth.setValidationCode(req.params.id, valCode, function (err, result) {
    if(err) return res.status(500).json(err);
    nodemailer.createTestAccount((err, account) => {
      
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
              host: 'w014c5bb.kasserver.com',
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                  user: 'm04355e0', // generated ethereal user
                  pass: 'kot1234'  // generated ethereal password
              }
          });
      
          // setup email data with unicode symbols
          let mailOptions = {
              from: '"Mannschaftskasse ⚽" <noreplay@alexanderrust.de>', // sender address
              to: email, // list of receivers
              subject: 'Mannschaftskasse ⚽ Registrierungs Code', // Subject line
              html: 'Code: ' + valCode // html body
          };
      
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
      });
    return res.status(200).json(result);
  });
});

function generateValidationCode() {
  var text = "";
  var possible = "1234567890";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = router;


