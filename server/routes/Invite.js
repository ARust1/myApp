var express = require('express');
var router = express.Router();
var Invite = require('../models/Invite');
var Response2JSON = require('../Response2JSON');

router.get('/:team_id?',function(req, res, next) {
    Invite.getInvites(req.params.team_id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json);

    });
});

router.post('/', function(req, res, next) {
  var team_id = req.body.team_id,
    user_id = req.body.user_id;

  Invite.sendInvite(team_id, user_id, function(err, results) {
    if(err) return res.json(err);
    if(results.length !== 0) {
      res.json(results[0]);
    }
  });
});

module.exports = router;
