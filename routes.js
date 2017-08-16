const index = require('./routes/index');
const admin = require('./routes/admin');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const postDetail = require('./routes/postDetail');
const user = require('./api/user');
const postPublish = require('./api/postPublish');
const postList = require('./api/postList');

module.exports = [
	index,
	admin,
	login,
	dashboard,
	postDetail,
	user,
	postPublish,
	postList
];