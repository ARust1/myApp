var express = require('express');
var router = express.Router();
var Transaction = require('../models/Transaction');
var Response2JSON = require('../Response2JSON');
var uid = require('uuid/v4');

router.get('/:team_id?', function (req, res, next) {
  if(req.params.team_id) {
    Transaction.getTransactionsByTeam(req.params.team_id, function(err, result) {
      var penaltyJSON = Response2JSON.JSONFY(result);
      if (err) return res.json(err);
      res.json(penaltyJSON);
    });
  }

});

router.post('/', function (req, res, next) {
  var uuid = uid();
  Transaction.addTransaction(uuid, req.body, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  });
});

module.exports = router;
