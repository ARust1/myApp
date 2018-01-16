var db = require('../connection');

var Penalty = {

  getPenaltiesByTeam: function(team_id, callback) {
    return db.query("SELECT * FROM penalties WHERE team_id = ?;", [team_id], callback);
  },
  addPenalty: function (uuid, penaltyData, callback) {
    return db.query("INSERT INTO penalties (uuid, name, user_id, team_id, amount) " +
      "VALUES (?, ?, ?, ?, ?);", [uuid, penaltyData.name, penaltyData.user_id,
      penaltyData.team_id, penaltyData.amount], callback);
  },
  deletePenalty: function (uuid, callback) {
    return db.query("DELETE FROM penalties WHERE uuid = ?", [uuid], callback);
  },
  getPenaltyByUserId: function(user_id, callback) {
    return db.query("SELECT * FROM penalties WHERE user_id = ?;", [user_id], callback);
  },
  setPenaltyPayment: function(uuid, paymentMethod, dateOfPayment, callback) {
    return db.query("UPDATE penalties SET payment_method = ?, date_of_payment = ? WHERE uuid = ?;",
      [paymentMethod, dateOfPayment, uuid], callback);
  },
  acceptPayment: function(uuid, callback) {
    return db.query("UPDATE penalties SET paid = 1, payment_method = 0 WHERE uuid = ?;", [uuid], callback);
  }

};

module.exports = Penalty;
