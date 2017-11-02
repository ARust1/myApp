var express = require('express');
var router = express.Router();
var Team = require('../models/Team');
var User = require('../models/User');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

router.get('/:id?',function(req, res, next) {
  if(req.params.id){
    Team.getTeamById(req.params.id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);

    });
  } else {
    Team.getAllTeams(function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);
    });
  }
});

router.post('/', function(req, res, next) {
  var name = req.body.name,
    owner_id = req.body.owner_id;
  var uuid = uid();
  Team.createTeam(uuid, owner_id, name, function(err, results) {
    if(err) return res.json(err);
    if(results.length !== 0) {
      res.json(results[0]);
    }
  });
});

module.exports = router;
