var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT * FROM user", callback);
  },
  getUserById:function(id, callback){
    console.log("bla");
    return db.query("SELECT * FROM user where uuid=?",[id],callback);
  },
  getUserByToken: function(token, callback) {
    console.log("blub");
    return db.query('SELECT * FROM user WHERE token = ?;', [token], callback);
  },
  deleteTask:function(id, callback){
    return db.query("delete from task where Id=?",[id],callback);
  },
  updateUser:function(uuid, User, callback){
    return db.query("UPDATE user SET email=?,prename=?,surname=? where uuid=?",
      [User.email, User.prename, User.surname, uuid],
      callback);
  }

};

module.exports = User;
