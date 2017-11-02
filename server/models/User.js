var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position " +
      "FROM user", callback);
  },
  getUserById:function(id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position " +
      "FROM user where uuid = ?",[id],callback);
  },
  getUserByTeamId:function(team_id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, admin, back_number, position " +
      "FROM user where team_id = ?",[team_id],callback);
  },
  getUserByToken: function(token, callback) {
    return db.query('SELECT uuid, ' +
      'email, prename, surname, team_id, admin, back_number, position ' +
      'FROM user WHERE token = ?;', [token], callback);
  },
  deleteTask:function(id, callback){
    return db.query("delete from task where Id = ?",[id],callback);
  },
  updateUser:function(uuid, User, callback){
    return db.query("UPDATE user " +
      "SET email = ?, prename = ?, surname = ?, back_number = ?, team_id = ?, admin = ? " +
      "WHERE uuid = ?",
      [User.email, User.prename, User.surname, User.back_number,
        User.team_id, User.admin, uuid],
      callback);
  }
};

module.exports = User;
