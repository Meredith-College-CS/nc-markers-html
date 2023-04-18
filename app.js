require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var markerRouter = require('./routes/marker');
var usersRouter = require('./routes/users');
var countiesRouter = require('./routes/counties');
var countyRouter = require('./routes/county');
var formRouter = require('./routes/form');
var keywordRouter = require('./routes/keyword');
var apiRouter = require('./routes/api');
var citiesRouter = require('./routes/cities');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//don't show the log during mocha tests
if(process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.redirect(307, '/home.html');
});
app.get('/search.html', function(req, res) {
  res.redirect(307, '/index1.html');
});

app.use('/counties', countiesRouter);
app.use('/county', countyRouter);
app.use('/keyword', keywordRouter);
app.use('/marker', markerRouter);
app.use('/form', formRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/cities', citiesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.static('public'));

module.exports = app;
