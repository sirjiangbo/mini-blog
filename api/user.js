const User = require('../models/user');

module.exports = {
	method: 'POST',
	path: '/user',
	handler: (request, reply) => {
		const payload = request.payload;
		const query = {
			name: payload.name
		};
		User.find(query).then((err, users) => {
			if(err) {
				return err;
			}
			return users;
		}).then(users => {
			let user = {
				result: true,
				users: users
			};
			reply.response(JSON.stringify(user));
		});
	}
};