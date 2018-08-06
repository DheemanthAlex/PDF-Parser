var mongoose = require('mongoose');
var config = require('./src/config');

mongoose.connect(config.mongoURL, { useNewUrlParser: true });