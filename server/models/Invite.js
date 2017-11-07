var db = require('../connection');

var Invite = {
  sendInvite: function(team_id, user_id, callback) {
    db.query('INSERT INTO invites (team_id, user_id) VALUES(?, ?);', [team_id, user_id], callback);
  },
  getInvites: function(team_id, callback) {
    db.query('SELECT user_id WHERE team_id = ?;', [team_id], callback);
  }
};

module.exports = Invite;
