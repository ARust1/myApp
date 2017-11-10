var db = require('../connection');

var Invite = {
  sendInvite: function(uuid, team_id, user_id, callback) {
    db.query('INSERT INTO invites (uuid, team_id, user_id) VALUES(?, ?, ?);', [uuid, team_id, user_id], callback);
  },
  getInvites: function(team_id, callback) {
    db.query("SELECT user.uuid, " +
      "user.email, user.prename, user.surname, user.team_id, user.admin, " +
      "user.back_number, user.position " +
      "FROM invites, user " +
      "WHERE invites.user_id = user.uuid AND invites.team_id = ?", [team_id, team_id], callback);
  }
};

module.exports = Invite;
