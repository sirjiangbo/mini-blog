const bluebird = require('bluebird');
const mongoose = require('mongoose');
const mongoConfig = require('./config').mongodb;

mongoose.Promise = bluebird;

const db = mongoose.connect('mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db_name, {
	useMongoClient: true
});

db.once('open', callback => {
	console.log('db opene');
});

db.on('error', () => {
	console.log('db connection error');
});

module.exports = db;