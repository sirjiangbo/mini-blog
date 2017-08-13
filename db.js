const mongoose = require('mongoose');
const mongoConfig = require('./config').mongodb;

mongoose.connect('mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db_name, {
	useMongoClient: true
});