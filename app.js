var express = require('express');
var path = require('path');

var db = require('./db');
var routes = require('./src/routes/appRouter');
var config = require('./src/config');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

module.exports = app;