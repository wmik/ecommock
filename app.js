var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/api/:resource/*', apiRouter.get);
app.get('/api/:resource', apiRouter.get);

app.post('/api/:resource', apiRouter.post);

app.put('/api/:resource/*', apiRouter.put);

app.patch('/api/:resource/*', apiRouter.patch);

app.delete('/api/:resource/*', apiRouter.delete);

module.exports = app;
