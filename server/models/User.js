var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position, balance " +
      "FROM user", callback);
  },
  getUserById:function(id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, team_id, admin, back_number, position, accountToken, birthday, profile_img, balance " +
      "FROM user where uuid = ?",[id],callback);
  },
  getUserByTeamId:function(team_id, callback){
    return db.query("SELECT uuid," +
      "email, prename, surname, admin, back_number, position, accountToken, birthday, profile_img, balance " +
      "FROM user where team_id = ? ORDER BY admin DESC ",[team_id],callback);
  },
  getUserByEmail: function(email, callback) {
    return db.query('SELECT uuid, ' +
      'email, prename, surname, team_id, admin, back_number, position, accountToken, birthday, file_id, profile_img, balance ' +
      'FROM user WHERE email = ?;', [email], callback);
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
  },
  setTeam: function(uuid, team_id, callback) {
    return db.query("UPDATE user SET team_id = ? WHERE uuid = ?;", [team_id, uuid], callback);
  },
  updateUserBalance: function (uuid, amount, callback) {
    return db.query('UPDATE user SET balance = balance + ? WHERE uuid = ?;', [amount, uuid], callback);
  }
};

module.exports = User;
