var db = require('../connection');

var Payment = {
  saveCustomerToken: function(customerToken, email, callback) {
    return db.query("UPDATE user SET customerToken = ? WHERE email = ?", [customerToken, email], callback);
  },
  getCustomerToken: function(uuid, callback) {
    return db.query("SELECT customerToken FROM user WHERE uuid = ?", [uuid], callback);
  }
};

module.exports = Payment;
