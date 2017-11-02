var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Response2JSON = require('../Response2JSON');

router.get('/:id?',function(req, res, next) {
  if(req.params.id){
    User.getUserById(req.params.id,function(err,rows){
      var json = Response2JSON.JSONFY(rows);
      if(err) return res.json(err);
      res.json(json[0]);

    });
  } else {
    if(req.query.token) {
      User.getUserByToken(req.query.token, function (err, rows) {
        var json = Response2JSON.JSONFY(rows);
        if (err) return res.json(err);
        res.json(json[0]);
      });
    } else if(req.query.team_id) {
      User.getUserByTeamId(req.query.team_id, function (err, rows) {
        var json = Response2JSON.JSONFY(rows);
        if (err) return res.json(err);
        res.json(json);
      });
    } else {
      User.getAllUser(function(err,rows){
        var json = Response2JSON.JSONFY(rows);
        if(err) return res.json(err);
        res.json(json);
      });
    }
  }
});


/*router.post('/',function(req,res,next){

  Task.addTask(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);//or return count for 1 &amp;amp;amp; 0
    }
  });
});
router.delete('/:id',function(req,res,next){

  Task.deleteTask(req.params.id,function(err,count){

    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }

  });
});*/

router.put('/:id',function(req,res,next){

  User.updateUser(req.params.id,req.body,function(err, rows){
    if(err) return res.json(err);
    res.json(rows);
  });
});

module.exports = router;
