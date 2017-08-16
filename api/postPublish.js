const Post = require('../models/post');

module.exports = {
	method: 'POST',
	path: '/post/publish',
	handler: (request, reply) => {
		const payload = request.payload;
		const post = new Post(payload)
		post.save().then((err, post) => {
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