const home = require('./routes/home');
const admin = require('./routes/admin');
const login = require('./routes/login');
const api_login = require('./api/api_login');

module.exports = {
	routes: [
        home,
        admin,
        login,
        api_login
    ]
};