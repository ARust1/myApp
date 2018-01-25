var express = require('express');
var router = express.Router();
var PushToken = require('../models/PushToken');
var Response2JSON = require('../Response2JSON');

router.get('/:user_id?', function (req, res, next) {
  if(req.params.user_id) {
    PushToken.getPushByUser(req.params.user_id, function(err, result) {
      var penaltyJSON = Response2JSON.JSONFY(result);
      if (err) return res.json(err);
      res.json(penaltyJSON);
    });
  }
  if(req.query.team_id) {
    PushToken.getPushByTeam(req.query.team_id, function(err, result) {
      var penaltyJSON = Response2JSON.JSONFY(result);
      if (err) return res.json(err);
      res.json(penaltyJSON);
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
