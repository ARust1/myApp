var express = require('express');
var router = express.Router();
var Team = require('../models/Team');
var User = require('../models/User');
var Payment = require('../models/Payment');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');
var stripe = require('stripe')('sk_test_tuvyZ0uIGcY61cYKLLsqkrUu');

router.get('/:id?',function(req, res, next) {
  if(req.params.id){
    Team.getTeamById(req.params.id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);

    });
  } else {
    if (req.query.invite_token) {
      Team.getTeamByInviteToken(req.query.invite_token, function(err, rows) {
        var json = Response2JSON.JSONFY(rows);
        if(err) return res.json(err);
        res.json(json[0]);
      });
    } else {
      Team.getAllTeams(function(err,rows){
        var json = Response2JSON.JSONFY(rows);
        if(err) return res.json(err);
        res.json(json);
      });
    }
  }
});

router.post('/', function(req, res, next) {
  var name = req.body.name,
    owner_id = req.body.owner_id,
    team_logo = req.body.team_logo;
  var uuid = uid();
  Team.createTeam(uuid, owner_id, name,team_logo, function(err, results) {
    if(err) return res.json(err);
    if(results.length !== 0) {
      stripe.accounts.create({
        country: "DE",
        type: "custom"
      }, function(err, result) {
        var stripeToken = result.id;
        if(err) {
          return res.json(err);
        } else {
          Payment.saveTeamStripeToken(result.id, uuid, function(err, result) {
            if(err) return res.json(err);
            res.json({
              stripeToken: stripeToken,
              team_id: uuid
            });
          })
        }
      });
    }
  });
});

router.put('/invite_token', function(req, res, next) {
    var team_id = req.body.team_id;
    var invite_token = generateInviteToken();
    Team.setInviteToken(invite_token, team_id, function(err, result) {
      if(err) return res.json(err);
      res.json(invite_token);
    })
});

router.put('/:id/teamLogo', function(req, res) {
  Team.saveImgUrl(req.params.id, req.body.team_logo, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/:id/balance', function(req, res, next) {
  var uuid = req.params.id;
  var amount = req.body.amount;
  console.log(amount);

  Team.updateTeamBalance(uuid, amount, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

function generateInviteToken() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = router;
