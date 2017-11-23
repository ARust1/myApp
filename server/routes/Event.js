var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

// Events
// --------------------------------------------------


router.get('/:id?',function(req, res, next) {
  if(req.params.id){
    Event.getEventsByTeamId(req.params.id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json);

    });
  } else {
    Event.getAllEvents(function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);
    });
  }
});

router.post('/', function(req, res, next) {
  var event = req.body;
  var uuid = uid();

  Event.createEvent(uuid, event, function(err, results) {
    if(err) return res.json(err);
    res.json(uuid);
  });
});

// Event Invites
// --------------------------------------------------

router.get('/invites/:event_id', function(req, res, next) {
  var event_id = req.params.event_id;
  Event.getEventInvites(event_id, function(err, results) {
    var json = Response2JSON.JSONFY(results);
    if(err) return res.json(err);
    res.json(json);
  })
});

router.post('/invite', function(req, res, next) {
  var user_id = req.body.user_id,
    event_id = req.body.event_id;
  var uuid = uid();

  Event.addEventInvite(uuid, user_id, event_id, function(err, results) {
    if(err) return res.json(err);
    res.status(200).json(results);
  });
});

router.put('/invite/:uuid', function(req, res, next) {
  var uuid = req.params.uuid;
  var participation = req.body.participation;
  Event.setEventParticipation(uuid, participation, function(err, results) {
    if(err) return res.json(err);
    res.json(results[0]);
  });
});

module.exports = router;
