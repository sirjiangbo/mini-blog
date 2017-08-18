'use strict';

module.exports =  {
    method: 'GET',
    path: '/admin',
    handler: (request, reply) => {
        // if(request.state.session) {
        //     reply.view('admin', {});
        // } else {
        //     reply.redirect('/login');
        // }
        reply.view('admin', {});
    }
};