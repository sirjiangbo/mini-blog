'use strict';

module.exports = {
    method: 'GET',
    path: '/login',
    handler: (request, reply) => {
        const session = {
            user: 'jack',
            last: Date.now()
        };
        reply.view('login', {});
        // reply.view('login', {}).state('session', session);
    }
};