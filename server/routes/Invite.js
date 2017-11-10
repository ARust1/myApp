var express = require('express');
var router = express.Router();
var Invite = require('../models/Invite');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

router.get('/:team_id?',function(req, res, next) {
    Invite.getInvites(req.params.team_id,function(err,rows){
        var json = Response2JSON.JSONFY(rows);
        if(err) return res.json(err);
        res.json(json);
    });
});

router.post('/request', function(req, res, next) {
  var team_id = req.body.team_id,
    user_id = req.body.user_id;
  var uuid = uid();

  Invite.sendInvite(uuid,team_id, user_id, function(err, results) {
    if(err) return res.status(500).json(err);
    if(results.length !== 0) {
      res.status(200).json(uuid);
    }
  });
});

router.put('/accept', function (req, res, next) {
  var team_id = req.body.team_id,
    user_id = req.body.user_id;

  Invite.acceptInvite(user_id, team_id, function(err, rows) {
    if(err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
});

router.delete('/:user_id?', function(req, res, next) {

  Invite.deleteInvite(req.params.user_id, function(err, rows) {
    if(err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
});


module.exports = router;
