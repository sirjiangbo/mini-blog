const Post = require('../models/post');
const Remarkable = require('remarkable');
const md = new Remarkable();

module.exports = {
	method: 'GET',
	path: '/post/detail/{link}',
	handler: (request, reply) => {
		const link = request.params.link || '';
		const query = {
			'link': link
		};
		Post.findOne(query).then(post => {
			return post;
		}).then(post => {
			post["content_html"] = md.render(post.content);
			reply.view('index', {msg: 'wahahahha', post: post});
		}).catch(err => {
			throw err;
		});
	}
};