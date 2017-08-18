const bluebird = require('bluebird');
const mongoose = require('mongoose');
const mongodbConfig = require('./config').mongodb;

mongoose.Promise = bluebird;

mongoose.connect('mongodb://' + mongodbConfig.host + ':' + mongodbConfig.port + '/' + mongodbConfig.db_name, {
	useMongoClient: true
}).once('open', callback => {
    console.log('db opened');
}).on('error', () => {
    console.log('db connection error');
});