var express = require('express');
var router = express.Router();
var BoardMessages = require('../models/BoardMessages');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');
var moment = require('moment');

router.get('/:team_id?', function (req, res, next) {
  BoardMessages.getBoardMessagesByTeam(req.params.team_id, function (err, result) {
    var json = Response2JSON.JSONFY(result);
    if(err) return res.json(err);
    res.json(json);
  })
});

router.post('/', function (req, res, next) {
  var uuid = uid();
  BoardMessages.addBoardMessage(uuid, req.body, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

module.exports = router;
