var db = require('../connection');

var Team = {
  createTeam: function (uuid, owner_id, name, callback) {
    db.query("INSERT INTO team (uuid, name, owner_id) VALUES (?, ?, ?);",
      [uuid, name, owner_id], callback);
    db.query("SELECT * FROM team WHERE uuid = ?;", [uuid], callback);
  },
  getAllTeams: function(callback) {
    return db.query("SELECT * FROM team", callback);
  },
  getTeamById:function(uuid, callback){
    return db.query("SELECT * FROM team where uuid = ?",[uuid],callback);
  },
  setInviteToken: function(invite_token, uuid, callback) {
    return db.query("UPDATE team SET invite_token = ? WHERE uuid = ?", [invite_token, uuid], callback);
  },
  getTeamByInviteToken: function(invite_token, callback) {
    return db.query("SELECT uuid FROM team WHERE invite_token = ?", [invite_token], callback);
  }
};

module.exports = Team;
