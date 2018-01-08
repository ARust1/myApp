var db = require('../connection');

var Team = {
  createTeam: function (uuid, owner_id, name, team_logo, callback) {
    return db.query("INSERT INTO team (uuid, name, owner_id, team_logo) VALUES (?, ?, ?, ?);",
      [uuid, name, owner_id, team_logo], callback);
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
  },
  updateTeamBalance: function(uuid, amount, callback) {
    return db.query("UPDATE team SET balance = balance + ? WHERE uuid = ?;", [amount, uuid], callback);
  },
  saveImgUrl: function(uuid, imgUrl, callback) {
    return db.query("UPDATE team SET team_logo = ? WHERE uuid = ?;", [imgUrl, uuid], callback);
  }
};

module.exports = Team;
