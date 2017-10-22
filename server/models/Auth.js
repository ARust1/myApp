var db = require('../connection');

var Auth = {

  login: function(email, password, callback) {
    return db.query("SELECT uuid FROM user WHERE email=? and password=?;", [email, password], callback);
  },
  register: function(email, password, team, callback) {
    return db.query("INSERT INTO user (email, password, team) VALUES(?, ?, ?);", [email, password, team], callback);
  }
};

module.exports = Auth;
