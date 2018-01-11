var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Payment = require('../models/Payment');
var stripe = require('stripe')('sk_test_R2b21EnvL5TS0vI4bhkft3Kc');
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
        var userProfileObj = {
          uuid: json[0].uuid,
          email : json[0].email,
          prename: json[0].prename,
          surname: json[0].surname,
          admin: json[0].admin,
          accountToken: json[0].accountToken,
          team_id: json[0].team_id,
          back_number: json[0].back_number,
          position: json[0].position,
          birthday: json[0].birthday,
          profile: {
            profile_img: json[0].profile_img,
            file_id: json[0].file_id
          }
        };
        if (err) return res.json(err);
        res.json(userProfileObj);
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

router.put('/:id/identityCard', function(req, res) {
  User.saveFileId(req.params.id, req.body.file_id, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/:id/profileImg', function(req, res) {
  User.saveImgUrl(req.params.id, req.body.profile_img, function(err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

router.put('/:id',function(req,res,next){
  console.log(req.body);
  User.updateUser(req.params.id,req.body,function(err, rows){
    if(err) return res.json(err);
    res.json(rows);
  });
});


router.put('/:id/team', function(req, res, next) {
  User.setTeam(req.params.id, req.body.team_id, function (err, result) {
    if(err) return res.json(err);
    res.json(result);
  })
});

module.exports = router;
