var express = require('express');
var router = express.Router();
var Penalty = require('../models/Penalty');
var User = require('../models/User');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

router.get('/:team_id?', function (req, res, next) {
  if(req.params.team_id) {
    Penalty.getPenaltiesByTeam(req.params.team_id, function(err, result) {
      var penaltyJSON = Response2JSON.JSONFY(result);
      if (err) return res.json(err);
      res.json(penaltyJSON);
    });
  }
  if(req.query.user_id) {
    Penalty.getPenaltyByUserId(req.query.user_id, function(err, result) {
      var penaltyJSON = Response2JSON.JSONFY(result);
      if (err) return res.json(err);
      res.json(penaltyJSON);
    });
  }

});


router.post('/', function (req, res, next) {
  var uuid = uid();
  Penalty.addPenalty(uuid, req.body, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.delete('/:uuid', function (req, res, next) {
  Penalty.deletePenalty(req.params.uuid, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/payment/:id', function(req, res, next) {
  var date = new Date();
  var uuid = req.params.id,
    paymentMethod = req.body.payment_method;

  Penalty.setPenaltyPayment(uuid, paymentMethod, date, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

router.put('/acceptPayment/:id', function(req, res, next) {
  var uuid = req.params.id;

  Penalty.acceptPayment(uuid, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

module.exports = router;
