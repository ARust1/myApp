var db = require('../connection');

var Event = {
  createEvent: function (uuid, Event, callback) {
    return db.query("INSERT INTO events (uuid, name, location, sum, team_id) VALUES (?, ?, ?, ?, ?);",
      [uuid, Event.name, Event.location, Event.sum, Event.team_id], callback);
  },
  getAllEvents: function(callback) {
    return db.query("SELECT * FROM events", callback);
  },
  getEventsByTeamId:function(team_id, callback){
    return db.query("SELECT * FROM events where team_id = ?",[team_id],callback);
  }
};

module.exports = Event;
