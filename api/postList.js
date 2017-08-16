const Post = require('../models/post');

module.exports = {
	method: 'POST',
	path: '/post/list',
	handler: (request, reply) => {
		let query = request.payload;
		if(query.status === 'all') {
			query = {};
		}
		Post.find(query).then((err, post) => {
			if(err) {
				return err;
			}
			return post;
		}).then(post => {
			let pdata = {
				result: true,
				data: post
			};

			reply.response(JSON.stringify(pdata));
		});
	}
};