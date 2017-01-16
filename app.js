var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan=require('morgan');
var expressValidator=require('express-validator');
var config=require('./config/config.json');
var cors=require('cors');
var passport=require('passport');

var app = express();

var bytes=require('bytes');
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json({limit:bytes('2mb')}));
app.use(bodyParser.urlencoded({limit:bytes('2mb'),extended:true}));
validator=require('./utils/custom_validators');
app.use(validator);
app.use(morgan());
app.use(cors());

app.use(passport.initialize());
require('./passport');
// for V1 api
require('./v1/routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
console.log(app.get('env'));
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
    // res.send('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


module.exports = app;
