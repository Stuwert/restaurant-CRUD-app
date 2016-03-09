var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').load();




//admin routes
var admin = require('./routes/admin/index')
var adminrestaurants = require('./routes/admin/restaurants');
var adminneighborhoods = require('./routes/admin/neighborhoods')
var adminemployees = require('./routes/admin/employees')

//user routes
var users = require('./routes/users/index')
var userneighborhoods = require('./routes/users/neighborhoods')
var userrestaurants = require('./routes/users/restaurants')
var meals = require('./routes/users/meals')
var userreviews = require('./routes/users/userreviews')

//login routes
var login = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', function(req, res, next){
  console.log(req.cookies.userId);
  if(req.cookies.userId === 'admin'){
    next();
  }else{
    res.redirect('/login')
  }
})
//admin side
app.use('/admin', admin);
app.use('/admin/restaurants', adminrestaurants);
app.use('/admin/restaurants', adminemployees);
app.use('/admin/neighborhoods', adminneighborhoods);

//user side
app.use('/', users);
app.use('/restaurants', userrestaurants);
app.use('/restaurants', meals)
app.use('/restaurants', userreviews)
app.use('/neighborhoods', userneighborhoods);

//logins
app.use('/login', login);

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
