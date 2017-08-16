const index = require('./routes/index');
const admin = require('./routes/admin');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const postDetail = require('./routes/postDetail');
const user = require('./api/user');
const postPublish = require('./api/postPublish');
const postList = require('./api/postList');
const postDelete = require('./api/postDelete');

module.exports = [
	index,
	admin,
	login,
	dashboard,
	postDetail,
	user,
	postPublish,
	postList,
    postDelete
];