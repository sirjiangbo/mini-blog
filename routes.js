const index = require('./routes/index');
const admin = require('./routes/admin');
const user = require('./api/user');

module.exports = [
	index,
	admin,
	user
];