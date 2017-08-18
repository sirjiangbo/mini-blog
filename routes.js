const home = require('./routes/home');
const admin = require('./routes/admin');
const user = require('./api/user');
const postPublish = require('./api/postPublish');
const postList = require('./api/postList');
const postDelete = require('./api/postDelete');

module.exports = {
	routes: [
        home,
        admin,
        user,
        postPublish,
        postList,
        postDelete
    ]
};