var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position " +
      "FROM user", callback);
  },
  getUserById:function(id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position, accountToken, birthday " +
      "FROM user where uuid = ?",[id],callback);
  },
  getUserByTeamId:function(team_id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, admin, back_number, position, accountToken, birthday " +
      "FROM user where team_id = ?",[team_id],callback);
  },
  getUserByToken: function(token, callback) {
    return db.query('SELECT uuid, ' +
      'email, prename, surname, team_id, admin, back_number, position, accountToken, birthday, file_id, profile_img ' +
      'FROM user WHERE token = ?;', [token], callback);
  },
  updateUser:function(uuid, User, callback){
    return db.query("UPDATE user " +
      "SET email = ?, prename = ?, surname = ?, back_number = ?, team_id = ?, admin = ?, position = ?, birthday = ? " +
      "WHERE uuid = ?",
      [User.email, User.prename, User.surname, User.back_number,
        User.team_id, User.admin, User.position, User.birthday, uuid],
      callback);
  },
  saveFileId: function(uuid, fileId, callback) {
    return db.query("UPDATE user SET file_id = ? WHERE uuid = ?;", [fileId, uuid], callback);
  },
  saveImgUrl: function(uuid, imgUrl, callback) {
    return db.query("UPDATE user SET profile_img = ? WHERE uuid = ?;", [imgUrl, uuid], callback);
  }
};

module.exports = User;
