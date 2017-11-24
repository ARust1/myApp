var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

// Events
// --------------------------------------------------

/**
 * Gets all Events or and Event by Id when present
 */
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

/**
 * Creates an Event
 */
router.post('/', function(req, res, next) {
  var event = req.body;
  var uuid = uid();

  Event.createEvent(uuid, event, function(err, results) {
    if(err) return res.json(err);
    res.json(uuid);
  });
});

/**
 * Updates and Event by Id
 */
router.put('/:id', function(req, res, next) {
  var event = req.body;

  Event.updateEvent(event, function(err, results) {
    if(err) return res.status(500).json(err);
    res.status(200).json(event);
  });
});

// Event Invites
// --------------------------------------------------

/**
 * Get Event Invites for a specific Event
 */
router.get('/invites/:event_id', function(req, res, next) {
  var event_id = req.params.event_id;
  Event.getEventInvites(event_id, function(err, results) {
    var json = Response2JSON.JSONFY(results);

    var newData = [];
    json.forEach(function(obj) {
      var tmp = buildEventInviteEntity(obj);
      newData.push(tmp);
    });

    if(err) return res.json(err);
    res.json(newData);
  })
});

/**
 *  Creates an EventInvite
 */
router.post('/invite', function(req, res, next) {
  var user_id = req.body.user_id,
    event_id = req.body.event_id;
  var uuid = uid();

  Event.addEventInvite(uuid, user_id, event_id, function(err, results) {
    if(err) return res.json(err);
    res.status(200).json(results);
  });
});

/**
 * Sets the event participation for an invite
 */
router.put('/invite/:uuid', function(req, res, next) {
  var uuid = req.params.uuid;
  var participation = req.body.participation;
  Event.setEventParticipation(uuid, participation, function(err, results) {
    if(err) return res.json(err);
    res.json(results[0]);
  });
});

router.delete('/invite', function(req, res, next) {
  var user_id = req.query.user_id;
  var event_id = req.query.event_id;
  Event.deleteEventInvite(user_id, event_id, function(err, result) {
    if(err) return res.status(500).json(err);
    res.status(200).json(result);
  })
});

function buildEventInviteEntity(obj) {
  var inviteData = {
    e_uuid : obj.e_uuid,
    participation: obj.participation,
    user : {
      uuid : obj.uuid,
      email: obj.email,
      prename: obj.prename,
      surname: obj.surname,
      team_id: obj.team_id,
      admin: obj.admin,
      back_number: obj.back_number,
      position: obj.position
    }
  };
  return inviteData;
}

module.exports = router;
