var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var Invite = require('./routes/Invite');
var Event = require('./routes/Event');
var Team = require('./routes/Team');
var User = require('./routes/User');
var Auth = require('./routes/Auth');
var Payment = require('./routes/Payment');
var app = express();

var expressJWT = require('express-jwt');

var apiUrl = '/api/v1';
var cors_options = {
  origin: '*'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors(cors_options));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(expressJWT({
  secret: 'y&6GEQxQ+P=r)+Zyve2&,C>^ILaSBxUbQ|!:aVs|ffM@%@Tc5#i}&be/5sAg/Jux'
}).unless({
  path: ['/api/v1/auth', '/api/v1/register', '/api/v1/logout']
}));*/

app.use(apiUrl + '/', Auth);
app.use(apiUrl + '/user', User);
app.use(apiUrl + '/team', Team);
app.use(apiUrl + '/event', Event);
app.use(apiUrl + '/invite', Invite);
app.use(apiUrl + '/payment', Payment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
