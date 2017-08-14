module.exports = {
	method: 'GET',
	path: '/admin',
	handler: (request, reply) => {
		reply.view('admin', {});
	}
};