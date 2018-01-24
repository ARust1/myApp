var db = require('../connection');

var Deposit = {

  getDepositsByTeam: function(team_id, callback) {
    return db.query("SELECT uuid, recipient, description, timestamp, type, team_id, amount, user_id, sender " +
      "FROM deposits WHERE team_id = ?;", [team_id], callback);
  },
  addDeposit: function (uuid, depositsData, callback) {
    return db.query("INSERT INTO deposits " +
      "(uuid, recipient, description, timestamp, type, team_id, amount, user_id, deposit_token, sender) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [uuid, depositsData.recipient,
      depositsData.description, depositsData.timestamp, depositsData.type,
      depositsData.team_id, depositsData.amount, depositsData.user_id, depositsData.deposit_token, depositsData.sender], callback);
  }

};

module.exports = Deposit;
