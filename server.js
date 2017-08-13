'use strict';

const Hapi = require('hapi');
const Good = require('good');

const db = require('./db');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

// Add the route
server.register(require('inert'), (err) => {

	if(err) {
		throw err;
	}

	server.route({
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
			reply.file('./public/views/index.html')
		}
	});

});

server.route({
	method: 'GET',
	path: '/admin',
	handler: (request, reply) => {
		return reply('hello admin');
	}
});

// Start the server
server.register({
	register: Good,
	options: {
		reporters: {
			console: [
				{
					module: 'good-squeeze',
					name: 'Squeeze',
					args: [
						{
							response: '*',
							log: '*'
						}
					]
				},
				{
					module: 'good-console'
				},
				'stdout'
			]
		}
	}
}, (err) => {

	if(err) {
		throw err;
	}

	server.start(err => {

		if(err) {
			throw err;
		}

		server.log('info', 'Server running at: ' + server.info.uri);

	});

});