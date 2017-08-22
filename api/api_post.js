'use strict';

const remarkable = require('remarkable');
const md = new remarkable();
const Post = require('../models/post');

module.exports = {
    method: 'POST',
    path: '/api/post',
    handler: (req, reply) => {
        const payload = req.payload;

        if(payload.action === 'add') {
            const post = new Post(payload.postData);
            post.save().then(post => {
                reply.response(JSON.stringify({"result": true}));
            }).catch(err => {
                console.error(err);
                throw err;
            });
        }
        if(payload.action === 'list') {
            Post.find({}).then(posts => {
                reply.response(JSON.stringify({
                    "result": true,
                    "data": posts
                }));
            }).catch(err => {
                console.error(err);
                throw err;
            });
        }
    }
};