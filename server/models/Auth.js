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
  },
  getValidationStatus: function(uuid, callback) {
    return db.query("SELECT validated FROM user WHERE uuid = ?;", uuid, callback); 
  },
  getValidationCode: function(uuid, callback) {
    return db.query("SELECT validation_code FROM user WHERE uuid = ?;", uuid, callback); 
  },
  setValidationCode: function(uuid, code, callback) {
    return db.query("UPDATE user SET validation_code = ? WHERE uuid = ?;", [code, uuid], callback); 
  },
  validate: function(uuid, callback) {
    return db.query("UPDATE user SET validated = true WHERE uuid = ?;", uuid, callback);
  }
};

module.exports = Auth;
