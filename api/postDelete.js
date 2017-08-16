const Post = require('../models/post');

module.exports = {
    method: 'POST',
    path: '/post/delete',
    handler: (request, reply) => {
        let post_id = request.payload.post_id;
        Post.remove({_id: post_id}).then(err => {
            let pdata = {
                result: true
            };
            reply.response(JSON.stringify(pdata));
        });
    }
};