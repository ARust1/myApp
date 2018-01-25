var db = require('../connection');

var PushToken = {

  getPushByUser: function(user_id, callback) {
    return db.query("SELECT * FROM push_tokens WHERE user_id = ?;", [user_id], callback);
  },
  getPushByTeam: function(team_id, callback) {
    return db.query("SELECT * FROM push_tokens WHERE team_id = ?;", [team_id], callback);
  },
  addPushToken: function (pushData, callback) {
    return db.query("INSERT INTO push_tokens " +
      "(token, user_id, team_id) " +
      "VALUES (?, ?, ?);", [pushData.token, pushData.user_id, pushData.team_id], callback);
  }

};

module.exports = PushToken;
