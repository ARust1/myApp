var db = require('../connection');

var Payment = {
  saveCustomerToken: function(customerToken, email, callback) {
    return db.query("UPDATE user SET accountToken = ? WHERE email = ?", [customerToken, email], callback);
  },
  getCustomerToken: function(uuid, callback) {
    return db.query("SELECT customerToken FROM user WHERE uuid = ?", [uuid], callback);
  },
  saveTeamStripeToken: function(stripeToken, uuid, callback) {
    return db.query("UPDATE team SET stripeToken = ? WHERE uuid = ?", [stripeToken, uuid], callback);
  }
};

module.exports = Payment;
