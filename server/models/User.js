var db = require('../connection');

var User = {
  getAllUser: function(callback) {
    return db.query("SELECT * FROM co_emails", callback);
  },
  getUserById:function(id,callback){

    return db.query("SELECT * FROM co_emails where Id=?",[id],callback);
  },
  addTask:function(Task,callback){
    return db.query("Insert into task values(?,?,?)",[Task.Id,Task.Title,Task.Status],callback);
  },
  deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
  },
  updateTask:function(id,Task,callback){
    return db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
  }

};

module.exports = User;
