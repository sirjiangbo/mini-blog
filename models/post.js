const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	link: String,
	date: String,
	author: String,
	status: String,
	category: Array,
	tag: Array,
	is_public: Boolean
}, { versionKey: false });

module.exports = mongoose.model('posts', PostSchema);