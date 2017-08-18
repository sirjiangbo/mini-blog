'use strict';

const path = require('path');
const hapi = require('hapi');
const Good = require('good');
const ejs = require('ejs');
const vision = require('vision');
const inert = require('inert');
const config = require('./config');
const routes = require('./routes').routes;
const server = new hapi.Server();

require('./database');

server.connection({
	host: config.host,
	port: config.port
});

server.register(vision, err => {
	if(err) {
		console.error(err);
		throw err;
	}
	server.views({
		engines: {ejs: ejs},
		relativeTo: __dirname,
		path: 'public/views'
	});
	routes.forEach(route => {
		server.route(route);
	});
});

server.register(inert, err => {
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
		console.error(err);
		throw err;
	}
	server.start(err => {
		if(err) {
            console.error(err);
			throw err;
		}
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});