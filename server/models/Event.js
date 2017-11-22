var db = require('../connection');

var Event = {
  createEvent: function (uuid, Event, callback) {
    return db.query("INSERT INTO events (uuid, name, location, sum, team_id, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [uuid, Event.name, Event.location, Event.sum, Event.team_id, Event.startDate, Event.endDate], callback);
  },
  getAllEvents: function(callback) {
    return db.query("SELECT * FROM events", callback);
  },
  getEventsByTeamId:function(team_id, callback){
    return db.query("SELECT * FROM events where team_id = ?",[team_id],callback);
  },
  getEventInvites: function (event_id, callback) {
    return db.query("SELECT user.uuid," +
      "user.email, user.prename, user.surname, user.team_id, user.admin, user.back_number, user.position " +
      "FROM user, event_invite " +
      "WHERE user.uuid = event_invite.user_id AND event_invite.event_id = ?;", [event_id], callback);
  },
  addEventInvite: function(uuid, user_id, event_id, callback) {
    return db.query("INSERT INTO event_invite (uuid, user_id, event_id) VALUES (?, ?, ?);",
      [uuid, user_id, event_id], callback);
  },
  setEventParticipation: function(uuid, participation, callback) {
    return db.query("UPDATE event_invite SET participation = ? WHERE uuid = ?;", [participation, uuid], callback);
  }
};

module.exports = Event;
