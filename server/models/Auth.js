var db = require('../connection');

var Auth = {

  login: function(email, password, callback) {
    return db.query("SELECT uuid, password FROM user WHERE email = ?;", [email], callback);
  },
  setToken: function(uuid, token, callback) {
    return db.query("UPDATE user SET token = ? WHERE uuid = ?;", [token, uuid], callback);
  },
  register: function(email, password, callback) {
    return db.query("INSERT INTO user (email, password) VALUES(?, ?);", [email, password], callback);
  }
};

module.exports = Auth;
