'use strict';

module.exports = {
    method: 'GET',
    path: '/api/login',
    handler: (request, reply) => {
        const res = {
            "result": true,
            "msg": "ok"
        };
        const session = {
            user: 'jack',
            last: Date.now()
        };
        reply.response(JSON.stringify(res)).state('session', session);
    }
};