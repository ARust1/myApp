var db = require('../connection');

var Event = {
  createEvent: function (uuid, Event, callback) {
    return db.query("INSERT INTO events (uuid, name, location, sum, team_id, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [uuid, Event.name, Event.location, Event.sum, Event.team_id, Event.startDate, Event.endDate], callback);
  },
  updateEvent: function(Event, callback) {
    return db.query("UPDATE events SET name = ?, location = ?, sum = ?, startDate = ?, endDate = ? WHERE uuid = ?;" ,
      [Event.name, Event.location, Event.sum, Event.startDate, Event.endDate, Event.uuid], callback);
  },
  getAllEvents: function(callback) {
    return db.query("SELECT * FROM events", callback);
  },
  getEventsByTeamId:function(team_id, callback){
    return db.query("SELECT * FROM events where team_id = ?",[team_id],callback);
  },
  getEventsByInvite: function(user_id, team_id, callback) {
    return db.query("SELECT events.uuid, events.name, events.startDate, events.endDate, " +
      "events.location, events.sum, events.team_id " +
      "FROM events, event_invite WHERE events.uuid = event_invite.event_id " +
      "AND team_id = ? " +
      "AND event_invite.user_id = ?;"
    , [team_id, user_id], callback);
  },
  getEventInvites: function (event_id, callback) {
    return db.query("SELECT event_invite.e_uuid, event_invite.participation, " +
      "event_invite.paid, event_invite.payment_method, event_invite.date_of_payment, user.uuid," +
      "user.email, user.prename, user.surname, user.team_id, user.admin, user.back_number, user.position " +
      "FROM user, event_invite " +
      "WHERE user.uuid = event_invite.user_id AND event_invite.event_id = ?;", [event_id], callback);
  },
  addEventInvite: function(uuid, user_id, event_id, callback) {
    return db.query("INSERT INTO event_invite (e_uuid, user_id, event_id) VALUES (?, ?, ?);",
      [uuid, user_id, event_id], callback);
  },
  deleteEventInvite: function(user_id, event_id, callback) {
    return db.query("DELETE FROM event_invite WHERE user_id = ? and event_id = ?", [user_id, event_id], callback);
  },
  setEventParticipation: function(uuid, participation, callback) {
    return db.query("UPDATE event_invite SET participation = ? WHERE e_uuid = ?;", [participation, uuid], callback);
  },
  setEventPayment: function(uuid, paymentMethod, dateOfPayment, callback) {
    return db.query("UPDATE event_invite SET payment_method = ?, date_of_payment = ? WHERE e_uuid = ?;",
    [paymentMethod, dateOfPayment, uuid], callback);
  }
};

module.exports = Event;
