module.exports = {
	method: 'GET',
	path: '/admin/dashboard',
	handler: (request, reply) => {
		reply.view('dashboard', {});
	}
};