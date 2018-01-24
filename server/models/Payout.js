var db = require('../connection');

var Payout = {

  getPayoutByTeam: function(team_id, callback) {
    return db.query("SELECT uuid, recipient, description, timestamp, type, team_id, amount, user_id " +
      "FROM payouts WHERE team_id = ?;", [team_id], callback);
  },
  addPayout: function (uuid, payoutData, callback) {
    return db.query("INSERT INTO payouts " +
      "(uuid, recipient, description, timestamp, type, team_id, amount, user_id, payout_token) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [uuid, payoutData.recipient,
      payoutData.description, payoutData.timestamp, payoutData.type,
      payoutData.team_id, payoutData.amount, payoutData.user_id, payoutData.payout_token], callback);
  }

};

module.exports = Payout;
