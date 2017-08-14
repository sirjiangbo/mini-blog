const User = require('../models/user');

module.exports = {
	method: 'GET',
	path: '/',
	handler: (request, reply) => {
		// User.find().then((err, users) => {
		// 	if(err) {
		// 		return err;
		// 	}
		// 	return users;
		// }).then(users => {
		// 	console.log(users);
		// });
		reply.view('index', {msg: 'wahahahha'});
	}
};