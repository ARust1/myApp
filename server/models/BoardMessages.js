var db = require('../connection');

var BoardMessages = {

  getBoardMessagesByTeam: function(team_id, callback) {
    return db.query("SELECT * FROM board_messages WHERE team_id = ? ORDER BY timestamp ASC;", [team_id], callback);
  },
  addBoardMessage: function (uuid, boardMessage, callback) {
    return db.query("INSERT INTO board_messages (uuid, message, team_id, timestamp) " +
      "VALUES (?, ?, ?, ?);", [uuid, boardMessage.message, boardMessage.team_id, boardMessage.timestamp], callback);
  }

};

module.exports = BoardMessages;

