var express = require('express');
var router = express.Router();
var PushToken = require('../models/PushToken');
var Response2JSON = require('../Response2JSON');

router.get('/:user_id?', function (req, res, next) {
  if(req.params.user_id) {
    var response = null;
    var tokenArr = [];
    PushToken.getPushTokenByUser(req.params.user_id, function(err, result) {
      if(result) {
        result.forEach(tokenObj => {
          tokenArr.push(tokenObj.token);
        });
        res.json(tokenArr);
      } else {
        return res.json(err);
      }
    });
  }
  if(req.query.team_id) {
    var response = null;
    var tokenArr = [];
    PushToken.getPushTokenByTeam(req.query.team_id, function(err, result) {
      if(result) {
        result.forEach(tokenObj => {
          tokenArr.push(tokenObj.token);
        });
        res.json(tokenArr);
      } else {
        return res.json(err);
      }
    });
  }
  if(req.query.team_admin) {
    var response = null;
    var tokenArr = [];
    PushToken.getTokenOfTeamWalletManager(req.query.team_admin, function(err, result) {
      if(result) {
        result.forEach(tokenObj => {
          tokenArr.push(tokenObj.token);
        });
        res.json(tokenArr);
      } else {
        return res.json(err);
      }
    });
  }
  if(req.query.stripeToken) {
    var response = null;
    var tokenArr = [];
    PushToken.getTokenOfUserByStripeToken(req.query.stripeToken, function(err, result) {
      if(result) {
        result.forEach(tokenObj => {
          tokenArr.push(tokenObj.token);
        });
        res.json(tokenArr);
      } else {
        return res.json(err);
      }
    });
  }
});

router.post('/', function (req, res, next) {
  PushToken.addPushToken(req.body, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});


module.exports = router;
