'use strict';

const path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const ejs = require('ejs');
const db = require('./db');
const routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

// Add the route
server.register(require('vision'), (err) => {
	if(err) {
		throw err;
	}
	server.views({
		engines: {ejs: ejs},
		relativeTo: __dirname,
		path: 'public/views'
	});
	routes.forEach((route, index) => {
		server.route(route);
	});
});

// Add Directory handler
server.register(require('inert'), err => {
	server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'public'),
        listing: true
      }
    }
	});
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