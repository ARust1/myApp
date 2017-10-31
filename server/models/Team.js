var db = require('../connection');

var Team = {
  createTeam: function (owner_id, name, callback) {
    db.query("INSERT INTO team (name, owner_id) VALUES (?, ?);",
      [name, owner_id], callback);
    db.query("SELECT uuid FROM team WHERE owner_id = ?;", [owner_id], callback);
  },
  getAllTeams: function(callback) {
    return db.query("SELECT * FROM team", callback);
  },
  getTeamById:function(uuid, callback){
    return db.query("SELECT * FROM team where uuid = ?",[uuid],callback);
  }
};

module.exports = Team;
