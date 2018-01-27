var db = require('../connection');

var PushToken = {

  getPushTokenByTeam: function(team_id, callback) {
    return db.query("SELECT token FROM push_tokens WHERE team_id = ?;", [team_id], callback);
  },
  getPushTokenByUser: function(user_id, callback) {
    return db.query("SELECT token FROM push_tokens WHERE user_id = ?;", [user_id], callback);
  },
  addPushToken: function (pushTokenData, callback) {
    return db.query("INSERT INTO push_tokens (token, user_id, team_id) "
    + "VALUES(?, ?, ?);", [pushTokenData.token, pushTokenData.user_id, pushTokenData.team_id], callback);
  },
  getTokenOfTeamWalletManager: function (team_id, callback) {
    return db.query("SELECT p.token FROM push_tokens as p, user as u WHERE p.user_id = u.uuid AND u.admin = true AND p.team_id = ?;", [team_id], callback)
  },
  getCaptainOfTeam: function (team_id, callback) {
    //TODO
  },
  getTrainerOfTeam: function (team_id, callback) {
    //TODO
  },
  getTokenOfUserByStripeToken: function(stripeToken, callback) {
    return db.query("SELECT p.token FROM push_tokens as p, user as u WHERE p.user_id = u.uuid AND u.accountToken = ?;", [stripeToken], callback)
  } 

};

module.exports = PushToken;
