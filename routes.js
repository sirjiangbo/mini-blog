const home = require('./routes/home');
const admin = require('./routes/admin');
const login = require('./routes/login');
const api_login = require('./api/api_login');
const api_post = require('./api/api_post');

module.exports = {
	routes: [
        home,
        admin,
        login,
        api_login,
        api_post
    ]
};