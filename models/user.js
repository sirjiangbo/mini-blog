const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	name: String
}, { versionKey: false });

module.exports = mongoose.model('users', UserSchema);