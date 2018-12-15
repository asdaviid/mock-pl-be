const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./config/app.config');

const authRoute = require('./routes/auth.route');
const teamRoute = require('./routes/team.route');
const stadiumRoute = require('./routes/stadium.route');
const fixtureRoute = require('./routes/fixture.route');
const searchRoute = require('./routes/search.route');

const app = express();

const auth = require('./auth')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

auth.initialize();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.once('open', () => {
  console.log('mongodb connection successful');
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
});

app.use('/api/v1/', authRoute);
app.use('/api/v1/', teamRoute);
app.use('/api/v1/', stadiumRoute);
app.use('/api/v1/', fixtureRoute);
app.use('/api/v1/', searchRoute);

app.get('/', (req, res, next) => {
  return res.send('API for Mock Premier League');
});

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

module.exports = app;
