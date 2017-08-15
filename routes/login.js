module.exports = {
	method: 'GET',
	path: '/admin/login',
	handler: (request, reply) => {
		reply.view('login', {});
	}
};