var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

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
  console.log(event);
  var uuid = uid();

  Event.createEvent(uuid, event, function(err, results) {
    if(err) return res.json(err);
    if(results.length !== 0) {
      res.json(results[0]);
    }
  });
});

module.exports = router;
