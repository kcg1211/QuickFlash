require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require("fs"); 
const licenseChecker = require('license-checker');

const options = require("./db");
const knex = require("knex")(options); // **** connecting db.js to knex ****
const helmet = require('helmet');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
const logStream = fs.createWriteStream(path.join(__dirname, "access.txt"), {
  flags: "a",
});
app.use(logger("common", { stream: logStream })); // **** saving logs into access.txt in root file using Morgan ****
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//**** initialsing the db with knex****
app.use((req, res, next) => {
  req.db = knex;
  next();
})

app.use(logger('common')); app.use(helmet()); //**** initialsing helmet ****
app.use(cors()); //**** initialsing cors ****

app.use("/version", (req, res) => {
  req.db.raw("SELECT VERSION()").then(version => res.json(version[0]))
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// endpoint of /license to get license info from crawler
app.get('/licenses', (req, res) => {
  const options = {
    start: process.cwd(), // Start from the current working directory
    json: true,
  };

  licenseChecker.init(options, (error, licenses) => {
    if (error) {
      return res.status(500).send('Error occurred while fetching licenses');
    }

    const licenseData = Object.keys(licenses).map(packageName => {
      return {
        package: packageName,
      };
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.json(licenseData);
  });
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
