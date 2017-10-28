var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT * FROM user", callback);
  },

  getUserById:function(id, callback){
    return db.query("SELECT * FROM user where uuid=?",[id],callback);
  },

  addTask:function(Task, callback){
    return db.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status],callback);
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
