const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	html: String,
	link: String,
	date: String,
	author: String,
	status: String,
	category: Array,
	tag: Array,
	is_public: String
}, { versionKey: false });

module.exports = mongoose.model('posts', PostSchema);