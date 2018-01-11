var express = require('express');
var router = express.Router();
var Penalty = require('../models/Penalty');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

router.get('/:team_id', function (req, res, next) {
  Penalty.getPenaltiesByTeam(req.params.team_id, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
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

module.exports = router;
