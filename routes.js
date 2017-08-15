const index = require('./routes/index');
const admin = require('./routes/admin');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const user = require('./api/user');

module.exports = [
	index,
	admin,
	login,
	dashboard,
	user
];