var db = require('../connection');

var Transaction = {

  getTransactionsByTeam: function(team_id, callback) {
    return db.query("SELECT * FROM transactions WHERE team_id = ?;", [team_id], callback);
  },
  addTransaction: function (uuid, transactionData, callback) {
    return db.query("INSERT INTO transactions " +
      "(uuid, recipient, description, timestamp, type, team_id, amount, user_id) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [uuid, transactionData.recipient,
      transactionData.description, transactionData.timestamp, transactionData.type,
      transactionData.team_id, transactionData.amount, transactionData.user_id], callback);
  }

};

module.exports = Transaction;
